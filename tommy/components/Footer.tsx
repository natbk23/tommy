export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#f6e7d7] via-[#fbead1] to-[#e9cba7] border-t-4 border-[#c89f6a] font-serif">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-md font-semibold text-[#a86b32] tracking-wider uppercase">Contact</h3>
            <p className="mt-4 text-[#a86b32]">Get in touch with us</p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-[#a86b32] tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-[#a86b32] hover:text-[#c89f6a] transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-[#a86b32] hover:text-[#c89f6a] transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-[#a86b32] tracking-wider uppercase">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-[#a86b32] hover:text-[#c89f6a] transition-colors duration-200">Twitter</a>
              <a href="#" className="text-[#a86b32] hover:text-[#c89f6a] transition-colors duration-200">Instagram</a>
              <a href="#" className="text-[#a86b32] hover:text-[#c89f6a] transition-colors duration-200">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-[#c89f6a] pt-8">
          <p className="text-center text-[#a86b32]">&copy; 2025 Tommy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}