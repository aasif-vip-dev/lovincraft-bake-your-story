import { Heart, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-warm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 fill-primary text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                {t.common.brandName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                  {t.footer.shopProducts}
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                  {t.footer.ourStory}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                  {t.footer.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">{t.footer.getInTouch}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span>{t.footer.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">{t.footer.stayConnected}</h3>
            <p className="text-sm text-muted-foreground">
              {t.footer.discountOffer}
            </p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright.replace('{year}', String(currentYear))}{" "}
            <Heart className="inline h-3 w-3 fill-primary text-primary" /> {t.footer.by}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
