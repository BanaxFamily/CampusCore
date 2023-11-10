import { GiNotebook } from "react-icons/gi";
import WrapperLayout from "../../reusable/WrapperLayout";
import OfferedCourseTable from "./OfferedCourseTable";

export default function CourseLoadWrapper() {
  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex justify-between w-full">
          <form action="" className="flex gap-2">
            <div className="flex gap-2 items-center shadow-gray-200 p-2">
              <label htmlFor="sem">Semester</label>
              <select
                name="sem"
                id="id"
                className="bg-gray-100 px-3 py-1 rounded-md"
              >
                <option value="first">1st semester</option>
                <option value="second">2nd semester</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                name="year"
                id="year"
                placeholder=""
                className=" bg-gray-100 border-none outline-none rounded-md px-2 py-1"
              />
            </div>
          </form>

          <div className="flex justify-center items-center  ">
            <div className=" flex text-white px-2 py-1 rounded-md bg-blue-500">
              <button className="mr-2 text-[15px] font-semibold  ">
                Add new
              </button>
              <GiNotebook size={25} />
            </div>
          </div>
        </div>
      </div>
      <OfferedCourseTable/>
    </WrapperLayout>
  );
}
