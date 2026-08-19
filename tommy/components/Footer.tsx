export default function Footer() {
  return (
  <footer className="bg-transparent border-t-0 font-serif">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-md font-semibold tracking-wider uppercase" style={{ color: 'var(--heading-text)' }}>Contact</h3>
          <p className="mt-4">
            <a href="mailto:hello@tommyreads.com" className="transition-colors duration-200" style={{ color: 'var(--link)' }}>hello@tommyreads.com</a>
          </p>
        </div>
        <div className="mt-8 pt-8">
          <p className="text-center" style={{ color: 'var(--paragraph-text)' }}>&copy; 2026 Tommy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}