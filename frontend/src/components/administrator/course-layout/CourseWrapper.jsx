/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import AddModalCourse from "./AddModalCourse";
import * as CourseApi from "../../../network/course_api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TableBodyCourse from "./TableBodyCourse";
import UpdateModalCourse from "./UpdateModalCourse";

export default function CourseWrapper({ courses }) {
  let count = 0;
  const navigate = useNavigate();
  const [modalAddCourse, setModalAMddCourse] = useState(false);
  const [modalUpdateCourse, setModalUpdateCourse] = useState(false);
  const [filteredCourse, setFilteredCourse] = useState(courses.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function handleDeleteCourse(id) {
    const response = await CourseApi.deleteCourse(id);
    console.log(id)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredData = courses.filter(
      (course) =>
        course.name &&
        course.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    setFilteredCourse(filteredData);
  };

  return (
    <div className="mt-4 min-h-[20rem] overflow-auto text-sm">
      <div className="flex flex-col gap-2 py-2 ">
        <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
          <div className="flex ">
            <div className="bg-blue-600 px-4 py-2 rounded-md group hover:bg-blue-400">
              <span
                className="text-sm flex items-center gap-1 text-white uppercase px-
                group-hover:text-slate-300  hover:cursor-pointer"
              >
                {" "}
                Add
                <AiOutlineFolderAdd
                  size={20}
                  onClick={() => setModalAMddCourse(true)}
                />
              </span>
            </div>
          </div>
          <span className="flex text-black ">
            <label htmlFor="" className="hidden">
              Search
            </label>
          </span>
          {/* Used Search function with the combination of View users and filter method */}
          {/* currently un-used the react hook form*/}
          <form className="flex">
            <input
              type="text"
              placeholder="search by name...."
              name="searchKey"
              // defaultValue={searchTerm}
              onChange={handleSearch}
              className=" text-white bg-mainBlueColor rounded-md px-16 w-full sm:w-min border-none py-1"
              // {...register("searchKey", { required: true })}
            />
            <button className="cursor-pointer">
              <BsSearch className="ml-2" />
            </button>
          </form>
        </div>
        <div className="overflow-auto border shadow-md h-[30rem] shadow-gray-500 rounded-sm">
          <table className="table-auto text-center border-collapse overflow-auto min-w-[650px] lg:min-w-0 lg:w-full ">
            <thead className="uppercase border border-slate-300">
              <tr className="text-[12px] border border-slate-300 bg-gray-300 font-medium">
                <td className="px-2 py-1 border border-slate-300">ID</td>
                <td className="px-2 py-1 border border-slate-300">name</td>
                <td className="px-2 py-1 border border-slate-300">
                  description
                </td>
                <td className="px-2 py-1 border border-slate-300">status</td>
                <td className="px-2 py-1 border border-slate-300" colSpan="2">
                  action
                </td>
              </tr>
            </thead>
            <tbody className="text-[13px] bg-gray-100 hover:bg-gray-200">
              {filteredCourse.map((course, index) => {
                count++;
                return (
                  <TableBodyCourse
                    className="py-2"
                    key={index}
                    index={count}
                    course={course}
                    onDeleteUserCliked={handleDeleteCourse}
                    openModalUpdate={() => {
                      setCourseToUpdate(course);
                      setModalUpdateCourse(true);
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalAddCourse && (
        <AddModalCourse
          onClose={() => {
            navigate(0);
            setModalAMddCourse(false);
          }}
        />
      )}

      {modalUpdateCourse && (
        <UpdateModalCourse
          course={courseToUpdate}
          onClose={() => {
            setCourseToUpdate(null)
            setModalUpdateCourse(false);
            
          }}
        />
      )}
    </div>
  );
}
