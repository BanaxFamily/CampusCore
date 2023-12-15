/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Button, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as GroupApi from "../../../../network/group_api"
import DynamicTable from "../../../reusable/DynamicTable"
import FacultyViewGroupMembers from "./FacultyViewGroupMembers"

export default function FacultyStudentGroupTable() {
    let { offeredCourseId } = useParams()
    const [groups, setGroups] = useState([])
    const [viewMembersModal, setViewMembersModal] = useState("")
    const [groupIdToView, setGroupIdToView] = useState("")
    const [groupNameToView, setGroupNameToView] = useState("")
    const [groupAdiverId, setGroupAdviserId] = useState("")

    useEffect(() => {
        async function showAllGroups() {
            try {
                const response = await GroupApi.getAllGroupsByCourse({ "id": offeredCourseId })
                if (response.isSuccess) {
                    setGroups(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }
        showAllGroups()
    }, [])

    function viewMembers(id, name, adviserId) {
        setViewMembersModal(true)
        setGroupIdToView(id)
        setGroupNameToView(name)
        setGroupAdviserId(adviserId)
    }

    return (
        <Stack className="mx-auto rounded-t-md group px-2">
            <DynamicTable>
                <TableHead>
                    <TableRow className="bg-slate-300">
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Group name </TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Adviser </TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold" align="center"> Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        groups.map((group, index) => (
                            <TableRow key={index}>
                                <TableCell className="!text-[12px] 2xl:text-[14px] border">{group.groupName}</TableCell>
                                <TableCell className="!text-[12px] 2xl:text-[14px] border">{group.adviser}</TableCell>
                                <TableCell className="!text-[12px] 2xl:text-[14px] border" align="center"> <Button onClick={() => viewMembers(group.groupId, group.groupName, group.adviserId)} size="small" className="!text-sm">view </Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </DynamicTable>

            {viewMembersModal && <FacultyViewGroupMembers onDismiss={() => setViewMembersModal(false)} groupId={groupIdToView} adviserId={groupAdiverId} groupName={groupNameToView} />}
        </Stack>
    )
}
