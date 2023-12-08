/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mui/material";
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
            <DashBoardHeading title="Publish request" />

            <Stack className="my-2">
                <DeanPublishRequestTable allRequest={allRequest}/>
            </Stack>
        </Stack>
    )
}
