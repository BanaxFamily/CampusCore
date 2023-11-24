/* eslint-disable react/prop-types */

import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import { useForm } from "react-hook-form";
import * as UserApi from "../../../network/user_api"
import { useAuth } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditCredentials({ onClose, data }) {
    let { userId } = useAuth()
    const navigate = useNavigate()
    const [error , setError] = useState(false)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    async function onSaveUpdate(data) {
        try {
            const response = await UserApi.updateUserDetails(data)

            if(response.isSuccess){
                navigate(0)
            }
        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    return (
        <Modal
            onDismiss={onClose}
            heading={<DashBoardHeading title="Add offered course" desc="" />}
            width="md:w-[35rem]"
        >
            {error & <Alert severity="error">Something went wrong try again later</Alert>}
            <div className="w-full pb-2">
                <form action="" onSubmit={handleSubmit(onSaveUpdate)}>
                    <Stack className="w-full gap-2">
                        <input type="text" value={userId} name="id" hidden {...register('id')}/>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[20%] !tracking-wider">Phone #</Typography>
                            <TextField
                                variant="standard"
                                className="!text-md w-full px-3 py-2"
                                size="small"
                                defaultValue={data.user.phoneNumber}
                                label={data.user.phoneNumbe ? data.user.phoneNumbe : "phone # is not set yet"}
                                name="phoneNumber"
                                {...register('phoneNumber')}
                            />
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[20%] !tracking-wider">Email</Typography>
                            <TextField
                                variant="standard"
                                className="!text-md w-full px-3 py-2"
                                size="small"
                                defaultValue={data.user.email}
                                name="email"
                                {...register('email')}
                            />
                        </Stack>
                        <Stack className="mt-2">
                            <Button type="submit" disabled={isSubmitting} className="flex self-end " variant="contained" >Save update</Button>
                        </Stack>
                    </Stack>
                </form>
            </div>
        </Modal>
    );
}
