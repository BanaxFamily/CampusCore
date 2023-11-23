/* eslint-disable react-hooks/exhaustive-deps */
import { Delete, Edit, Folder } from "@mui/icons-material";
import { Alert, Button, Divider, IconButton, LinearProgress, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as CourseDeliverable from '../../../network/courseDeliverable_api';
import * as Deliverable from '../../../network/deliverable';
import BackNav from "../../reusable/BackNav";
import BreadCrumb from "../../reusable/BreadCrumb";
import DynamicTable from '../../reusable/DynamicTable';
import AddDeliverable from "./AddDeliverable";
import UpdateDeliverable from "./UpdateDeliverable";


export default function Deliverables() {
    let { courseName, courseId } = useParams()
    const [showDeliverableModal, setShowAddDeliverableModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deliverables, setDeliverables] = useState([])
    const [deliverableToUpdate, setDeliverableToUpdate] = useState([])
    const [loading, setLoading] = useState(true)
    const [deliverableError, setDeliverableError] = useState(false)
    const breadCrumbUrl = [
        {
            url: '../',
            name: 'Manage deliverable templates',
        },
        {
            name: `${courseName} Deliverables`
        }
    ]

    useEffect(() => {
        async function getDeliverableOfCourse() {
            try {
                const response = await CourseDeliverable.getCourseDeliverable({ "id": courseId })
                if (response.isSuccess) {
                    setDeliverables(response.data)
                }
            } catch (error) {
                console.error(error)
                setDeliverableError(true)
            } finally {
                setLoading(false)
            }
        }
        getDeliverableOfCourse()
    }, [])

    async function getDeliverableToUpdate(id) {
        const response = await Deliverable.getOneDeliverable({ 'id':  id})
        setDeliverableToUpdate(response.data)
        console.log(response)
        setShowUpdateModal(true)

    }
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
                {loading && <LinearProgress />}
                {deliverableError && <Alert severity="error">Something went wrong. Please refresh the page</Alert>}
                <DynamicTable>
                    <TableHead>
                        <TableRow className="bg-slate-300">
                            <TableCell className="border !text-black !font-bold"> Deliverable name </TableCell>
                            <TableCell className="border !text-black !font-bold"> Description </TableCell>
                            <TableCell className="border !text-black !font-bold"> Instruction </TableCell>
                            <TableCell className="border !text-black !font-bold" align="center" colSpan={2}> Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading && !deliverableError &&
                            <>
                                {
                                    deliverables.length > 0 ?
                                        <>
                                            {
                                                deliverables.map((data, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell className="border">{data.deliverable.name}</TableCell>
                                                            <TableCell className="border">{data.deliverable.description}</TableCell>
                                                            <TableCell className="border">{data.deliverable.instruction}</TableCell>
                                                            <TableCell className="border !text-center">
                                                                <IconButton
                                                                    type="submit"
                                                                    size="small"
                                                                    onClick={() => {getDeliverableToUpdate(data.deliverableId)}} className="group hover:!bg-green-300">
                                                                    <Edit fontSize="inherit" className="group-hover:!text-black text-green-400" />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell className="border !text-center" >
                                                                <IconButton type="submit" size="small" className="group hover:!bg-red-300">
                                                                    <Delete fontSize="inherit" className="group-hover:!text-black text-red-400" />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </> : <TableCell>There is no deliverables yet</TableCell>
                                }
                            </>
                        }
                    </TableBody>

                </DynamicTable>
            </Stack>

            {showDeliverableModal && <AddDeliverable onDismiss={() => setShowAddDeliverableModal(false)} />}
            {showUpdateModal && <UpdateDeliverable deliverable={deliverableToUpdate} onDismiss={() => setShowUpdateModal(false)} />}
        </>
    )
}
