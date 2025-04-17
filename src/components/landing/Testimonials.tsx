
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "CookSnap revolutionized my cooking experience! I just snap a photo and get the perfect recipe every time.",
    author: "Jamie L.",
    role: "Home Cook"
  },
  {
    quote: "The recipe recognition is incredibly accurate. It's like having a personal chef in my pocket.",
    author: "Sarah M.",
    role: "Food Enthusiast"
  },
  {
    quote: "I've discovered so many new recipes I would have never tried. The nutritional info helps me stay on track with my goals.",
    author: "Alex T.",
    role: "Fitness Coach"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="font-medium text-primary">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
