import React from 'react';

function CourseCard({ image, heading, description }) {
  return (
    <div className='flex flex-col gap-2 w-full h-fit bg-white shadow-xl p-2 rounded-md'>
      <div className="bg-blue-200 text-center object-cover h-[200px] ">
        <img src={image} alt="Course" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="text-2xl font-bold">{heading}</div>
      <div className="text-lg line-clamp-2 overflow-hidden">{description}</div>
      <div className="text-sm font-semibold bg-[#6d28d2] hover:cursor-pointer text-white w-fit px-4 py-2 my-4 rounded-sm hover:bg-[#6d28af]">
        Buy Now
      </div>
    </div>
  );
}

export default CourseCard;
