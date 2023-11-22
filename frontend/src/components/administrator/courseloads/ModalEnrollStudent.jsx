/* eslint-disable react/prop-types */
import { Alert, Checkbox, CircularProgress, List, ListItem, ListItemText, ListSubheader, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as GetRole from '../../../network/getUserRole_api';
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";

export default function ModalEnrollStudent(props) {
    const [students, setStudents] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [selectedName, setSelectedName] = useState([]);

    useEffect(() => {
        async function getStudentRole() {
            try {
                const response = await GetRole.getUserRoles({ "role": "Student" })
                if (response.isSuccess) {
                    setStudents(response.data)
                }

            } catch (error) {
                console.error(error)
            }
        }
        getStudentRole()
    }, [])


    const handleToggle = (value, name) => () => {
        setSelectedStudent(value);
        setSelectedName(name);
    };

    return (
        <Modal
            onDismiss={props.onDismiss}
            width={'md:w-[40rem]'}
            heading={<DashBoardHeading title="Enroll student" desc="" />}
        >
            <Stack>
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography>Course select</Typography>
                    <TextField size="small" margin="dense" />
                </Stack>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2} className="w-full my-2" >
                <Stack className="w-1/2" spacing={2}>
                    <Typography>Course</Typography>
                    <TextField
                        id="filled-role"
                        select
                        label="Select subject"
                        SelectProps={{
                            native: true,
                        }}
                        name="subject"
                        size="small"
                    // {...register("status", { required: "select one option" })}
                    >
                        <option value=""></option>
                        {
                            // Displays all the offered courses
                            props.data ? props.data.map((course, index) => (
                                <option value={course.course.id} selected key={index}>{course.course.name}/</option>
                            )) : <option>No courses offered</option>
                        }
                    </TextField>
                </Stack>
                <Stack className="w-1/2 " spacing={2}>
                    <Typography>Search</Typography>
                    <TextField size="small" label="search" margin="dense" className="w-full flex self-end" />
                </Stack>
            </Stack>

            <Stack className="border rounded-md">
                <List
                    className="w-full"
                    sx={{
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    <ListSubheader className="!text-md !font-semibold">Students</ListSubheader>
                    <Alert severity="info">multi-enrollment not supported yet. Please check one</Alert>
                    {
                        students === null ? (<CircularProgress className="flex justify-center" color="inherit" />) :
                            (
                                <ul>
                                    {students.map((student, index) => (
                                        <ListItem key={`item-${index}`} className="hover:bg-gray-300">
                                            <Checkbox
                                                checked={selectedStudent.indexOf(student.id) !== -1}
                                                onChange={handleToggle(student.id, student.fullName)}
                                            />
                                            <ListItemText primary={`${student.idno} | ${student.lastName}, ${student.firstName}`} />
                                        </ListItem>
                                    ))}
                                </ul>
                            )
                    }
                </List>
            </Stack>
        </ Modal>
    )
}
