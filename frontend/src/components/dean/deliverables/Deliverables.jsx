/* eslint-disable react-hooks/exhaustive-deps */
import { Edit, Folder, RemoveRedEyeTwoTone } from "@mui/icons-material";
import { Alert, Button, Divider, IconButton, LinearProgress, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as CourseDeliverable from '../../../network/courseDeliverable_api';
import * as Deliverable from '../../../network/deliverable';
import BackNav from "../../reusable/BackNav";
import BreadCrumb from "../../reusable/BreadCrumb";
import DynamicTable from '../../reusable/DynamicTable';
import AddDeliverable from "./AddDeliverable";
import ConfirmDialog from "./ConfirmDialog";
import UpdateDeliverable from "./UpdateDeliverable";
import DeanViewDeliverableDetails from "./DeanViewDeliverableDetails";


export default function Deliverables() {
    let { courseName, courseId } = useParams()
    const [showDeliverableModal, setShowAddDeliverableModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [viewDeliverableDetail, setViewDeliverableDetail] = useState(false);
    const [deliverables, setDeliverables] = useState([])
    const [deliverableToUpdate, setDeliverableToUpdate] = useState([])
    const [oneDeliverable, setOneDeliverable] = useState([])
    const [loading, setLoading] = useState(true)
    // const [open, setOpen] = useState(true)
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
        const response = await Deliverable.getOneDeliverable({ 'id': id })
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
                            <TableCell className="w-[5%] !text-[13px] 2xl:text-md !text-black !font-bold"> View </TableCell>
                            <TableCell className="border !text-[13px] 2xl:text-md !text-black !font-bold"> Deliverable name </TableCell>
                            <TableCell className="border !text-[13px] 2xl:text-md !text-black !font-bold"> Description </TableCell>
                            <TableCell className="border !text-[13px] 2xl:text-md !text-black !font-bold"> Submit to </TableCell>
                            <TableCell className="border !text-[13px] 2xl:text-md !text-black !font-bold"> Submission Type </TableCell>
                            <TableCell className="border !text-[13px] 2xl:text-md !text-black !font-bold w-[12%]" align="center" colSpan={2}> Action</TableCell>
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
                                                    console.log(data)
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border">
                                                                <IconButton size="small" onClick={() => {
                                                                    setOneDeliverable(data)
                                                                    setViewDeliverableDetail(true)
                                                                }}>
                                                                    <RemoveRedEyeTwoTone className="!text-blue-400" />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border">{data.deliverable.name}</TableCell>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border">{data.deliverable.instruction}</TableCell>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border">{data.deliverable.forAdviser ? "Adviser" : "Teacher"}</TableCell>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border">{data.deliverable.groupSubmission ? "Group" : "Individual"}</TableCell>
                                                            <TableCell className="!text-[12px] 2xl:text-[14px] border !text-center">
                                                                <IconButton
                                                                    type="submit"
                                                                    size="small"
                                                                    onClick={() => { getDeliverableToUpdate(data.deliverableId) }} className="group hover:!bg-green-300">
                                                                    <Edit fontSize="inherit" className="group-hover:!text-black text-green-400" />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell className="border !text-center" >
                                                                <ConfirmDialog deliverableId={data.deliverableId} courseDeliverableId={data.id} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </> : <p>There is no deliverables yet</p>
                                }
                            </>
                        }
                    </TableBody>

                </DynamicTable>
            </Stack>
            {viewDeliverableDetail && <DeanViewDeliverableDetails onDismiss={() => setViewDeliverableDetail(false)} deliverable={oneDeliverable}/>}
            {showDeliverableModal && <AddDeliverable onDismiss={() => setShowAddDeliverableModal(false)} />}
            {showUpdateModal && <UpdateDeliverable deliverable={deliverableToUpdate} onDismiss={() => setShowUpdateModal(false)} />}
        </>
    )
}
