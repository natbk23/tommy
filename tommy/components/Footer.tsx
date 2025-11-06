export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Contact</h3>
            <p className="mt-4 text-gray-500">Get in touch with us</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">&copy; 2025 Tommy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}