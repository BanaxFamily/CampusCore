/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as CourseDeliverable from '../../../../network/courseDeliverable_api';
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import ListOfDeliverables from "./ListOfDeliverables";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DeliverableWrapper() {
  let { courseName, courseId } = useParams()
  const [deliverable, setDeliverables] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const breadCrumbUrl = [
    {
      url: '../',
      name: 'List of offered courses',
    },
    {
      name: `Submissions`
    }
  ]

  useEffect(() => {
    async function showListOfDeliverables() {
      try {
        const response = await CourseDeliverable.getCourseDeliverable({ 'id': courseId })
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
      <DashBoardHeading title={`Deliverables for ${courseName}`} />
      {loading && <LinearProgress />}
      {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
      <Stack className="!flex-row">
        <Stack paddingY={4} className="!px-10 w-full">
          {
            !loading && !error &&
            <>
              <Stack className="w-full rounded-md py-10">

                {
                  deliverable.length > 0 ? (
                    <ListOfDeliverables data={deliverable} />
                  ) : (<Alert severity="error">Something went wrong. Try again later</Alert>)
                }
              </Stack>
            </>
          }
        </Stack>
        <Stack className="border-l-2 p-2">
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
