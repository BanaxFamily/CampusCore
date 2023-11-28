/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Alert, Button, Checkbox, Collapse, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as CourseEnrollmentApi from "../../../../network/courseEnrollment_api"
import { useParams } from 'react-router-dom';

export default function FacultyAddGroup() {
    let { offeredCourseId } = useParams()
    const [chooseMember, setChooseMember] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [students, setStudents] = useState([])
    const [members, setSelectedMembers] = useState([]);
    const { register, handleSubmit } = useForm()

    const handleCheckboxChange = (member) => {
        if (members.includes(member)) {
            setSelectedMembers(members.filter((m) => m !== member));
        } else {
            setSelectedMembers([...members, member]);
        }
    };

    useEffect(() => {
        async function showEnrolledStudents() {
            try {
                const response = await CourseEnrollmentApi.getEnrolledStudents({ "courseId": offeredCourseId })
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
        showEnrolledStudents()
    }, [])

    async function addStudentGroup(data) {
        let studentGroupData = {
            ...data,
            members
        }
        console.log(studentGroupData)
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
                                                    <FormControlLabel
                                                        key={index}
                                                        control={<Checkbox />}
                                                        label={student.student.fullName}
                                                        onChange={() => handleCheckboxChange(student.student.fullName)}
                                                    />
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
                                <TextField size='small' variant='outlined' label="optional" name='adviserId' InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('adviserId')} />
                            </Stack>
                        </Stack>
                        <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}
