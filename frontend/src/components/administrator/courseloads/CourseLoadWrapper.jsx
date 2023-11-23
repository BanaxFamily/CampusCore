/* eslint-disable no-unused-vars */
import { GiNotebook } from "react-icons/gi";
import WrapperLayout from "../../reusable/WrapperLayout";
import OfferedCourseTable from "./OfferedCourseTable";
import { useEffect, useState } from "react";
import AddOfferedCourse from "./AddOfferedCourse";
import * as CourseApi from "../../../network/course_api"
import * as OfferedCourse from "../../../network/offeredCourse_api"
import { TextField, Button, Divider, Stack } from "@mui/material";
import { useForm } from "react-hook-form";


export default function CourseLoadWrapper() {
  const [offeredCourseAdd, setOfferedCourseAdd] = useState(false);
  const [displayAll, setDisplayAll] = useState(false);
  const [openCoursesData, setOpenCoursesData] = useState([]);
  const [allOfferedCourseData, setAllOfferedCourseData] = useState([])
  const [sortedCourse, setSortedCourse] = useState([])
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    setDisplayAll(false)
    async function getAllOfferedCourse() {
      const response = await OfferedCourse.viewAllOfferedCourse()
      setAllOfferedCourseData(response.data)
    }

    async function openCourses() {
      const response = await CourseApi.viewCourse();
      setOpenCoursesData(response.data.filter(
        (course) => course.status.toLowerCase() !== "close"
      ));
    }
    setDisplayAll(true)
    getAllOfferedCourse()
    openCourses()
  }, [])

  async function sortBySemAndYear(credentials) {
    const response = await OfferedCourse.sortOfferedCourse(credentials)
    setSortedCourse(response.data)
  }


  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row sm:justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex justify-between w-full">
          <Stack direction="row" className="gap-2">

            <form action="" onSubmit={handleSubmit(sortBySemAndYear)} className="flex gap-1">
              <Stack direction="row" className="gap-2">
                <div className="flex gap-1">


                  <TextField
                    sx={{
                      width: { sm: 200, md: 120 },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Set the desired font size for the label
                        marginTop: "-4px", // Adjust the vertical alignment of the label
                      },
                      "& .MuiInputBase-root": {
                        height: 35,
                      }
                    }}
                    id="filled-sem"
                    select
                    label="Semester"
                    SelectProps={{
                      native: true,
                    }}
                    required
                    variant="outlined"
                    name="sem"
                    {...register("sem", { required: "select one option" })}
                  >
                    <option value=""></option>
                    <option value="first">1st</option>
                    <option value="second">2st</option>
                  </TextField>
                  <TextField
                    sx={{
                      width: { sm: 200, md: 120 },
                      "& .MuiInputLabel-root": {
                        fontSize: "14px", // Set the desired font size for the label
                        marginTop: "-4px", // Adjust the vertical alignment of the label
                      },
                      "& .MuiInputBase-root": {
                        height: 35,
                      }
                    }}
                    required
                    id="outline-year"
                    name="acadYear"
                    label="Year"
                    variant="outlined"
                    {...register("acadYear", { required: "this si required" })}

                  />

                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full flex self-end hover:text-black" variant="outlined"> Search</Button>
              </Stack>

            </form>

            <Button
              onClick={() => {
                setSortedCourse(allOfferedCourseData);
              }}
              variant="outlined"
              className="mr-2 flex w-full  self-end text-[15px] font-semibold hover:text-black"
            >
              view all
            </Button>

          </Stack>
          <div className=" flex flex-col gap-1 justify-center items-center  ">
            <Button
              onClick={() => {
                setOfferedCourseAdd(true);
              }}
              variant="outlined"
              className="mr-2 text-[15px] font-semibold hover:text-black"
            >
              Assign course
              <GiNotebook size={25} />
            </Button>

          </div>
        </div>
      </div>
      <Stack className="my-4">
        <Divider />
      </Stack>

      {sortedCourse.length > 0 ? <OfferedCourseTable courseOffered={sortedCourse} /> : <p>No record found</p>}

      {/* ASSIGNED A COURSE MODAL  TO A PROFESSOR */}
      {offeredCourseAdd && (
        <AddOfferedCourse
          offeredCourse={openCoursesData}
          onClose={() => setOfferedCourseAdd(false)} />
      )}
    </WrapperLayout>
  );
}
