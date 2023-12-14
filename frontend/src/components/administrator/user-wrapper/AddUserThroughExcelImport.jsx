/* eslint-disable react/prop-types */
import { FileUpload } from "@mui/icons-material";
import { Alert, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as UserApi from "../../../network/user_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function AddUserThroughExcelImport({ onDismiss }) {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const { register, handleSubmit } = useForm()

    async function sendFile(file) {
        const formData = new FormData()
        formData.append("ImportFile", file.importFile[0])
        try {
            const response = await UserApi.importUserThroughExcel(formData)
            if(response.isSuccess){
                navigate(0)
            }
            if(!response.ok){
                setError(true)
            }
        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="Select excel file" desc="" />}
            width="!w-[25rem]"
        >
            {error && <Alert>Excel file not send</Alert>}
            <form action="" onSubmit={handleSubmit(sendFile)}>
                <Stack className="gap-4">
                    <Button component="label" size="small" variant="contained" className="!text-sm" startIcon={<FileUpload />} >
                        <input type="file" name="importFile" {...register('importFile', { required: true })} />
                    </Button>

                    <Button type="submit" className="!flex self-end" size="small" variant="contained">Upload</Button>
                </Stack>
            </form>
        </Modal>
    )
}
