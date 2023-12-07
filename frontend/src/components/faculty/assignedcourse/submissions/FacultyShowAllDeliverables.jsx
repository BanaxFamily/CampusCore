/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, LinearProgress, Stack } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as OfferedCourseDeliverable from '../../../../network/offeredCourseDeliverable_api';
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import FacultyListOfDeliverables from "./FacultyListOfDeliverables";
// import { useAuth } from "../../../../utils/AuthContext";

export default function FacultyShowAllDeliverables() {
  // let {userId} = useAuth()
  let { courseName, offeredCourseId } = useParams()
  const [deliverable, setDeliverables] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const breadCrumbUrl = [
    {
      url: '../../',
      name: 'Assigned courses',
    },
    {
      url: '../',
      name: courseName
    }, {
      name: 'Deliverables'
    }
  ]

  useEffect(() => {
    async function showListOfDeliverables() {
      try {
        const response = await OfferedCourseDeliverable.getFacultyOfferedCourseDeliverables({ 'id': offeredCourseId })
        if (response.isSuccess) {
          setDeliverables(response.data)
          return
        }

      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    showListOfDeliverables()
  }, [])

  return (
    <Stack>
      <BackNav>
        <BreadCrumb data={breadCrumbUrl} />
      </BackNav>
      <Stack className="my-4">
        <Divider className="!bg-black" />
      </Stack>
      <DashBoardHeading title={`Deliverables Submissions ${courseName}`} />
      {loading && <LinearProgress />}
      {error && <Alert severity="error">Something went wrong. Try again later</Alert>}


      <Stack className="!flex-row">
        <Stack paddingY={4} className="md:!px-10 w-full gap-4">
          <Divider />
          {
            !loading && !error &&
            <>
              <Stack className="w-full rounded-md">

                {
                  deliverable.length > 0 ? (
                    <FacultyListOfDeliverables data={deliverable} />
                  ) : (<Alert severity="info">No deliverables yet</Alert>)
                }
              </Stack>
            </>
          }
        </Stack>
        <Stack className="!hidden md:!block border-l-2 p-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem label="Deadlines">
                <DateCalendar defaultValue={dayjs('2022-04-17')} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      </Stack>
    </Stack>
  )
}
