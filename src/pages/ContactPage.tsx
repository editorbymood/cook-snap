
import { Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-6">
            <p className="text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you. 
              Our team is always ready to assist you with any inquiries.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@cooksnap.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </section>
          
          <section className="bg-secondary/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 4:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
