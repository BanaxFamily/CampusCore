/* eslint-disable react/prop-types */
import { Backdrop, CircularProgress } from '@mui/material'

export default function BackdropLoading(props) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={props.onDismiss}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
