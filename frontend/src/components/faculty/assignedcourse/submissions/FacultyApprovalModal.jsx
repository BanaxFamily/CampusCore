/* eslint-disable react/prop-types */
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import Modal from "../../../administrator/Modal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";

export default function FacultyApprovalModal(props) {
    const [approvalValue, setApprovalValue] = useState("")
    return (
        <Modal
            onDismiss={props.onDismiss}
            heading={<DashBoardHeading title="Approval" desc="" />}
            width="md:w-[20rem]"
        >
            <Stack className="gap-2">

                <TextField
                    select
                    className='w-full'
                    label="Approve Submission ?"
                    value={approvalValue}
                    onChange={(e) => setApprovalValue(e.target.value)}
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </TextField>

                <TextField
                    select
                    className='w-full'
                    label="Attached Digital Signature ?"
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </TextField>
            </Stack>
        </Modal>
    )
}
