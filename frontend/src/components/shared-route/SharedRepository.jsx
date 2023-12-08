import { Stack } from "@mui/material";
import DashBoardHeading from "../reusable/DashBoardHeading";
import SharedRepositoryTable from "./SharedRepositoryTable";

export default function SharedRepository() {
    return (
        <Stack>
            <DashBoardHeading title="Research repository" />
            <Stack className="mt-4">
                <SharedRepositoryTable />
            </Stack>
        </Stack>
    )
}
