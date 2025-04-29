import React from 'react';
import { Clock, Star, Truck, Utensils } from 'lucide-react';

const features = [
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Diverse Cuisines",
    description: "Explore over 50+ cuisines from around the world, all in one place."
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Top Rated",
    description: "Find the best restaurants based on real customer reviews and ratings."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Quick Delivery",
    description: "Get your favorite food delivered in under 30 minutes on average."
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Easy Ordering",
    description: "Simple and intuitive ordering process with multiple payment options."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover what makes us the best choice for food delivery in Delhi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
