import { Button, CircularProgress, Divider, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackNav from "../../reusable/BackNav"
import BreadCrumb from "../../reusable/BreadCrumb"
import DashBoardHeading from "../../reusable/DashBoardHeading"
import DynamicTable from "../../reusable/DynamicTable"
import ModalEnrollStudent from "./ModalEnrollStudent"
import * as OfferedCourse from "../../../network/offeredCourse_api"
import * as EnrollmentApi from "../../../network/courseEnrollment_api"

export default function EnrolledStudents() {
  let { courseName, courseId } = useParams()
  const [loading, setLoading] = useState(true)
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
  return (
    <Stack>
      <Stack>
        <BackNav>
          <BreadCrumb data={breadCrumbUrl} />
        </BackNav>
      </Stack>

      <Divider />

      <Stack className="mt-4">
        <Stack>
          <DashBoardHeading title={`${courseName} enrolled students`} desc="" />

          <Button className="flex self-end !my-4" variant="contained" onClick={() => setShowModalEnroll(true)}>Enroll student</Button>

          <Stack>
            {
              loading ? <CircularProgress color="inherit" /> : (
                <DynamicTable>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Offered course ID</TableCell>
                      <TableCell align="center">Id number</TableCell>
                      <TableCell align="center">Fullname</TableCell>
                      <TableCell align="center">Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      enrolledStudent !== null && enrolledStudent.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{student.offeredCourseId}</TableCell>
                          <TableCell align="center">{student.student.idno}</TableCell>
                          <TableCell align="center">{student.student.fullName}</TableCell>
                          <TableCell align="center">{student.student.email}</TableCell>
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
