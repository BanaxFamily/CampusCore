import { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import AddModalCourse from "./AddModalCourse";
import * as CourseApi from "../../../network/course_api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function UserWrapper() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    async function loadCourse(){
      const resposnse = await CourseApi.viewCourse()
      
    }
    }
  });
  async function newCourse() {
    const response = await CourseApi.addCourse();
    if (response.status !== 200) {
      alert(`Error: ${response.message}`);
    } else {
      alert("Course added successfully!");
      reset()
      navigate(0)

    }

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
                  onClick={() => setShowAddModal(true)}
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
              // onChange={handleInputChange}
              className=" text-white bg-mainBlueColor rounded-md px-16 w-full sm:w-min border-none py-1"
              // {...register("searchKey", { required: true })}
            />
            <button className="cursor-pointer">
              <BsSearch className="ml-2" />
            </button>
          </form>
        </div>
        <div className="overflow-auto  shadow-md h-[30rem] shadow-gray-500 rounded-sm">
          <table className="table-auto text-center overflow-auto min-w-[650px] lg:min-w-0 lg:w-full ">
            <thead className="uppercase">
              <tr className="text-[12px] bg-gray-300 font-medium">
                <td className="px-2 py-1">ID</td>
                <td className="px-2 py-1">username</td>
                <td className="px-2 py-1">firstname</td>
                <td className="px-2 py-1">lastname</td>
                <td className="px-2 py-1">status</td>
                <td className="px-2 py-1">role</td>
                <td className="px-2 py-1" colSpan="2">
                  action
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddModalCourse onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
