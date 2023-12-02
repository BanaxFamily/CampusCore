import { CircularProgress, Divider, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as EnrollmentApi from "../../../network/courseEnrollment_api"
import * as OfferedCourse from "../../../network/offeredCourse_api"
import BackNav from "../../reusable/BackNav"
import BreadCrumb from "../../reusable/BreadCrumb"
import DashBoardHeading from "../../reusable/DashBoardHeading"
import DynamicTable from "../../reusable/DynamicTable"
import ConfirmDialogCourseLoads from "./ConfirmDialogCourseLoads"
import ModalEnrollStudent from "./ModalEnrollStudent"

export default function EnrolledStudents() {
  let { courseName, courseId } = useParams()
  const [loading, setLoading] = useState(true)
  // const [message, setMessage] = useState("")
  const [showModalEnroll, setShowModalEnroll] = useState(false)
  const [offeredCourse, setOfferedCourse] = useState(null)
  const [enrolledStudent, setEnrolledStudents] = useState(null)

  const breadCrumbUrl = [
    {
      url: '../',
      name: 'Faculty course loads',
    },
    {
      name: `Students enrolled`
    }
  ]

  useEffect(() => {
    async function getAllOfferedCourse() {
      try {
        const response = await OfferedCourse.viewAllOfferedCourse()
        setOfferedCourse(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    async function displayEnrolledStudents() {
      try {
        const response = await EnrollmentApi.getEnrolledStudents({ 'courseId': courseId })
        if (response.isSuccess) {
          setEnrolledStudents(response.data)
        }
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    displayEnrolledStudents()
    getAllOfferedCourse()
  }, [courseId, setLoading])

  // Unenroll student
  // async function removeEnrolledStudent(data) {
  //   try {
  //     const response = await EnrollmentApi.deleteEnrolledStudent(data)
  //     if (response.isSuccess) {
  //       setMessage(response.message)
  //       navigate(0)
  //       reset();
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  return (
    <Stack>
      <Stack>
        <BackNav>
          <BreadCrumb data={breadCrumbUrl} />
        </BackNav>
      </Stack>

      <Divider />

      <Stack className="mt-4">
          <DashBoardHeading title={`${courseName} enrolled students`} desc="" />
        <Stack>
          {/* <Stack>
          {message && <Alert severity="success">{message}</Alert>}
          <Button className="flex self-end !my-4" variant="contained" onClick={() => setShowModalEnroll(true)}>Enroll student</Button>
          </Stack> */}

          <Stack>
            {
              loading ? <CircularProgress color="inherit" /> : (
                <DynamicTable>
                  <TableHead>
                    <TableRow className="bg-slate-300">
                      <TableCell className="!w-[10%] !text-[13px] 2xl:text-md !text-black !font-bold ">Id number</TableCell>
                      <TableCell className="!text-[13px] 2xl:text-md !text-black !font-bold">Fullname</TableCell>
                      <TableCell className="!text-[13px] 2xl:text-md !text-black !font-bold">Email</TableCell>
                      <TableCell className="!w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      enrolledStudent !== null && enrolledStudent.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell className="!text-[12px] 2xl:text-[14px] border" align="left">{student.student.idno}</TableCell>
                          <TableCell className="!text-[12px] 2xl:text-[14px] border" align="center">{student.student.fullName}</TableCell>
                          <TableCell className="!text-[12px] 2xl:text-[14px] border" align="center">{student.student.email}</TableCell>
                          <TableCell className="!text-[12px] 2xl:text-[14px] border" align="center">
                            {/* <form action="" onSubmit={handleSubmit(removeEnrolledStudent)}>
                              <input type="text" value={student.id} {...register('id')} hidden />
                              <IconButton type="submit" size="small" aria-label="delete" className="hover:!text-red-500">
                                <Delete fontSize="inherit" />
                              </IconButton>
                            </form> */}
                            <ConfirmDialogCourseLoads studentId={student.id}/>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </DynamicTable>
              )
            }
          </Stack>
        </Stack>
      </Stack>
      {showModalEnroll && <ModalEnrollStudent data={offeredCourse} onDismiss={() => setShowModalEnroll(false)} />}
    </Stack>
  )
}
