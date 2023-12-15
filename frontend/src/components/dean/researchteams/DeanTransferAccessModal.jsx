/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import { useEffect, useState } from "react";
import * as UserRole from "../../../network/getUserRole_api"
import { useForm } from "react-hook-form";
import * as GroupApi from "../../../network/group_api"
import { useNavigate } from "react-router-dom";
export default function DeanTransferAccessModal({ id, adviser, onDismiss }) {
    const navigate = useNavigate()
    const [userRoles, setUserRoles] = useState([])
    const { register, handleSubmit } = useForm()
    useEffect(() => {
        async function getUserRoles() {
            const response = await UserRole.getUserRoles({ "role": "faculty" })
            setUserRoles((response.data.filter(user => user.fullName !== adviser)))
        }
        getUserRoles()
    }, [])

    async function transferAccess(data) {
        let dataToSend = {
            "groupId": id,
            ...data
        }
        const response = await GroupApi.transferAccess(dataToSend)
        if(response.isSuccess){
            navigate(0)
        }
    }
    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="Transfer access" desc="" />}
            width="!w-[33rem]"
        >
            <Stack className="!flex-row justify-between">
                <Stack className=" gap-2">
                    <Typography> Current Adviser: </Typography>
                    <TextField size="small" value={adviser} className="w-[200px]" />
                </Stack>
                <Stack className=" gap-2 ">
                    <form action="" onSubmit={handleSubmit(transferAccess)}>
                        <Typography> New Adviser: </Typography>
                        {/* <TextField select size="small" defaultValue={adviser} className="w-[200px] " name="adviserId" {...register("adviserId", { required: "select one option" })}> */}
                        <TextField
                            id="filled-role"
                            select
                            label="Faculty"
                            SelectProps={{
                                native: true,
                            }}
                            size="small"
                            InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                            name="adviserId"
                            className="w-[200px] "
                            {...register("adviserId", { required: "select one option" })}
                        >
                            <option value=""></option>
                            {
                                userRoles.map((role, index) => (
                                    <option value={role.id} key={index}>{role.fullName } </option>
                                ))
                            }
                        </TextField>
                        <Stack className="mt-4">
                            <Button className="!flex self-end " type="submit" variant="contained">Transfer</Button>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </Modal>
    )
}
