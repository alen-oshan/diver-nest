export default function DivingNestFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#205781] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} Diving Nest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}