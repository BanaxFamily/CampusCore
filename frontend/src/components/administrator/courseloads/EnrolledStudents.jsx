import { Button, Divider, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackNav from "../../reusable/BackNav"
import BreadCrumb from "../../reusable/BreadCrumb"
import DashBoardHeading from "../../reusable/DashBoardHeading"
import DynamicTable from "../../reusable/DynamicTable"
import ModalEnrollStudent from "./ModalEnrollStudent"
import * as OfferedCourse from "../../../network/offeredCourse_api"

export default function EnrolledStudents() {
  let { courseName } = useParams()
  const [showModalEnroll, setShowModalEnroll] = useState(false)
  const [offeredCourse, setOfferedCourse] = useState(null)
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
    getAllOfferedCourse()
  }, [])

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
            <DynamicTable>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell align="center">Schedule</TableCell>
                  <TableCell align="center">Assigned</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="right">Semester</TableCell>
                  <TableCell align="right">Year</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center" > Enrolled</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </DynamicTable>
          </Stack>
        </Stack>
      </Stack>
      {showModalEnroll && <ModalEnrollStudent data={offeredCourse} onDismiss={() => setShowModalEnroll(false)} />}
    </Stack>
  )
}
