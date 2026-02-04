import { ChefHat, Clock, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ChefHat className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">CUSTECH Eats</h3>
                <p className="text-xs text-muted-foreground">University Restaurant</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Serving quality meals to CUSTECH students and staff. 
              Order online and skip the queue!
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Operating Hours
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>CUSTECH Campus, Main Building</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+234 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CUSTECH University Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
