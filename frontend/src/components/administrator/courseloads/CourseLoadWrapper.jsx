import { GiNotebook } from "react-icons/gi";
import WrapperLayout from "../../reusable/WrapperLayout";
import OfferedCourseTable from "./OfferedCourseTable";
import { useEffect, useState } from "react";
import AddOfferedCourse from "./AddOfferedCourse";
import * as CourseApi from "../../../network/course_api"
import * as OfferedCourse from "../../../network/offeredCourse_api"
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

// CANNOT ACCESS SOME FIELD (frontend is working only backend has a problem)

export default function CourseLoadWrapper() {
  const [offeredCourseAdd, setOfferedCourseAdd] = useState(false);
  const [openCoursesData, setOpenCoursesData] = useState([]);
  const [allOfferedCourseData, setAllOfferedCourseData] = useState([])
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {

    async function getAllOfferedCourse(){
      const response = await OfferedCourse.viewAllOfferedCourse()
      setAllOfferedCourseData(response.data)
      console.log(response)
    }

    async function openCourses() {
      const response = await CourseApi.viewCourse();
      setOpenCoursesData(response.data.filter(
        (course) => course.status.toLowerCase() !== "close"
      ));
    }
    getAllOfferedCourse()
    openCourses()
  }, [])


  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex justify-between w-full">
          <form action="" className="flex gap-2">
            <div className="flex gap-2 items-center shadow-gray-200 p-2">

              <TextField
                sx={{
                  width: { sm: 200, md: 100 },
                  "& .MuiInputBase-root": {
                    height: 40
                  }
                }}
                id="filled-sem"
                select
                label="Semester"
                SelectProps={{
                  native: true,
                }}
                variant="filled"
                name="sem"
                {...register("sem", { required: "select one option" })}
              >
                <option value=""></option>
                <option value="1st">1st</option>
                <option value="2st">2st</option>
              </TextField>
            </div>

            <div className="flex gap-2 items-center">
              <TextField
                sx={{
                  width: { sm: 200, md: 200 },
                  "& .MuiInputBase-root": {
                    height: 40
                  }
                }}
                required
                id="outline-year"
                name="year"
                label="Year"
                {...register("year", { required: "this si required" })}

              />

            </div>
          </form>

          <div className="flex justify-center items-center  ">
            <div className=" flex text-white px-2 py-1 rounded-md bg-blue-500">
              <button
                onClick={() => {
                  setOfferedCourseAdd(true);
                }}
                className="mr-2 text-[15px] font-semibold  "
              >
                Add new
              </button>
              <GiNotebook size={25} />
            </div>
          </div>
        </div>
      </div>

      <OfferedCourseTable courseOffered={allOfferedCourseData} />

      {offeredCourseAdd && (
        <AddOfferedCourse
          offeredCourse={openCoursesData}
          onClose={() => setOfferedCourseAdd(false)} />
      )}
    </WrapperLayout>
  );
}
