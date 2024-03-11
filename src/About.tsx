import React from 'react';

const About = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">About Virtual Palette</h2>
      <p className="mb-4">
        Virtual Palette is an innovative product that allows users to...
      </p>
      <h3 className="text-xl font-bold mb-2">Features</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
      <h3 className="text-xl font-bold mb-2">Team</h3>
      <p>
        Virtual Palette was created by a talented team of developers and designers...
      </p>
    </div>
  );
};

export default About;