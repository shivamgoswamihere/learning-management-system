import { useState } from "react";
import React from "react";
export default function CourseCategories() {
  const courses = {
    HTML: {
      description: "Learn the fundamentals of HTML, the structure of web pages.",
      modules: [
        {
          name: "Introduction to HTML",
          chapters: ["What is HTML?", "Basic Structure of an HTML Document", "HTML Tags & Elements"],
        },
        {
          name: "HTML Forms & Multimedia",
          chapters: ["Forms & Inputs", "Embedding Videos & Audio", "HTML Tables"],
        },
        {
          name: "Semantic HTML & Best Practices",
          chapters: ["Semantic Tags", "SEO & Accessibility", "HTML5 Features"],
        },
      ],
    },
    CSS: {
      description: "Master CSS to style web pages with layouts, animations, and responsiveness.",
      modules: [
        {
          name: "CSS Basics",
          chapters: ["CSS Selectors", "Box Model", "CSS Units & Colors"],
        },
        {
          name: "Advanced CSS",
          chapters: ["Flexbox & Grid", "CSS Animations", "CSS Variables"],
        },
        {
          name: "Responsive Web Design",
          chapters: ["Media Queries", "Mobile-First Design", "CSS Frameworks"],
        },
      ],
    },
    JavaScript: {
      description: "Understand JavaScript concepts, ES6+, and DOM manipulation.",
      modules: [
        {
          name: "JavaScript Fundamentals",
          chapters: ["Variables & Data Types", "Functions & Scope", "Loops & Conditions"],
        },
        {
          name: "DOM Manipulation",
          chapters: ["Selecting Elements", "Event Listeners", "Creating & Removing Elements"],
        },
        {
          name: "Asynchronous JavaScript",
          chapters: ["Promises", "Async/Await", "Fetching Data from APIs"],
        },
      ],
    },
    React: {
      description: "Build modern web applications using React and hooks.",
      modules: [
        {
          name: "Introduction to React",
          chapters: ["JSX & Components", "Props & State", "React Lifecycle Methods"],
        },
        {
          name: "Advanced React",
          chapters: ["React Hooks", "Context API", "React Router"],
        },
        {
          name: "State Management",
          chapters: ["Redux & Redux Toolkit", "Recoil & Zustand", "Global State Management"],
        },
      ],
    },
    "Node.js": {
      description: "Develop backend applications using Node.js and Express.",
      modules: [
        {
          name: "Getting Started with Node.js",
          chapters: ["What is Node.js?", "NPM & Modules", "Creating a Simple Server"],
        },
        {
          name: "Building APIs with Express",
          chapters: ["Routing", "Middleware", "REST API Concepts"],
        },
        {
          name: "Databases & Authentication",
          chapters: ["MongoDB & Mongoose", "User Authentication", "JWT & OAuth"],
        },
      ],
    },
    "Vue.js": {
      description: "Create reactive UI components using Vue.js.",
      modules: [
        {
          name: "Vue.js Basics",
          chapters: ["Vue Instance", "Directives & Bindings", "Methods & Events"],
        },
        {
          name: "Component-Based Development",
          chapters: ["Props & Events", "Slots & Scoped Styles", "Vue Router"],
        },
        {
          name: "Vue State Management",
          chapters: ["Vuex & Pinia", "Composition API", "Performance Optimization"],
        },
      ],
    },
  };

  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="px-10 py-16">
      {/* Course Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {Object.keys(courses).map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCourse(category)}
            className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition"
          >
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
        ))}
      </section>

      {/* Course Details & Syllabus */}
      {selectedCourse && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold">{selectedCourse} Course</h2>
          <p className="mt-2 text-gray-700">{courses[selectedCourse].description}</p>

          {/* Syllabus Modules */}
          <div className="mt-4">
            {courses[selectedCourse].modules.map((module, index) => (
              <div key={index} className="mt-4 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold">{module.name}</h3>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                  {module.chapters.map((chapter, idx) => (
                    <li key={idx}>{chapter}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
