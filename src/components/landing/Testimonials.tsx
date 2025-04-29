import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Food Enthusiast",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    review: "The best food delivery platform in Delhi! I love how easy it is to discover new restaurants and cuisines."
  },
  {
    name: "Priya Patel",
    role: "Working Professional",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    review: "Quick delivery and amazing food quality. The variety of restaurants available is impressive!"
  },
  {
    name: "Amit Kumar",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    review: "Great platform with reliable delivery. The ratings and reviews help me make better choices."
  },
  {
    name: "Neha Gupta",
    role: "Food Blogger",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5,
    review: "As a food blogger, I appreciate the diverse range of cuisines available. The search functionality is excellent!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our satisfied customers about their experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
