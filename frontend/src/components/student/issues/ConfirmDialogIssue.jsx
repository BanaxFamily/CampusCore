/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as IssueApi from "../../../network/issue_api";

export default function ConfirmDialogIssue({ issueId }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function closeIssue() {
        const response = await IssueApi.closeIssue({ "issueId": issueId })
        console.log(response)
        navigate(0)
    }


    return (
        <>
            <Button type="submit" variant="standard" size="small" onClick={handleClickOpen} className="!rounded-none !bg-transparent">
                <Typography className="!text-sm !font-bold !text-red-600 hover:!text-red-400"> Close issue </Typography>
                {/* <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" /> */}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure you want to close this issue?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    {issueId && <Button variant='contained' onClick={closeIssue}>Yes</Button>}
                </DialogActions>
            </Dialog>
        </>
    )
}
