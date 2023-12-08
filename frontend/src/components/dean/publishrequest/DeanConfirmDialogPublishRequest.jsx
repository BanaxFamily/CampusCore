/* eslint-disable react/prop-types */

import { Publish } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import * as RepoApi from "../../../network/publicresearchrepo_api"
import { useAuth } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";


export default function DeanConfirmDialogPublishRequest({ requestId }) {
    const { userId } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function publishStudy() {
        try {
            const response = await RepoApi.approvedResearchFinal({ "requestId": requestId, "approvedBy": userId })
        console.log({"requestId": requestId, "approvedBy": userId})
            if (response.isSuccess) {
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Button type="submit" size="small" onClick={handleClickOpen} className="group hover:!bg-red-300">
                Publish<Publish />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Do you want to publish this submission?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={() => publishStudy()}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
