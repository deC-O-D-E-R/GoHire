import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#012a36] text-white px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-accent">Guess</span>
          </h2>
          <p className="text-gray-300 text-sm">
            Shaping your career with intelligent job suggestions.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="/coming-soon" className="hover:text-accent transition">
              <Facebook size={20} />
            </a>
            <a href="/coming-soon" className="hover:text-accent transition">
              <Twitter size={20} />
            </a>
            <a href="/coming-soon" className="hover:text-accent transition">
              <Linkedin size={20} />
            </a>
            <a href="/coming-soon" className="hover:text-accent transition">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="text-sm space-y-2">
          <h3 className="text-lg font-semibold text-white">Headquarters</h3>
          <p className="text-gray-400">JobGuess Pvt. Ltd.</p>
          <p className="text-gray-400">1234 Tech Valley, Tower A</p>
          <p className="text-gray-400">Innovation City, IN 567890</p>
          <p className="text-gray-400">+91 98765 43210</p>
          <p className="text-gray-400">support@jobguess.com</p>
        </div>

        <div className="text-sm space-y-2">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <p className="text-gray-400 hover:text-accent cursor-pointer transition">Privacy Policy</p>
          <p className="text-gray-400 hover:text-accent cursor-pointer transition">Terms & Conditions</p>
          <p className="text-gray-400 hover:text-accent cursor-pointer transition">Data Protection</p>
        </div>

        <div className="text-sm space-y-2">
          <h3 className="text-lg font-semibold text-white">Designed By</h3>
          <p className="text-gray-400">Mohd Saif</p>
          <p className="text-gray-400">MERN Stack Developer</p>
          <p className="text-gray-500">© 2025 JobGuess. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
