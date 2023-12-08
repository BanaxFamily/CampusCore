/* eslint-disable react/prop-types */

import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import FacultyApprovalPasswordConfirmation from "./FacultyApprovalPasswordConfirmation";


export default function FacultyApprovalDialog() {
    // const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <Button type="submit" size="small" onClick={handleClickOpen}>
                {/* <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" /> */}
                <Typography className="!text-md underline hover:!text-blue-300">Approval</Typography>
            </Button>
            <Dialog
                open={open}
            // onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure you want to delete this deliverable?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus >
                        Cancel
                    </Button>
                    {/* onClick={removeCourseDeliverable} */}
                    <Button variant='contained' onClick={() => {
                        setOpenModal(true)
                        setOpen(false)
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>

            {openModal && <FacultyApprovalPasswordConfirmation onDismiss={() => setOpenModal(false)}/>}
        </>
    )
}
