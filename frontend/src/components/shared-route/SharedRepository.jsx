import { Stack } from "@mui/material";
import DashBoardHeading from "../reusable/DashBoardHeading";
import SharedRepositoryTable from "./SharedRepositoryTable";
import { useEffect, useState } from "react";
import * as RepoApi from "../../network/publicresearchrepo_api"

export default function SharedRepository() {
    const [published, setPublished] = useState([])
    useEffect(() => {
        async function showAllPublishedResearch() {
            const response = await RepoApi.getAllPublishedResearch()
            setPublished(response.data)
            console.log(response)
        }
        showAllPublishedResearch()
    }, [])
    return (
        <Stack>
            <DashBoardHeading title="Research repository" />
            <Stack className="mt-4">
                <SharedRepositoryTable published={published}/>
            </Stack>
        </Stack>
    )
}
