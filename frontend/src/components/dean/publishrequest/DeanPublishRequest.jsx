/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import * as RepoApi from "../../../network/publicresearchrepo_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import DeanPublishRequestTable from "./DeanPublishRequestTable";

export default function DeanPublishRequest() {
    const [allRequest, setAllRequest] = useState([])

    useEffect(() => {
        async function getPublishRequest(){
            try {
                const response = await RepoApi.getAllRequest()
                if(response.isSuccess){
                    setAllRequest(response.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getPublishRequest()
    }, [])
    return (
        <Stack>
            <DashBoardHeading title="Request for Publication" />

            <Stack className="my-2">
                {allRequest.length < 1? <Alert severity="info" className="uppercase">No request yet</Alert> : <DeanPublishRequestTable allRequest={allRequest}/>}
            </Stack>
        </Stack>
    )
}
