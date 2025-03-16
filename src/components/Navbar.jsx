export default function Navbar(){
    return (
      <nav className="bg-white shadow-md py-4 fixed top-0 left-0 w-full flex items-center">
        <div className="container mx-auto flex items-center">
          <img src="/logo.png" alt="Viva Express" className="h-7" />
          {/* <span className="ml-2 font-bold text-lg text-red-600">Viva <span className="text-blue-600">Express</span></span> */}
        </div>
      </nav>
    );
  };