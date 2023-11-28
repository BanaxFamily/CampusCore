import { Alert, Stack } from "@mui/material"
import FacultyStudentGroupTable from "./FacultyStudentGroupTable"


export default function FacultyGetStudentGroups() {
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)
    const sample = true
    return (
        <>
            {/* {loading && <LinearProgress />}
      {error && <Alert severity="error">Something went wrong. Try again later</Alert>} */}
            <Stack paddingBottom={4} className="border-3 border-red-400">

                {
                    <Stack className="rounded-md">
                        {
                            sample ? (
                                <FacultyStudentGroupTable />
                            ) : (<Alert severity="info">No deliverables made yet</Alert>)
                        }
                    </Stack>
                }
            </Stack>
        </>
    )
}
