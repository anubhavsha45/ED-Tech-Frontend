import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🤖 AI STATES
  const [aiNotes, setAiNotes] = useState({});
  const [loadingNotes, setLoadingNotes] = useState(false);

  const notesRef = useRef(); // 🔥 for PDF

  // 🎯 Fetch Course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/course/${id}`);

        const data = res.data.data.enrolledCourse || res.data.data.course;

        setCourse(data);

        const enrolled = !!res.data.data.enrolledCourse;
        setIsEnrolled(enrolled);

        if (data.chapters?.length > 0) {
          const firstLecture = data.chapters[0].lecture[0];
          setCurrentLecture(firstLecture);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // 🤖 Generate Notes
  const generateNotes = async (lectureId) => {
    try {
      setLoadingNotes(true);

      if (aiNotes[lectureId]) {
        setShowNotesModal(true);
        return;
      }

      const res = await API.post(`/ai/generate-notes/${lectureId}`);

      if (res.data?.data?.aiNotes) {
        const notes = res.data.data.aiNotes;

        // 🔥 Normalize data (important)
        setAiNotes((prev) => ({
          ...prev,
          [lectureId]: {
            ...notes,
            importantItems: notes.importantItems || notes.importantTerms || [],
          },
        }));

        setShowNotesModal(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNotes(false);
    }
  };

  // 📄 Download PDF
  const downloadPDF = async () => {
    try {
      const element = notesRef.current;

      if (!element) {
        console.log("No element found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2, // 🔥 better quality
        useCORS: true,
        logging: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${currentLecture?.name || "notes"}.pdf`);
    } catch (err) {
      console.error("PDF ERROR:", err);
    }
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading course...
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* TOP */}
      <div className="px-4 md:px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>

        <p className="text-gray-400">
          By {course.createdBy?.name || "Instructor"}
        </p>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row">
        {/* VIDEO */}
        <div className="w-full lg:w-[70%] p-4 md:p-6">
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
            {isEnrolled && currentLecture?.videoUrl ? (
              <video
                key={currentLecture._id}
                src={currentLecture.videoUrl}
                controls
                className="w-full h-[220px] md:h-[400px]"
              />
            ) : (
              <div className="h-[220px] md:h-[400px] flex items-center justify-center bg-gray-900">
                🔒 Enroll to watch
              </div>
            )}
          </div>

          {/* Lecture Info */}
          {currentLecture && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{currentLecture.name}</h2>
              <p className="text-gray-400 text-sm">
                Lecture {currentLecture.number}
              </p>
            </div>
          )}

          {/* AI BUTTON */}
          {isEnrolled && currentLecture && (
            <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
              <h2 className="font-semibold">AI Notes 🤖</h2>

              <button
                onClick={() => generateNotes(currentLecture._id)}
                className="px-4 py-2 bg-blue-600 rounded-lg"
              >
                {loadingNotes
                  ? "Generating..."
                  : aiNotes[currentLecture._id]
                    ? "View AI Notes"
                    : "Get AI Notes"}
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[30%] border-l border-gray-800 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4">Course Content</h2>

          {course.chapters?.map((chapter, i) => (
            <div key={chapter._id}>
              <h3 className="text-gray-400 text-sm mb-2">
                Chapter {i + 1}: {chapter.name}
              </h3>

              {chapter.lecture.map((lec) => (
                <div
                  key={lec._id}
                  onClick={() => isEnrolled && setCurrentLecture(lec)}
                  className={`p-2 mb-2 rounded cursor-pointer ${
                    currentLecture?._id === lec._id
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {lec.number}. {lec.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 🤖 MODAL */}
      {showNotesModal && currentLecture && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-700 p-6 relative">
            <button
              onClick={() => setShowNotesModal(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            {/* 📄 CONTENT */}
            <div ref={notesRef}>
              <h2 className="text-xl font-bold mb-4">
                AI Notes - {currentLecture.name}
              </h2>

              {/* Key Points */}
              <ul className="list-disc ml-5 mb-4">
                {aiNotes[currentLecture._id]?.keyPoints?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              {/* Summary */}
              <p className="mb-4">{aiNotes[currentLecture._id]?.summary}</p>

              {/* Explanation */}
              <p className="mb-4">{aiNotes[currentLecture._id]?.explanation}</p>

              {/* Terms */}
              <div>
                {aiNotes[currentLecture._id]?.importantItems?.map((item, i) => (
                  <div key={i} className="mb-2 p-2 border rounded">
                    <b>{item.term}</b>
                    <p className="text-sm text-gray-400">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 📥 DOWNLOAD BUTTON */}
            <button
              onClick={downloadPDF}
              className="mt-6 px-4 py-2 bg-green-600 rounded-lg"
            >
              Download PDF 📄
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
