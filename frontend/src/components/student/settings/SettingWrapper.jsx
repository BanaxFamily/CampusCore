/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as UserApi from "../../../network/user_api";
import { useAuth } from "../../../utils/AuthContext";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import EditCredentials from "./EditCredentials";
import ChangePassword from "./ChangePassword";

export default function SettingWrapper() {
    let { userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [credentials, setCrdentials] = useState([])
    const [modalEditCredential, setModalEditCredentials] = useState(false)
    const [modalChangePassword, setModalChangePassword] = useState(false)

    useEffect(() => {
        async function getUserCredentials() {
            try {
                const response = await UserApi.getUserById({ 'id': userId })
                console.log(response.data)
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
        <Stack className="2xl:w-3/4 2xl:mx-auto">
            <Stack className="mb-4">
                <DashBoardHeading title="User Settings" desc="" />
            </Stack>
            <Stack className="w-full md:w-[70%] lg:w-[60%] border rounded-xl shadow-md mx-auto">

                <div className=" relative">
                    <div className=" h-12" />
                    <div className="bg-mainBlueColor h-12" />
                    <div className="absolute top-4 right-3">
                        {!loading && !error &&
                            <Stack direction={"row"}>
                                <Typography className=" !font-bold text-black tracking-wide pr-2">{credentials.user.fullName}</Typography>
                                <Stack direction={"column"}>
                                    <Avatar alt="john mark" style={{ height: '60px', width: '60px' }} />

                                    <span className="text-white text-xs flex justify-center  ">
                                        Student
                                    </span>
                                </Stack>
                            </Stack>
                        }
                    </div>
                </div>

                <Stack className=" border-2">
                    {loading && <Stack className="absolute top-0 w-full"><LinearProgress /></Stack>}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <Stack className="px-6 gap-1">
                            <Stack className="my-2">
                                <Button onClick={() => setModalEditCredentials(true)} className="flex self-end hover:!text-green-600">Edit details</Button>
                            </Stack>

                            <Stack className="md:!flex-row md:items-center ">
                                <Typography className="!text-[14px] !font-semibold w-[20%] !tracking-wider">Fullname</Typography>
                                <Typography className="border-2 rounded-md !text-[14px] w-full px-3 py-2">{credentials.user.fullName}</Typography>
                            </Stack>
                            <Stack className="md:!flex-row md:items-center ">
                                <Typography className="!text-[14px] !font-semibold w-[20%] !tracking-wider">Username</Typography>
                                <Typography className="border-2 rounded-md !text-[14px] w-full px-3 py-2">{credentials.user.userName}</Typography>
                            </Stack>
                            <Stack className="md:!flex-row md:items-center ">
                                <Typography className="!text-[14px] !font-semibold w-[20%] !tracking-wider">Role</Typography>
                                <Typography className="border-2 rounded-md !text-[14px] w-full px-3 py-2">{credentials.roles[0]}</Typography>
                            </Stack>
                            <Stack className="md:!flex-row md:items-center ">
                                <Typography className="!text-[14px] !font-semibold w-[20%] !tracking-wider">Phone #</Typography>
                                <Typography className={` ${credentials.user.phoneNumber ? "" : "italic !text-sm"} border-2 rounded-md !text-[14px] w-full px-3 py-2`}>{credentials.user.phoneNumber ? credentials.user.phoneNumber : "Not set"}</Typography>
                            </Stack>
                            <Stack className="md:!flex-row md:items-center ">
                                <Typography className="!text-[14px] !font-semibold w-[20%] !tracking-wider">Email</Typography>
                                <Typography className="border-2 rounded-md !text-[14px] w-full px-3 py-2">{credentials.user.email ? credentials.user.email : "Not set"}</Typography>
                            </Stack>

                            <Stack direction={'row'} className=" my-4 self-end">
                                <Button size="small" onClick={() => setModalChangePassword(true)} className="!underline !text-sm">
                                    <Typography className="!text-[10px]  md:!text-sm !text-blue-400">Want to change password? &nbsp;
                                        <span className="text-[11px] md:text-[13px]">Click HERE</span>
                                    </Typography>
                                </Button>
                            </Stack>
                        </Stack>

                    }
                </Stack>
            </Stack>
            {modalEditCredential && <EditCredentials onClose={() => setModalEditCredentials(false)} data={credentials} />}
            {modalChangePassword && <ChangePassword onClose={() => setModalChangePassword(false)} />}
        </Stack >
    )
}
