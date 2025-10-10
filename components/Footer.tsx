export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-olive-200 mt-12">
      <div className="max-w-4xl mx-auto">
        <p>© {new Date().getFullYear()} Tommy — Name your feeling, find your story.</p>
      </div>
    </footer>
  );
}
