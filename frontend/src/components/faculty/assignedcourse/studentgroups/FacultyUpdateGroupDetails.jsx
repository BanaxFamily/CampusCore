/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as UserRole from "../../../../network/getUserRole_api";
import * as GroupApi from "../../../../network/group_api";

export default function FacultyUpdateGroupMembers() {
    const navigate = useNavigate()
    let { groupName, groupId, groupAdviserId } = useParams();
    const [userRoles, setUserRoles] = useState([]);
    const [groupAdviserIdDefault, setGroupAdviserIdDefault] = useState(groupAdviserId);
    const { register, handleSubmit } = useForm();


    useEffect(() => {
        async function getUserRoles() {
            const response = await UserRole.getUserRoles({ "role": "faculty" });
            setUserRoles(response.data);
        }

        getUserRoles();

    }, []);

    async function updateGroupMembers(data) {
        let studentGroupData = {
            "groupId": groupId,
            ...data
        };
        try {
            const response = await GroupApi.updateDetails(studentGroupData);
            if (response.isSuccess) {
                navigate('../')
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
                                <TextField size='small' variant='outlined' defaultValue={groupName} label="Name of the group" name='name' InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')}/>
                            </Stack>
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Adviser {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField
                                    id="filled-role"
                                    select
                                    label="Group adviser"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={groupAdviserIdDefault}
                                    onInput={(event) => setGroupAdviserIdDefault(event.target.value)}
                                    variant="outlined"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    name="adviserId"
                                    size='small'
                                    {...register("adviserId", { required: "select one option" })}
                                >
                                    <option value=""></option>
                                    {
                                        userRoles.map((role, index) => {
                                            return (
                                                <option value={role.id} key={index}>{role.fullName}</option>
                                            )
                                        })
                                    }
                                </TextField>
                            </Stack>
                        </Stack>
                        <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}
