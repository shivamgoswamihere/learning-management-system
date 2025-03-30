import React, { useState, useEffect } from 'react';

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    role: "Full Stack Developer",
    testimonial: "Brook's mentorship helped me level up my coding skills. The project-based learning approach is fantastic!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Frontend Engineer",
    testimonial: "The React component series gave me the confidence to build complex UIs with ease. Highly recommended!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAF9_aVW_JaNa6KU2-f0USKAhL1lPhuVxcng&s"
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Backend Developer",
    testimonial: "Learning Node.js and Express was a breeze thanks to Brook's practical explanations.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0krX0e-PY9YM7zNJ7i5iPPZxYHhg7NJ3yuA&s"
  },
  {
    id: 4,
    name: "Bob Williams",
    role: "UI/UX Designer",
    testimonial: "I improved my design-to-code skills drastically by following the Tailwind CSS tutorials.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSC4YpV2Wsenk9MEeoauZ1RLX_AFbdS1EhSg&s"
  },
  {
    id: 5,
    name: "Eve Adams",
    role: "DevOps Engineer",
    testimonial: "The Next.js tips were incredibly useful. I implemented them in my real-world project.",
    image: "https://watermark.lovepik.com/photo/20220316/large/lovepik-professional-business-woman-elite-image-picture_502367423.jpg"
  },
  {
    id: 6,
    name: "Charlie Brown",
    role: "Tech Lead",
    testimonial: "Brook's guidance helped me lead my team with confidence. His practical insights are invaluable.",
    image: "https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
  }
];

const Testimonial = () => {
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    // Shuffle the testimonials and pick 3 random ones
    const shuffled = [...testimonialsData].sort(() => 0.5 - Math.random());
    setRandomTestimonials(shuffled.slice(0, 3));
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Trusted By Many</h1>
        <div className="flex flex-wrap -m-4">
          {randomTestimonials.map((item) => (
            <div key={item.id} className="p-4 md:w-1/3 w-full">
              <div className="h-full bg-gray-100 p-8 rounded shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50z"/>
                </svg>
                <p className="leading-relaxed mb-6">{item.testimonial}</p>
                <a className="inline-flex items-center">
                  <img alt="testimonial" src={item.image} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">{item.name}</span>
                    <span className="text-gray-500 text-sm">{item.role}</span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
