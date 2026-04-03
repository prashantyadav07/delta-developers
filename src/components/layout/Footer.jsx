import { siteConfig } from '../../constants/config';
import { navLinks } from '../../constants/navLinks';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4 text-primary">{siteConfig.name}</h3>
            <p className="text-muted-foreground max-w-sm">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${siteConfig.contactEngineers}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {siteConfig.contactEngineers}
                </a>
              </li>
              <li className="pt-4 flex gap-4">
                <a href={siteConfig.socials.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
                <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <NavLink to="/privacy" className="hover:text-foreground">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-foreground">Terms of Service</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
