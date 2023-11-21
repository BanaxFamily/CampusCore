/* eslint-disable react/prop-types */
import { Stack } from '@mui/material'

export default function BackNav({children}) {
    return (
        <nav>
            <Stack direction="row" className='text-sm lg:text-md'>
                {children}
            </Stack>
        </nav>
    )
}
