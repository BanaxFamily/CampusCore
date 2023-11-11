/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BsArrowRightCircle } from "react-icons/bs";
export default function EnrolledCourse(props) {
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {props.subject.map((course, index) => (
        <div key={index} className=" mx-2 group cursor-pointer ">
          <div className="px-4 flex flex-col gap-2 pt-3 pb-8 shadow-md rounded-md shadow-gray-400 group-hover:shadow-md group-hover:shadow-blue-700" >
            <h3 className="tracking-wide font-semibold uppercase">
              {course}
            </h3>
            <div className="flex flex-col text-[12px] group-hover:text-blue-700">
              <span>99921 | 1:30 - 3:30 PM |</span>
              <span> MONDAY - WEDNESDAY</span>
            </div>
            <div className="flex justify-end">
              <button className="group-hover:text-blue-800">
                <BsArrowRightCircle size={20}/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
