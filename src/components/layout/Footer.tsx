import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 italic">As-Salf (The Heritage)</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Preserving Sacred Knowledge, Bridging Languages, Sustaining Values.
              Empowering the next generation of scholars in Nigeria.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/vault" className="hover:underline">The Vault</Link></li>
              <li><Link to="/hub" className="hover:underline">Translation Hub</Link></li>
              <li><Link to="/dashboard" className="hover:underline">My Learning</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support &amp; Help</h4>
            <div className="space-y-3 text-sm opacity-80">
              <p className="font-medium opacity-100">Need help? Contact us:</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span>📧</span>
                <a href="mailto:eictinstitute@gmail.com" className="hover:underline">eictinstitute@gmail.com</a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span>💬</span>
                <a href="https://wa.me/2348133965553" target="_blank" rel="noopener noreferrer" className="hover:underline">+234 813 396 5553</a>
                <span className="text-xs opacity-60">(Chat only)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-xs opacity-60">
          © {new Date().getFullYear()} As-Salf Heritage Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
