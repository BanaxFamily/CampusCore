import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { facultyAsideLinks } from "../../../constants";

export default function SpecificCourseLinks() {
    let { offeredCourseId} = useParams()
    const location = useLocation()
    return (
        <Stack className="rounded-sm h-72">
            <Stack className="gap-2 px-2 pt-4">
                {
                    facultyAsideLinks.map((nav, index) => (
                        <Stack key={index}>
                            <NavLink to={`/course/assigned/offered-course/RESCOM31/${offeredCourseId}${nav.link}`} className={` flex flex-row gap-6 w-full text-[14px] items-center md:gap-6 hover:text-paleRed !text-slate-600`}>
                                <Button size="small" variant={location.pathname.startsWith(`/course/assigned/offered-course/RESCOM31/${offeredCourseId}${nav.link}`) ? 'contained':'outlined'} className="!flex !justify-start w-full">
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
