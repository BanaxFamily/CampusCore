import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { facultyAsideLinks } from "../../../constants";

export default function SpecificCourseLinksMobile() {
    let { courseName, offeredCourseId} = useParams()
    const location = useLocation()
    return (
        <Stack className="md:!hidden rounded-sm w-full">
            <Stack className="gap-2 px-2 pt-4 sm:!flex-row">
                {
                    facultyAsideLinks.map((nav, index) => (
                        <Stack key={index}>
                            <NavLink to={`/course/assigned/offered-course/${courseName}/${offeredCourseId}${nav.link}`} className={` flex flex-row gap-6 w-full text-[14px] items-center md:gap-6 hover:text-paleRed !text-slate-600`}>
                                <Button size="small" variant={location.pathname.startsWith(`/course/assigned/offered-course/${courseName}/${offeredCourseId}${nav.link}`) ? 'contained':'outlined'} className="!flex !justify-start md:!text-[8px] w-full">
                                    {nav.title}
                                </Button>
                            </NavLink>
                        </Stack>
                    ))
                }
            </Stack>
        </Stack>
    )
}
