/* eslint-disable react/prop-types */
import { MoreHoriz, NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export default function BreadCrumb({ data }) {

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNext fontSize="small" />}
            >

                {
                    data.map((item, index) => (
                        index !== data.length - 1 ?
                            (
                                <span key={index}>
                                    <Link key={index} className=' hidden sm:block hover:underline text-inherit' to={item.url}>
                                        {item.name}
                                    </Link>
                                    <Link to={item.url} className='block sm:hidden'><MoreHoriz /></Link>
                                </span>
                            ) : <Typography key={index} className='underline !font-semibold' color="text.primary">{item.name}</Typography>

                    ))
                }
            </Breadcrumbs>
        </Stack>
    );
}