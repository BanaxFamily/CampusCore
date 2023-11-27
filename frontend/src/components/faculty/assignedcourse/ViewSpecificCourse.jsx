import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { useParams } from 'react-router'
import BackNav from '../../reusable/BackNav'
import BreadCrumb from '../../reusable/BreadCrumb'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import SpecificCourseLinks from './SpecificCourseLinks'
import FacultyAnnouncement from './deliverable/announcement/FacultyAnnouncement'

export default function ViewSpecificCourse() {
    let { courseName } = useParams()
    const breadCrumbUrl = [
        {
            url: '../../',
            name: 'Assigned courses',
        },
        {
            name: `View`
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
                    <Stack direction={'row'}>
                        <Stack className="w-full " direction={'row'}>
                            <FacultyAnnouncement/>
                        </Stack>
                        <Stack className="border-l my-4 w-[30%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
