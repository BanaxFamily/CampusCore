/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Alert, Button, Checkbox, Collapse, FormControlLabel, Radio, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
// import * as CourseEnrollmentApi from "../../../../network/courseEnrollment_api";
import * as UserRole from "../../../../network/getUserRole_api";
import * as GroupApi from "../../../../network/group_api";


export default function FacultyAddGroup() {
    let { offeredCourseId } = useParams()
    const [chooseMember, setChooseMember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [userRoles, setUserRoles] = useState([]);
    const [students, setStudents] = useState([])
    const [members, setSelectedMembers] = useState([]);
    const [leader, setLeader] = useState("")
    const { register, reset, handleSubmit } = useForm()


    function handleCheckboxChange(member) {
        if (members.includes(member)) {
            setSelectedMembers(members.filter((m) => m !== member));
        } else {
            setSelectedMembers([...members, member]);
        }
    }
    function handleLeaderChange(studentId) {
        setLeader(studentId);
    }

    useEffect(() => {
        async function showEnrolledStudents() {
            try {
                const response = await GroupApi.getNoGroupStudents({ "id": offeredCourseId })
                if (response.isSuccess) {
                    setStudents(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        async function getUserRoles() {
            const response = await UserRole.getUserRoles({ "role": "faculty" })
            setUserRoles(response.data)
        }
        showEnrolledStudents()
        getUserRoles()
    }, [])

    async function addStudentGroup(data) {
        let studentGroupData = {
            ...data,
            members,
            "leaderId": leader,
            "offeredCOurseId": offeredCourseId
        }

        try {
            const response = await GroupApi.createGroup(studentGroupData)
            if(response.isSuccess){
                reset()
                return
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Stack paddingBottom={4} className=" border-3 border-red-400">
            <Stack className="rounded-md">
                <form action="" onSubmit={handleSubmit(addStudentGroup)}>
                    <Stack className='mt-4 px-10 gap-2'>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Group name {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField size='small' variant='outlined' label="Name of the group" name='name' InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')} />
                            </Stack>
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Members {" "} :</Typography>
                            <Stack className='w-full'>
                                <Button onClick={() => setChooseMember(!chooseMember)} size='small' variant='standard'>
                                    Choose member
                                    {chooseMember ? <ExpandLess /> : <ExpandMore />}
                                </Button>
                                <Collapse in={chooseMember}>
                                    {error && <Alert>Something went wrong try again later</Alert>}
                                    {
                                        !error && !loading &&
                                        <Stack className='border max-h-48 px-6 overflow-y-scroll'>
                                            {
                                                students.map((student, index) => (
                                                    <Stack key={index} className='!flex-row'>
                                                        <Stack>
                                                            <FormControlLabel
                                                                control={<Checkbox />}
                                                                label={<Typography className="md:!text-sm">{student.studentName}</Typography>}
                                                                // sx={{ fontSize: '14px' }} // Adjust the font size as needed
                                                                onChange={() => handleCheckboxChange(student.studentId)}
                                                            />
                                                        </Stack>
                                                        <Stack >
                                                            <FormControlLabel
                                                                control={<Radio />}
                                                                label={<Typography className="md:!text-sm">Leader</Typography>}
                                                                checked={leader === student.studentName}
                                                                onChange={() => handleLeaderChange(student.studentId)}
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                ))
                                            }

                                        </Stack>
                                    }
                                </Collapse>
                            </Stack>
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Adviser {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField
                                    select
                                    label="Adviser"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="outlined"
                                    size='small'
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')}
                                    name="adviserId"
                                    {...register("adviserId", { required: "select one option" })}
                                >
                                    <option value=""></option>
                                    {
                                        userRoles.map((role, index) => (
                                            <option value={role.id} key={index}>{role.fullName}</option>
                                        ))
                                    }
                                </TextField>
                                {/* <TextField size='small' variant='outlined' label="optional" name='adviserId' InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('adviserId')} /> */}
                            </Stack>
                        </Stack>
                        <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}
