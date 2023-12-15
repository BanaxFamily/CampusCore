import { Button, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import * as GroupApi from "../../../network/group_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import DynamicTable from "../../reusable/DynamicTable";
import { Send } from "@mui/icons-material";
import DeanResearchTeamsConfirmDialog from "./DeanResearchTeamsConfirmDialog";
import DeanTransferAccessModal from "./DeanTransferAccessModal";
// import FacultyViewGroupMembers from "../../faculty/assignedcourse/studentgroups/FacultyViewGroupMembers";

export default function DeanResearchTeams() {
  const [teams, setTeams] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openTransferAccess, setOpenTransferAccess] = useState(false)
  const [id, setId] = useState("")
  const [adviser, setAdviser] = useState("")
  // const [viewMembersModal, setViewMembersModal] = useState("")
  // const [groupIdToView, setGroupIdToView] = useState("")
  // const [groupNameToView, setGroupNameToView] = useState("")
  // const [groupAdiverId, setGroupAdviserId] = useState("")
  useEffect(() => {
    async function getAllResearchTeams() {
      const response = await GroupApi.getResearchTeams()
      console.log(response.data)
      setTeams(response.data)
    }
    getAllResearchTeams()
  }, [])

  // function viewMembers(id, name, adviserId) {
  //   setViewMembersModal(true)
  //   setGroupIdToView(id)
  //   setGroupNameToView(name)
  //   setGroupAdviserId(adviserId)
  // }
  return (
    <Stack>
      <DashBoardHeading title="Manage Research Teams" desc="" />
      <DynamicTable>
        <TableHead>
          <TableRow className="bg-slate-300">
            <TableCell className=" !w-[20%] !text-[13px] 2xl:text-md !text-black border !font-bold !text-left !pl-4" >Group Name</TableCell>
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Transfer</TableCell>
            <TableCell className=" !w-[20%] !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            teams.map((group, index) => (
              <TableRow key={index} className='hover:bg-slate-100'>
                <TableCell className="!text-[12px] 2xl:text-[14px] border !text-left !pl-4">{group.groupName}</TableCell>
                <TableCell className="!text-[12px] 2xl:text-[14px] border">
                  <Button onClick={() => {
                    setOpenTransferAccess(true)
                    setId(group.groupId)
                    setAdviser(group.adviser)
                  }}>Transfer Access <Send fontSize="20" /></Button>
                </TableCell>
                <TableCell className="!text-[12px] 2xl:text-[14px] border ">
                  <Button className="!text-red-400 !font-semibold !text-sm " onClick={() => {
                    setOpenDialog(true)
                    setId(group.groupId)
                  }}>DeActivate</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </DynamicTable >
         <DeanResearchTeamsConfirmDialog open={openDialog} id={id}/>
          {openTransferAccess && <DeanTransferAccessModal onDismiss={() => setOpenTransferAccess(false)} id={id} adviser={adviser}/>}
    </Stack>
  )
}
