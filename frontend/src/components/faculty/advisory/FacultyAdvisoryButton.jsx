/* eslint-disable react/prop-types */

import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import FacultyApprovalPasswordConfirmation from "../assignedcourse/submissions/FacultyApprovalPasswordConfirmation";

export default function FacultyAdvisoryButton({issues}) {
    // const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <Button type="submit" size="small" variant="contained" onClick={handleClickOpen}>
                {/* <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" /> */}
                <Typography className="!text-md hover:!text-blue-300">Approved</Typography>
            </Button>
            <Dialog
                open={open}
            // onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <Typography className="!text-lg">{issues.length > 0 ? "Resolved issues before approving!":"Do you want to proceed ?"}</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button size="small" autoFocus onClick={() => setOpen(false)} >
                    {issues.length > 0 ? "Okay":"Cancel"}
                    </Button>
                    {/* onClick={removeCourseDeliverable} */}
                    {issues.length < 1 && <Button size="small" variant='contained' onClick={() => {
                        setOpenModal(true)
                        setOpen(false)
                    }}>Yes</Button>}
                </DialogActions>
            </Dialog>

            {openModal && <FacultyApprovalPasswordConfirmation onDismiss={() => setOpenModal(false)}/>}
        </>
    )
}
