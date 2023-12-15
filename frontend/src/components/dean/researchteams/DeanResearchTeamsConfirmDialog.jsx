/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as GroupApi from "../../../network/group_api";

export default function DeanResearchTeamsConfirmDialog({open, id}) {

    async function updateGroupStatus(){
        let data = {
            "id": id,
            "status": "inactive"
        }
        const response = await GroupApi.updateStatus(data)
        console.log(response)
    }
    return (
        <>
            <Dialog
                open={open}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure you want to deactivate this group?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus >
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={updateGroupStatus}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
