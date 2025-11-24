import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Logo className="h-14 w-auto mb-4" />
            <p className="text-muted-foreground text-sm max-w-md">
              A collaborative network of stakeholders working together
              to conserve and protect water resources in Kenya's Lake Victoria Basin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-portfolio">
                    Our Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/network">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-network">
                    Stakeholder Network
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" data-testid="link-footer-news">
                    News & Updates
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Lake Victoria Basin, Kenya
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@marasondu.org"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-email"
                >
                  info@marasondu.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+254700000000"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-phone"
                >
                  +254 700 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} MaraSondu Stakeholders Forum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
