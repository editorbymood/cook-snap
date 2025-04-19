
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">About CookSnap</h1>
        
        <section className="space-y-6 text-muted-foreground">
          <p>
            CookSnap is your intelligent cooking companion that transforms the way you interact with food. 
            Our innovative app uses advanced image recognition technology to instantly identify ingredients 
            and suggest delicious recipes tailored to what you have on hand.
          </p>
          
          <h2 className="text-2xl font-semibold text-foreground mt-8">Our Mission</h2>
          <p>
            We believe that cooking should be accessible, enjoyable, and stress-free for everyone. 
            Our mission is to empower home cooks by providing them with the tools and inspiration 
            they need to create amazing meals from everyday ingredients.
          </p>
          
          <h2 className="text-2xl font-semibold text-foreground mt-8">How It Works</h2>
          <p>
            Simply snap a photo of your ingredients, and our AI-powered technology will analyze the image 
            and suggest various recipes you can make. Each recipe comes with detailed instructions, 
            nutritional information, and helpful tips to ensure your culinary success.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
