/* eslint-disable react/prop-types */
import { Stack } from '@mui/material'

export default function BackNav({children}) {
    return (
        <nav>
            <Stack direction="row" className='text-md lg:text-lg'>
                {children}
            </Stack>
        </nav>
    )
}
