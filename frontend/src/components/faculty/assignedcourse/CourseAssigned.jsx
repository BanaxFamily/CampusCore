/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import * as OfferedCourse from "../../../network/offeredCourse_api";
import AssignCardCourses from "./AssignCardCourses";
import { useAuth } from "../../../utils/AuthContext";
import DashBoardHeading from "../../reusable/DashBoardHeading";


export default function CourseAssigned() {
    let {userId} = useAuth()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [courseDeliverableError, setCourseDeliverableError] = useState(false)

    useEffect(() => {
        async function getAssignedCourses() {
            try {
                const response = await OfferedCourse.viewAssignedCourse({'id': userId})
                if (response.isSuccess) {
                    setCourses(response.data)
                }
                console.log(response)
            } catch (error) {
                console.error(error)
                setCourseDeliverableError(true)
            }
            finally {
                setLoading(false)
            }
        }
        getAssignedCourses()
    }, [])

    return (

        <>
            <DashBoardHeading title="Assigned course"  desc=""/>
            {loading && <LinearProgress />}
            {courseDeliverableError && <Alert severity="error">Something went wrong try again later.</Alert>}
            {!loading && !courseDeliverableError &&
                <>
                    {
                        courses.length > 0 ? (
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <AssignCardCourses data={courses} />
                            </div>
                        ) : (<Alert severity="info"> You have no courses enrolled</Alert>)
                    }
                </>
            }
        </>
    )
}
