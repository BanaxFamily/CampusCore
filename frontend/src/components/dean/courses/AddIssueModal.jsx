/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import { Send } from "@mui/icons-material";

export default function AddIssueModal(props) {
    return (
        <Modal
            onDismiss={props.onDismiss}
            heading={<DashBoardHeading title="Add issue" desc="" />}
            width="md:w-[35rem]"
        >
            <div className="text-gray-900">

                <Stack direction="row" className="w-full flex items-center ">
                    <Typography variant="h6" >Title&nbsp;:</Typography>
                    <TextField className="w-full !px-4 " variant="standard" value="TITLE OF OPENDED FILE" aria-readonly />
                </Stack>
                <Stack className="mt-2" direction="row" spacing={1}>
                    <Typography variant="p" className="">opended by :</Typography>
                    <Typography variant="p">DEAN USER FULL NAME</Typography>
                </Stack>

                <div className="my-4 border h-32" >
                    APPEND ISSUE HERE
                </div>

                <Stack direction="row" spacing={1} className="w-full flex items-center">
                    <TextField
                        id="comment"
                        label="Comment"
                        placeholder="Issue"
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <Button variant="outlined"><Send className="-rotate-12" /></Button>
                </Stack>
                <Stack direction="row" className="w-full flex justify-end gap-1 mt-8">
                    <p className="text-md text-gray-500">Issue resolved?</p>
                    <Button variant="outlined" size="small" className="!border-paleRed !text-paleRed">Close issue</Button>
                </Stack>
            </div>
        </Modal>
    )
}
