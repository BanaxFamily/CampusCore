/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, LinearProgress } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import * as OfferedCourseDeliverable from "../../../../network/offeredCourseDeliverable_api"
import FacultyShowDeliverables from "./FacultyShowDeliverables"

export default function FacultyGetDeliverables() {
  let { offeredCourseId } = useParams()
  const [deliverable, setDeliverables] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)


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
    <>
      {loading && <LinearProgress />}
      {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
      <Stack paddingY={4}>
        {
          !loading && !error &&
          <>
            <Stack className="w-full rounded-md">

              {
                deliverable.length > 0 ? (
                  <FacultyShowDeliverables data={deliverable} />
                ) : (<Alert severity="info">No deliverables made yet</Alert>)
              }
            </Stack>
          </>
        }
      </Stack>
    </>
  )
}
