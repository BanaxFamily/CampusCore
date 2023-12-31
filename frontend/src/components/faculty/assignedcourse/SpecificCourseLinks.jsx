import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { facultyAsideLinks } from "../../../constants";

export default function SpecificCourseLinks() {
    let { courseName, offeredCourseId, hasRetainableGroup} = useParams()
    const location = useLocation()
    return (
        <Stack className=" rounded-sm md:h-72">
            <Stack className="gap-2 px-2 md:pt-4">
                {
                    facultyAsideLinks.map((nav, index) => (
                        <Stack key={index}>
                            <NavLink to={`/course/assigned/offered-course/${courseName}/${offeredCourseId}/${hasRetainableGroup}${nav.link}`} className={` flex flex-row gap-6 w-full text-[14px] items-center md:gap-6 hover:text-paleRed !text-slate-600`}>
                                <Button size="small" variant={location.pathname.startsWith(`/course/assigned/offered-course/${courseName}/${offeredCourseId}${nav.link}`) ? 'contained':'outlined'} className="!flex !justify-start md:!text-sm lg:!text-[14px] w-full">
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
