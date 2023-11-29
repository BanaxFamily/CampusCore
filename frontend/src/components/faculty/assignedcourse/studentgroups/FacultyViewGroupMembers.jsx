/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import StarIcon from '@mui/icons-material/Star';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as GroupApi from "../../../../network/group_api";
import Modal from '../../../administrator/Modal';
import DashBoardHeading from '../../../reusable/DashBoardHeading';


export default function FacultyViewGroupMembers({ onDismiss, groupId, groupName,adviserId }) {
    const [groupMembers, setGroupMembers] = useState([])

    useEffect(() => {
        async function viewAllMembers() {
            const response = await GroupApi.viewGroupMembers({ "id": groupId })
            try {
                if (response.isSuccess) {
                    setGroupMembers(response.data.members)
                    console.log(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }
        viewAllMembers()
    }, [])


    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="set deadline" desc="" />}
            width="md:w-[35rem]"
        >
            <Stack>
                <Stack className='!flex-row justify-between mb-2'>
                    <Typography variant='h6'><span className='font-bold'>{groupName}</span> Group Members:</Typography>
                    <Stack className='!flex-row gap-2'>
                        <NavLink to={`update/members/${groupName}/${groupId}`} className="underline text-blue-600 rounded-md px-2 font-bold tracking-wider !text-[12px] flex items-center hover:text-blue-900"> Edit Members</NavLink>
                        <NavLink to={`update/group-details/${groupName}/${groupId}/${adviserId}`} className="underline text-blue-600 rounded-md px-2 font-bold tracking-wider !text-[12px] flex items-center hover:text-blue-900"> Edit Group</NavLink>
                    </Stack>
                </Stack>
                <Stack className='shadow-lg shadow-gray-300 border rounded-md'>

                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-label="contacts"
                    >
                        {
                            groupMembers.map((member, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {member.isLeader ? <StarIcon className='!text-yellow-300' /> : ""}
                                        </ListItemIcon>
                                        <ListItemText primary={<Typography className='!text-[14px]'>{member.studentName}</Typography>} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Stack>

            </Stack>
        </Modal>
    )
}
