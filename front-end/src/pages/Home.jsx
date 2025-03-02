import React from "react";
import Slider from "../components/Slider";
import Carousel from "./../components/Carousel";
import CourseCard from "../components/CourseCard";

const Home = () => {
  const data = [
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
    {
      image:
        "https://images.pexels.com/photos/30294328/pexels-photo-30294328/free-photo-of-modern-cafe-interior-with-warm-aesthetic.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "heading 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt, quibusdam possimus autem, cum nulla provident odio necessitatibus sapiente magnam rerum mollitia laborum, modi velit dicta. Vero facere qui culpa.",
    },
  ];

  return (
    <div>
      <div className="max-w-[1350px] mx-auto px-4">
        <Carousel />
        <Slider />
        <h1 className="text-5xl font-bold my-4">Explore Courses</h1>
        <div className="max-md:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-3 gap-10">
          {data.map((item, index) => (
            <CourseCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
