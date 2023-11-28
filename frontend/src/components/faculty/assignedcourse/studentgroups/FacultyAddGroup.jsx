import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Button, Checkbox, Collapse, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function FacultyAddGroup() {
    const [chooseMember, setChooseMember] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState([]);
    const {register} = useForm()

    const handleCheckboxChange = (member) => {
        if (selectedMembers.includes(member)) {
            setSelectedMembers(selectedMembers.filter((m) => m !== member));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    };
    return (
        <Stack paddingBottom={4} className=" border-3 border-red-400">
            <Stack className="rounded-md">
                <form action="">
                    <Stack className='mt-4 px-10 gap-2'>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Group name {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField size='small' variant='outlined' label="Name of the group" name='name' InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')}/>
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
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Member 1"
                                        onChange={() => handleCheckboxChange('Member 1')}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Member 2"
                                        onChange={() => handleCheckboxChange('Member 2')}
                                    />
                                </Collapse>
                            </Stack>
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Adviser {" "} :</Typography>
                            <Stack className='w-full'>
                                <TextField size='small' variant='outlined' label="optional" InputLabelProps={{ style: { fontSize: '0.775rem' } }} />
                            </Stack>
                        </Stack>
                        <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}
