/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, TableBody, TableCell, TableHead, TableRow, } from "@mui/material";
import { LibraryBooks } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineFolderAdd, } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as CourseApi from "../../../network/course_api";
import DynamicTable from "../../reusable/DynamicTable";
import WrapperLayout from "../../reusable/WrapperLayout";
import AddModalCourse from "./AddModalCourse";
import TableBodyCourse from "./TableBodyCourse";
import UpdateModalCourse from "./UpdateModalCourse";

export default function CourseWrapper({ courses }) {
  let count = 0;
  const navigate = useNavigate();
  const courseData = courses.data;
  const [modalAddCourse, setModalAMddCourse] = useState(false);
  const [modalUpdateCourse, setModalUpdateCourse] = useState(false);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function handleDeleteCourse(id) {
    const shouldDelete = window.confirm("Are you sure you want to delete this course?");

    if (shouldDelete) {
      try {
        const response = await CourseApi.deleteCourse(id);
        // Handle the response or perform additional actions after successful deletion
        if(response.isSuccess){
          navigate(0)
        }
      } catch (error) {
        // Handle errors if the deletion fails
        console.error("Error deleting course:", error);
      }
    } else {
      // Handle the case when the user cancels the deletion
      console.log("Deletion canceled by the user.");
    }
  }

  async function handleCourseSearch(key) {
    const response = await CourseApi.searchCourse(key);
    if (response.isSuccess === true) {
      setFilteredCourse(response.data);
      setSearchKey(key);
    }
  }


  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex ">
          <div className="py-2 rounded-md group">
            <Button
              onClick={() => setModalAMddCourse(true)}
              variant="outlined"
              className="mr-2 text-[15px] font-semibold hover:text-black"
            >
              <LibraryBooks
                size={20}
              />
              Add

            </Button>
          </div>
        </div>
        <span className="flex text-black ">
          <label htmlFor="" className="hidden">
            Search
          </label>
        </span>
        {/* Used Search function with the combination of View users and filter method */}
        {/* currently un-used the react hook form*/}
        <form className="flex items-center" onSubmit={handleSubmit(handleCourseSearch)}>
          <input
            type="text"
            placeholder="search by name...."
            name="searchKey"
            className=" text-white h-8 bg-mainBlueColor rounded-md px-16 w-full sm:w-min border-none"
            {...register("searchKey", { required: true })}
          />
          <button className="cursor-pointer">
            <BsSearch className="ml-2" />
          </button>
        </form>
      </div>
      <div className="overflow-auto border shadow-md shadow-gray-500 rounded-xl">
        <DynamicTable>
          <TableHead>
            <TableRow className="bg-slate-300">
              <TableCell className=" w-[5%] !text-[13px] 2xl:text-md !text-black !font-bold">ID</TableCell>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Name</TableCell>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Description</TableCell>
              <TableCell className=" w-[5%] !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
              <TableCell className=" w-[10%] !text-[13px] 2xl:text-md !text-black !font-bold" colSpan={2} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchKey ? (
              filteredCourse.length ? (
                filteredCourse.map((course, index) => {
                  count++;
                  return (
                    <TableBodyCourse
                      key={index}
                      index={count}
                      course={course}
                      onDeleteCourseClicked={handleDeleteCourse}
                      openModalUpdate={() => {
                        setCourseToUpdate(course);
                        setModalUpdateCourse(true);
                      }}
                    />
                  );
                })
              ) : (
                <tbody>
                  <span className="w-full flex just">No records found</span>
                </tbody>
              )
            ) : (
              courseData.map((course, index) => {
                count++;
                return (
                  <TableBodyCourse
                    key={index}
                    index={count}
                    course={course}
                    onDeleteCourseClicked={handleDeleteCourse}
                    openModalUpdate={() => {
                      setCourseToUpdate(course);
                      setModalUpdateCourse(true);
                    }}
                  />
                );
              })
            )}
          </TableBody>
        </DynamicTable>

      </div>
      {/* </div> */}

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
            setCourseToUpdate(null);
            setModalUpdateCourse(false);
          }}
        />
      )}
      {/* </div> */}
    </WrapperLayout>
  );
}
