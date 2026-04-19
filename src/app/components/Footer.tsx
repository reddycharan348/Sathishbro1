import { Zap, Mail, MapPin, Phone, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { memo } from 'react';

export const Footer = memo(function Footer() {
  const footerLinks = {
    Platform: [
      { name: 'All Branches', page: 'branches' },
      { name: 'Courses', page: 'courses' },
      { name: 'Virtual Labs', page: 'projects' },
      { name: 'AI Tools', page: 'ai' },
      { name: 'Career Hub', page: 'career' },
    ],
    Resources: [
      { name: 'Documentation', page: 'home' },
      { name: 'Blog', page: 'home' },
      { name: 'Tutorials', page: 'roadmap' },
      { name: 'Success Stories', page: 'home' },
      { name: 'FAQs', page: 'home' },
    ],
    Company: [
      { name: 'About Us', page: 'home' },
      { name: 'Contact', page: 'home' },
      { name: 'Careers', page: 'career' },
      { name: 'Partners', page: 'home' },
      { name: 'Press Kit', page: 'home' },
    ],
    Legal: [
      { name: 'Privacy Policy', page: 'home' },
      { name: 'Terms of Service', page: 'home' },
      { name: 'Cookie Policy', page: 'home' },
      { name: 'Refund Policy', page: 'home' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/EduPulseX', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/edupulsex', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/edupulsex', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@edupulsex', label: 'YouTube' },
  ];

  const handleNavigation = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const event = new CustomEvent('navigate', { detail: page });
    window.dispatchEvent(event);
  };

  return (
    <footer className="bg-page-bg text-text-secondary border-t border-surface-border theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-2 rounded-lg shadow-lg shadow-blue-500/50">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">EduPulseX</span>
            </div>
            <p className="text-sm mb-6 text-text-muted">
              Your AI-Powered Learning Assistant. Empowering engineering students across
              all branches with personalized learning and career guidance.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:support@edupulsex.com" className="hover:text-heading transition-colors">
                  support@edupulsex.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@edupulsex.com" className="hover:text-heading transition-colors">
                  info@edupulsex.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+919949167458" className="hover:text-heading transition-colors">
                  +91 9949167458
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Tirupati, AP, India</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-heading font-semibold mb-4">{category}</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation(link.page); }} className="hover:text-blue-500 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        <div className="border-t border-surface-border pt-8 mb-8">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="text-heading font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-text-muted mb-4">
              Get the latest courses, tips, and opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 sm:py-3 bg-surface border border-surface-border rounded-lg focus:outline-none focus:border-blue-500 text-heading placeholder:text-text-muted transition-colors"
              />
              <button className="px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted text-center md:text-left">
            © 2025 EduPulseX. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-heading hover:border-blue-500/50 flex items-center justify-center transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});