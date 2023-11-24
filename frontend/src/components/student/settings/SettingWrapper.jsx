import { Alert, Avatar, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as UserApi from "../../../network/user_api";
import { useAuth } from "../../../utils/AuthContext";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import EditCredentials from "./EditCredentials";

export default function SettingWrapper() {
    let { userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [credentials, setCrdentials] = useState([])
    const [modalEditCredential, setModalEditCredentials] = useState(false)

    useEffect(() => {
        async function getUserCredentials() {
            try {
                const response = await UserApi.getUserById({ 'id': userId })
                console.log(response)
                if (response.isSuccess) {
                    setCrdentials(response.data)
                }
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getUserCredentials()
    }, [])
    return (
        <div className="border">
            <Stack className="mb-4">
                <DashBoardHeading title="User Settings" desc="" />
            </Stack>
            <div className=" relative">
                <div className=" h-12" />
                <div className="bg-mainBlueColor h-12" />
                <div className="absolute top-4 right-3">

                    <Stack direction={"row"}>
                        <Typography className="  font-semibold tracking-wide pr-2">John Mark Abad</Typography>
                        <Stack direction={"column"}>
                            <Avatar alt="john mark" style={{ height: '60px', width: '60px' }} />

                            <span className="text-white text-xs flex justify-center  ">
                                Student
                            </span>
                        </Stack>
                    </Stack>
                </div>
            </div>

            <Stack className="border-2">
                {loading && <Stack className="absolute top-0 w-full"><LinearProgress /></Stack>}
                {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                {
                    !loading && !error &&
                    <Stack className="px-6 gap-1">
                        <Stack className="my-2">
                            <Button onClick={() => setModalEditCredentials(true)} className="flex self-end hover:!text-green-600">Edit details</Button>
                        </Stack>

                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[10%] !tracking-wider">Fullname</Typography>
                            <Typography className="border-2 rounded-md !text-md w-full px-3 py-2">{credentials.user.fullName}</Typography>
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[10%] !tracking-wider">Username</Typography>
                            <Typography className="border-2 rounded-md !text-md w-full px-3 py-2">{credentials.user.userName}</Typography>
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[10%] !tracking-wider">Role</Typography>
                            <Typography className="border-2 rounded-md !text-md w-full px-3 py-2">{credentials.user.userName}</Typography>
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[10%] !tracking-wider">Phone #</Typography>
                            <Typography className={` ${credentials.user.phoneNumber ? "" : "italic !text-sm"} border-2 rounded-md !text-md w-full px-3 py-2`}>{credentials.user.phoneNumber ? credentials.user.phoneNumber : "Not set"}</Typography>
                        </Stack>
                        <Stack direction={'row'} className="items-center gap-4">
                            <Typography className="!text-md w-[10%] !tracking-wider">Email</Typography>
                            <Typography className="border-2 rounded-md !text-md w-full px-3 py-2">{credentials.user.email ? credentials.user.email : "Not set"}</Typography>
                        </Stack>
                    </Stack>
                }
                <Stack direction={'row'} className="pr-20 my-4 self-end">
                    <Button size="small" className="!underline !text-sm">
                        <Typography className="!text-sm !text-blue-400">Want to change password? &nbsp;
                            <span className="text-[13px]">Click HERE</span>
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
            {modalEditCredential && <EditCredentials onClose={() => setModalEditCredentials(false)} data={credentials} />}
        </div >
    )
}
