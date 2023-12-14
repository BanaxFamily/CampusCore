/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import sampleExcel from "../../../assets/tooltip.png"
import { FileUpload } from "@mui/icons-material";

export default function AddUserThroughExcelConfirmation() {
    const [showAddUserThroughExcel, setShowAddUserThroughExcel] = useState(false);

    function handleClickOpen() {
        setShowAddUserThroughExcel(!showAddUserThroughExcel)
    }

    return (
        <>
            <Button
                type="submit"
                variant="text"
                size="small"
                onClick={handleClickOpen}
                className="mr-2 text-[15px] font-semibold !normal-case hover:text-black"
            >
                Import users
            </Button>
            <Dialog
                open={showAddUserThroughExcel}
            // onClose={handleClose}
            >
                <DialogTitle >
                    <Typography fontSize={'small'}>Note: Please upload an excel file in this format. Before uploading please see&nbsp;
                        <Tooltip title={
                            <Stack>
                                <p>To streamline importing process, there are certain guidelines that should be followed.</p>
                                <br />
                                <p>username and password - imported users will have a default username and password</p>
                                <br />
                                <p>{`username = ucccs-<id number>`}</p>
                                <p>{`password = '<Last Name><last 4 digit of id number>!`}</p>
                                <br />
                                <p>example:</p>
                                <p>username = ccs-18776914</p>
                                <p>password = Moncada6914!</p>
                                <br />
                                <p>role - roles inputted in the last column should exactly be among these choices only. </p>
                                <p>&quot;Admin&quot;, &quot;Dean&quot;, &quot;Faculty&quot;, &quot;PRC&quot;, &quot;Student&quot;</p>
                            </Stack>
                        } arrow className="cursor-help">
                            <span className="font-bold underline underline-offset-4 text-red-500">guidelines</span>
                            <br />
                        </Tooltip>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack className="items-center mt-2">
                        <img src={sampleExcel} className="w-[450px]" alt="Excel" />
                    </Stack>
                </DialogContent>
                <DialogActions className="gap-4">
                    <Button component="label" size="small" className="!text-sm !pr-0" startIcon={<FileUpload />} >
                        <input type="file" hidden />
                        Upload file
                    </Button>
                    <Button onClick={handleClickOpen} variant="contained" size="small" className="!text-sm" autoFocus >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
