/* eslint-disable react/prop-types */
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import * as OfferedCourse from "../../../network/offeredCourse_api";
import { useNavigate } from 'react-router-dom';
import * as EnrollmentApi from "../../../network/courseEnrollment_api"

export default function ConfirmDialogCourseLoads({ courseId, studentId }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deleteCourseOff() {
        const response = await OfferedCourse.deleteOfferedCourse({ "id": courseId })
        console.log(response)
        navigate(0)
    }

    async function removeEnrolledStudent() {
        try {
            const response = await EnrollmentApi.deleteEnrolledStudent({"id": studentId})
            if (response.isSuccess) {
                // setMessage(response.message)
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
                    Are you sure you want to delete this course?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    {courseId && <Button variant='contained' onClick={deleteCourseOff}>Yes</Button>}
                    {studentId && <Button variant='contained' onClick={removeEnrolledStudent}>Yes</Button>}
                </DialogActions>
            </Dialog>
        </>
    )
}
