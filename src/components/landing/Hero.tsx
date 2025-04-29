import React from 'react';
import FloatingFoodElements from '../common/FloatingFoodElements';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <FloatingFoodElements
        count={40}
        speed={1.5}
        sizeRange={[20, 40]}
        opacityRange={[0.3, 0.5]}
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
          Ready to Transform Your Cooking
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          Discover the joy of cooking with our innovative platform
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-orange-500">150+</div>
            <div className="text-gray-600 dark:text-gray-400">Recipes</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-amber-500">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Cuisines</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-yellow-500">4.5+</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-orange-400">30min</div>
            <div className="text-gray-600 dark:text-gray-400">Prep Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
