import React from 'react';

const TeamSection = () => {
  const team = [
    { name: 'Jane Doe', role: 'Lead Event Planner', image: '' },
    { name: 'Tom Wilson', role: 'Catering Manager', image: '' },
    { name: 'Lisa Anderson', role: 'Decorations Specialist', image: '' },
    { name: 'Mark Davis', role: 'Entertainment Coordinator', image: '' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-300 h-48 w-48 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
