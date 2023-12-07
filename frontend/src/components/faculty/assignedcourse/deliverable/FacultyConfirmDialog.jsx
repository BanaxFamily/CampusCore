/* eslint-disable react/prop-types */

import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";


export default function FacultyConfirmDialog() {
    // const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <IconButton type="submit" size="small" onClick={handleClickOpen} className="group hover:!bg-red-300">
                <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" />
            </IconButton>
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
                    <Button variant='contained' >Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
