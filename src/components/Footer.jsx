import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Learnify AI
            </h2>
            <p className="text-sm leading-relaxed">
              Create professional courses and generate notes, quizzes, and solve
              doubts using AI. Learn smarter and faster with automation.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                Features
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Testimonials
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Pricing
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Get Started
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <div className="flex gap-4 text-lg">
              <FaGithub className="hover:text-white cursor-pointer transition" />
              <FaLinkedin className="hover:text-white cursor-pointer transition" />
              <FaTwitter className="hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-3">
          <p>© {new Date().getFullYear()} Learnify AI. All rights reserved.</p>

          <p className="text-gray-500">Crafted with ❤️ by Anubhav</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
