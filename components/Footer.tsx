import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex justify-between items-center">
      {/* Teks hak cipta di kiri */}
      <p className="text-sm">&copy; 2025 WorkQuest. All rights reserved.</p>

      {/* Ikon Sosial Media di kanan */}
      <div className="flex space-x-4">
        <a href="https://github.com/ADRIANHHALIM" target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 hover:text-blue-500 transition" />
        </a>
        <a href="https://www.linkedin.com/in/adrian-halim-2226b5254/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 hover:text-blue-500 transition" />
        </a>
        <a href="https://instagram.com/adrianhhalim" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-5 h-5 hover:text-blue-500 transition" />
        </a>
      </div>
    </footer>
  );
}
