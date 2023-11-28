/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import StarIcon from '@mui/icons-material/Star';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as GroupApi from "../../../../network/group_api";
import Modal from '../../../administrator/Modal';
import DashBoardHeading from '../../../reusable/DashBoardHeading';


export default function FacultyViewGroupMembers({ onDismiss, groupId, groupName }) {
    const [groupMembers, setGroupMembers] = useState([])

    useEffect(() => {
        console.log(groupId)
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
                    <Typography variant='h6'>{groupName} Group Members:</Typography>
                    <Button variant='outlined'> Edit Members</Button>
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
                                        <ListItemText primary={member.studentName} />
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
