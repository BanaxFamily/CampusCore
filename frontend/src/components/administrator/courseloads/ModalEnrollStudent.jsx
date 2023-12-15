/* eslint-disable react/prop-types */
import { Alert, Button, Checkbox, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as GetRole from '../../../network/getUserRole_api';
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";
import { useNavigate, useParams } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import * as EnrollmentApi from '../../../network/courseEnrollment_api'

export default function ModalEnrollStudent(props) {
    let { courseName, courseId } = useParams()
    const navigate = useNavigate()
    const [students, setStudents] = useState(null)
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]);
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

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

    async function addEnrolled(data) {
        try {
            const dataTobeInserted = {
                "StudentIdArray": [...selectedStudents],
                ...data
            }
            const response = await EnrollmentApi.addEnrollmentStudent(dataTobeInserted)

            if (response.isSuccess) {
                setSuccessMessage(response.message)
                setSelectedStudents([])
                setSelectedNames([])
                reset()
            }

            if (!response.isSuccess) {
                setErrorMessage(response.message)
            }

            setTimeout(() => {
                setSuccessMessage(null)
                setSuccessMessage(null)
            }, 2000)
        } catch (error) {
            console.error(error)
        }
    }

    // const handleToggle = (value, name) => () => {
    //     setSelectedStudent(value);
    //     setSelectedName(name);
    //     setValue("studentId", value || "");
    // };
    const handleToggle = (value, name) => {
        const selectedIndex = selectedStudents.indexOf(value);
        let newSelectedStudents = [...selectedStudents];
        let newSelectedNames = [...selectedNames];

        if (selectedIndex === -1) {
            // Add student to the selected list
            newSelectedStudents = [...selectedStudents, value];
            newSelectedNames = [...selectedNames, name];
        } else {
            // Remove student from the selected list
            newSelectedStudents.splice(selectedIndex, 1);
            newSelectedNames.splice(selectedIndex, 1);
        }

        setSelectedStudents(newSelectedStudents);
        setSelectedNames(newSelectedNames);
    };

    return (
        <Modal
            onDismiss={() => {
                props.onDismiss
                navigate(0)
            }}
            width={'md:w-[40rem]'}
            heading={<DashBoardHeading title="Enroll student" desc="" />}
        >
            <Stack className="relative">
                {successMessage && <Alert className="absolute right-0" severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Stack>
            <Stack spacing={1} className="mb-4">
                {/* Dispaly selected course and student name */}
                <Typography className="text-black">Course: <span className="underline font-semibold">{courseName}</span></Typography>
                <Typography className="text-black">Selected Student: <span className="underline font-semibold">{selectedNames ? selectedStudents : <Person />}</span></Typography>
            </Stack>
            <Divider className="!bg-black" />
            <Stack direction={'row'} spacing={2} className="w-full my-2" >
                <Stack className="w-1/2 " direction={'row'} alignItems={'center'} spacing={2}>
                    <Typography>Search</Typography>
                    <TextField size="small" label="search" margin="dense" className="w-full flex self-end" />
                </Stack>
                <Stack className="w-1/2"><Button variant="outlined" onClick={() => {
                    // Clear the selected name
                    setSelectedStudents([])
                    setSelectedNames([])
                    reset()
                }} className="!border-red-400 !text-red-400 hover:!bg-red-800 flex self-end">Clear</Button></Stack>
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
                                        // <ListItem onClick={() => handleToggle(data)} key={index}>
                                        <ListItem onClick={() => handleToggle(student.id)} key={`item-${index}`} className="hover:bg-gray-300">
                                            <Checkbox
                                                checked={selectedStudents.includes(student.id)}
                                                // checked={student.id === selectedStudents}
                                                // onChange={handleToggle(student.id, student.fullName)}
                                                onChange={() => handleToggle(student.id, student.fullName)}
                                            />
                                            <ListItemText primary={`${student.idno} | ${student.lastName}, ${student.firstName}`} />
                                        </ListItem>
                                    ))}
                                </ul>
                            )
                    }
                </List>
            </Stack>
            {/* Mounting to send the data to API  */}
            <form action="" onSubmit={handleSubmit(addEnrolled)}>
                <Stack>
                    {/* <input type="text" hidden defaultValue={selectedStudents} name="studentId" {...register('studentId')} /> */}
                    <input type="text" hidden defaultValue={courseId} name="offeredCourseId"{...register('offeredCourseId')} />

                    {isSubmitting ? <IconButton size="small"><CircularProgress fontSize="inherit"/></IconButton> : <Button type="submit" variant="contained" className="flex self-end">Enroll Student</Button>}
                </Stack>
            </form>
        </ Modal>
    )
}
