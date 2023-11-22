import { Alert, Button, CircularProgress, Divider, IconButton, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackNav from "../../reusable/BackNav"
import BreadCrumb from "../../reusable/BreadCrumb"
import DashBoardHeading from "../../reusable/DashBoardHeading"
import DynamicTable from "../../reusable/DynamicTable"
import ModalEnrollStudent from "./ModalEnrollStudent"
import * as OfferedCourse from "../../../network/offeredCourse_api"
import * as EnrollmentApi from "../../../network/courseEnrollment_api"
import { Delete } from "@mui/icons-material"
import { useForm } from "react-hook-form"

export default function EnrolledStudents() {
  let { courseName, courseId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [showModalEnroll, setShowModalEnroll] = useState(false)
  const [offeredCourse, setOfferedCourse] = useState(null)
  const [enrolledStudent, setEnrolledStudents] = useState(null)
  const { register, reset, handleSubmit } = useForm()

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
  async function removeEnrolledStudent(data) {
    try {
      const response = await EnrollmentApi.deleteEnrolledStudent(data)
      if (response.isSuccess) {
        setMessage(response.message)
        navigate(0)
        reset();
      }
    } catch (error) {
      console.error(error)
    }
  }
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
          <Stack>
          {message && <Alert severity="success">{message}</Alert>}
          <Button className="flex self-end !my-4" variant="contained" onClick={() => setShowModalEnroll(true)}>Enroll student</Button>
          </Stack>

          <Stack>
            {
              loading ? <CircularProgress color="inherit" /> : (
                <DynamicTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id number</TableCell>
                      <TableCell align="center">Fullname</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      enrolledStudent !== null && enrolledStudent.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.student.idno}</TableCell>
                          <TableCell align="center">{student.student.fullName}</TableCell>
                          <TableCell align="center">{student.student.email}</TableCell>
                          <TableCell align="center">
                            <form action="" onSubmit={handleSubmit(removeEnrolledStudent)}>
                              <input type="text" value={student.id} {...register('id')} hidden />
                              <IconButton type="submit" size="small" aria-label="delete" className="hover:!text-red-500">
                                <Delete fontSize="inherit" />
                              </IconButton>
                            </form>
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
