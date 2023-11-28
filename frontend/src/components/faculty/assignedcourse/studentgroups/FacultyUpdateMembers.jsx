/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Alert, Button, Checkbox, Collapse, FormControlLabel, Radio, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
// import * as UserRole from "../../../../network/getUserRole_api";
import * as GroupApi from "../../../../network/group_api";

export default function FacultyUpdateMembers() {
    let { offeredCourseId, groupName, groupId } = useParams();
    const [chooseMember, setChooseMember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [userRoles, setUserRoles] = useState([]);
    const [students, setStudents] = useState([]);
    const [members, setSelectedMembers] = useState([]);
    const [leader, setLeader] = useState("");
    const { reset, handleSubmit } = useForm();

    function handleCheckboxChange(studentId) {
        setSelectedMembers((prevMembers) => {
            if (prevMembers.includes(studentId)) {
                return prevMembers.filter((m) => m !== studentId);
            } else {
                return [...prevMembers, studentId];
            }
        });
    }

    useEffect(() => {
        async function getStudentsFromUpdateApi() {
            try {
                const response = await GroupApi.getAllStudentsFromUpdateApi({ "groupId": groupId, "offeredCourseId": offeredCourseId });
                if (response.isSuccess) {
                    // Set the default checked state based on the API response
                    const defaultMembers = response.data.filter((student) => student.isMember).map((student) => student.studentId);
                    const defaultLeader = response.data.find((student) => student.isLeader)?.studentId || "";
                    setLeader(defaultLeader);
                    setSelectedMembers(defaultMembers);
                    console.log(response.data)
                    setStudents(response.data);
                    return;
                }
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        // async function getUserRoles() {
        //     const response = await UserRole.getUserRoles({ "role": "faculty" });
        //     setUserRoles(response.data);
        // }

        getStudentsFromUpdateApi();
        // getUserRoles();

    }, []);

    async function updateGroupMembers() {
        let studentGroupData = {
            members,
            "groupId": groupId,
            "leaderId": leader,
        };
        try {
            const response = await GroupApi.updateMembers(studentGroupData);
            if (response.isSuccess) {
                reset();
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Stack paddingBottom={4} className=" border-3 border-red-400">
            <Stack className="rounded-md">
                <form action="" onSubmit={handleSubmit(updateGroupMembers)}>
                    <Stack className='mt-4 px-10 gap-2'>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Group name {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField size='small' variant='outlined' value={groupName} label="Name of the group" name='name' InputLabelProps={{ style: { fontSize: '0.775rem' } }}  />
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
                                    {error && <Alert>Something went wrong, try again later</Alert>}
                                    {!error && !loading &&
                                        <Stack className='border max-h-48 px-6 overflow-y-scroll'>
                                            {
                                                students.map((student, index) => (
                                                    <Stack key={index} className='!flex-row'>
                                                        <Stack className=' w-[40%]'>
                                                            <FormControlLabel
                                                                control={<Checkbox checked={members.includes(student.studentId)} onChange={() => handleCheckboxChange(student.studentId)} />}
                                                                label={<Typography className="md:!text-sm">{student.studentName}</Typography>}
                                                            />
                                                        </Stack>
                                                        <Stack className='w-1/2'>
                                                            <FormControlLabel
                                                                control={<Radio checked={leader === student.studentId} onChange={() => setLeader(student.studentId)} />}
                                                                label={<Typography className="md:!text-sm">Leader</Typography>}
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
                        {/* <Stack className='!flex-row items-center'>
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
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
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
                            </Stack>
                        </Stack> */}
                        <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}
