import { FaWhatsapp, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 w-full text-center">

      <div className="container mx-auto flex flex-wrap justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt size={20} />
          <span>Armenia, Quindío</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone size={20} />
          <span>+57 302 478 3348</span>
        </div>
        <a
          href="https://wa.me/573024783348"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-400 hover:text-green-700 transition"
        >
          <FaWhatsapp size={20} />
          Contáctanos
        </a>
      </div>
    </footer>
  );
}



