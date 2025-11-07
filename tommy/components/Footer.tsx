export default function Footer() {
  return (
  <footer className="bg-transparent border-t-0 font-serif">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase" style={{ color: 'var(--heading-text)' }}>Contact</h3>
            <p className="mt-4" style={{ color: 'var(--paragraph-text)' }}>Get in touch with us</p>
          </div>
          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase" style={{ color: 'var(--heading-text)' }}>Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase" style={{ color: 'var(--heading-text)' }}>Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>Twitter</a>
              <a href="#" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>Instagram</a>
              <a href="#" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8">
          <p className="text-center" style={{ color: 'var(--paragraph-text)' }}>&copy; 2025 Tommy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}