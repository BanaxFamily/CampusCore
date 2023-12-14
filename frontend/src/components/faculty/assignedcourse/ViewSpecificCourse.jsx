import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { useParams } from 'react-router'
import BackNav from '../../reusable/BackNav'
import BreadCrumb from '../../reusable/BreadCrumb'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import SpecificCourseLinks from './SpecificCourseLinks'
import FacultyAnnouncement from './deliverable/announcement/FacultyAnnouncement'
import SpecificCourseLinksMobile from './SpecificCourseLinksMobile'

export default function ViewSpecificCourse() {
    let { courseName } = useParams()
    const breadCrumbUrl = [
        {
            url: '../',
            name: 'Assigned courses',
        },
        {
            name: `${courseName}`
        }
    ]

    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <Stack direction={'row'}>
                <Stack className="w-full">
                    <DashBoardHeading title={`${courseName}`} />
                    <Stack className="md:!hidden border-l mb-2">
                        <SpecificCourseLinksMobile />
                    </Stack>
                    <Stack className=" !flex-col-reverse md:!flex-row">
                        <Stack className="w-full " direction={'row'}>
                            <FacultyAnnouncement />
                        </Stack>
                        <Stack className="!hidden md:!block border-l my-4 lg:w-[35%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
