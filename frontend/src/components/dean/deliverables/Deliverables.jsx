import { Folder } from "@mui/icons-material";
import { Button, Divider, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackNav from "../../reusable/BackNav";
import BreadCrumb from "../../reusable/BreadCrumb";
import AddDeliverable from "./AddDeliverable";
import DynamicTable from '../../reusable/DynamicTable'

export default function Deliverables() {
    let { courseName } = useParams()
    const [showDeliverableModal, setShowAddDeliverableModal] = useState(false);
    const breadCrumbUrl = [
        {
            url: '../',
            name: 'Manage deliverable templates',
        },
        {
            name: `${courseName} Deliverables`
        }
    ]

    return (
        <>
            <Stack direction={'row'} justifyContent="space-between">
                <BackNav>
                    <BreadCrumb data={breadCrumbUrl} />
                </BackNav>

                <Button className="flex self-end" variant={`${showDeliverableModal ? 'filled' : 'outlined'}`} onClick={() => setShowAddDeliverableModal(!showDeliverableModal)}> Add <Folder /> </Button>
            </Stack>
            <Divider className="py-2" />

            <Stack>
                <DynamicTable>
                    <TableHead>
                        <TableRow >
                            <TableCell> head data to inserted here </TableCell>
                            <TableCell> head data to inserted here </TableCell>
                            <TableCell> head data to inserted here </TableCell>
                            <TableCell> head data to inserted here </TableCell>
                            <TableCell> head data to inserted here </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell> data to inserted here </TableCell>
                            <TableCell> data to inserted here </TableCell>
                            <TableCell> data to inserted here </TableCell>
                            <TableCell> data to inserted here </TableCell>
                            <TableCell> data to inserted here </TableCell>
                        </TableRow>
                    </TableBody>

                </DynamicTable>
            </Stack>

            {showDeliverableModal &&

                <AddDeliverable onDismiss={() => setShowAddDeliverableModal(false)} />
            }
        </>
    )
}
