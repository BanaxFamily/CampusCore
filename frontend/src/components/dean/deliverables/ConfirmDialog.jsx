/* eslint-disable react/prop-types */
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import * as CourseDeliverable from '../../../network/courseDeliverable_api'
import * as Deliverable from '../../../network/deliverable'
import { useNavigate } from 'react-router-dom';

export default function ConfirmDialog({ deliverableId, courseDeliverableId }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function removeCourseDeliverable() {
        try {
            const courseDeliverableResponse = await CourseDeliverable.deleteCourseDeliverable({ 'id': courseDeliverableId });
            const deliverableResponse = await Deliverable.deleteDeliverable({ 'id': deliverableId });

            if (courseDeliverableResponse.isSuccess && deliverableResponse.isSuccess) {
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <IconButton type="submit" size="small" onClick={handleClickOpen} className="group hover:!bg-red-300">
                <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure you want to delete this deliverable?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={removeCourseDeliverable}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
