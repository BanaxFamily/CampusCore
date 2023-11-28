/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Button, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import * as GroupApi from "../../../../network/group_api"
import DynamicTable from "../../../reusable/DynamicTable"
import FacultyViewGroupMembers from "./FacultyViewGroupMembers"

export default function FacultyStudentGroupTable() {
    let { offeredCourseId } = useParams()
    const [groups, setGroups] = useState([])
    const [viewMembersModal, setViewMembersModal] = useState("")
    const [groupIdToView, setGroupIdToView] = useState("")
    const [groupNameToView, setGroupNameToView] = useState("")

    useEffect(() => {
        async function showAllGroups() {
            try {
                const response = await GroupApi.getAllGroupsByCourse({ "id": offeredCourseId })
                if(response.isSuccess){
                    setGroups(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }
        showAllGroups()
    }, [])

    function viewMembers(id, name){
        setViewMembersModal(true)
        setGroupIdToView(id)
        setGroupNameToView(name)
    }

    return (
        <Stack className="mx-auto rounded-t-md group">
            <NavLink to={'add'} className="flex self-end !mr-4 !mt-2 " size="small">Add group</NavLink>
            <DynamicTable>
                <TableHead>
                    <TableRow className="bg-slate-300">
                        <TableCell className="border !text-black !font-bold"> Group name </TableCell>
                        {/* <TableCell className="border !text-black !font-bold"> Leader </TableCell> */}
                        <TableCell className="border !text-black !font-bold"> Adviser </TableCell>
                        <TableCell className="border !text-black !font-bold" align="center"> Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            groups.map((group,index) => (
                                <TableRow key={index}>
                                    <TableCell>{group.groupName}</TableCell>
                                    <TableCell>{group.adviser}</TableCell>
                                    <TableCell align="center"> <Button onClick={() => viewMembers(group.groupId,group.groupName)} size="small" className="!text-sm">view members</Button></TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </DynamicTable>

            {viewMembersModal && <FacultyViewGroupMembers groupId={groupIdToView} groupName={groupNameToView}/>}
        </Stack>
    )
}
