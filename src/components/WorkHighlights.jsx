import React from 'react';

const WorkHighlights = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Work Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary h-48 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Corporate Events</h3>
            <p className="text-gray-600">Professional event management for businesses</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary h-48 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Weddings</h3>
            <p className="text-gray-600">Creating dream weddings that last a lifetime</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-primary h-48 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Private Celebrations</h3>
            <p className="text-gray-600">Memorable moments for special occasions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHighlights;
