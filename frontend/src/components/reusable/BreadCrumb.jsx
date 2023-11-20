/* eslint-disable react/prop-types */
import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export default function BreadCrumb({ data }) {

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
            >
                {
                    data.map((item, index) => (
                        <>
                            {

                                index !== data.length - 1 ?
                                    <Link key={index} className='hover:underline text-inherit' to={item.url}>
                                        {item.name}
                                    </Link> :<Typography className='underline' key="3" color="text.primary">{item.name}</Typography>
                            }
                        </>
                    ))
                }
            </Breadcrumbs>
        </Stack>
    );
}