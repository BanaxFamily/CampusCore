/* eslint-disable react/prop-types */

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import { useAuth } from "../../../utils/AuthContext";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";

export default function ChangePassword({ onClose }) {
    let { userId } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    async function onSaveUpdate(data) {
        try {
            const response = await UserApi.changePassword(data)
            console.log(response)
            console.log(data)

            if (response.isSuccess) {
                navigate(0)
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal
            onDismiss={onClose}
            heading={<DashBoardHeading title="Change password" desc="" />}
            width="md:w-[35rem]"
        >
            <div className="w-full pb-2">
                <form action="" onSubmit={handleSubmit(onSaveUpdate)}>
                    <Stack className="w-full gap-1">
                        <input type="text" value={userId} name="id" hidden {...register('id')} />
                        <Stack direction={'row'} className="items-center gap-2">
                            <Typography className="!text-md w-1/2 !tracking-wider">Current password</Typography>
                            <TextField
                                type="password"
                                variant="standard"
                                className="!text-md w-full py-2"
                                size="small"
                                label="current password"
                                name="password"
                                {...register('password')}
                            />
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-1/2 !tracking-wider">New password</Typography>
                            <TextField
                                type="password"
                                variant="standard"
                                className="!text-md w-full px-3 py-2"
                                size="small"
                                label="new password"
                                name="newPassword"
                                {...register('newPassword')}
                            />
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-1/2 !tracking-wider">Confirm Password</Typography>
                            <TextField
                                type="password"
                                variant="standard"
                                className="!text-md w-full px-3 py-2"
                                size="small"
                                label="confirm password"
                                name="rePassword"
                                {...register('rePassword')}
                            />
                        </Stack>
                        <Stack className="mt-2">
                            <Button type="submit" disabled={isSubmitting} className="flex self-end " variant="contained" >Change password</Button>
                        </Stack>
                    </Stack>
                </form>
            </div>
        </Modal>
    );
}
