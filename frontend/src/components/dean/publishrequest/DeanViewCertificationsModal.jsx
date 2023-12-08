/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Card, CardContent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import * as RepoApi from "../../../network/publicresearchrepo_api";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";

export default function DeanViewCertificationsModal({ onDismiss, submissionIdCertificate }) {
    const [certifcations, setCertifications] = useState([])

    useEffect(() => {
        async function showAllCertifications() {
            try {
                const response = await RepoApi.getAllCertifications({ "submissionId": submissionIdCertificate })
                console.log(response)
                if (response.isSuccess) {
                    setCertifications(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }
        showAllCertifications()
    }, [])
    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="certifications" desc="" />}
            width="md:w-[30rem]"
        >
            {/* {error && <Alert>Issue not added, Check your inputs. If issues persist try again later.</Alert>} */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                {certifcations.map((certificate, index) => (
                    <div className='shadow-md rounded-md hover:shadow-gray-800 ' key={index} >

                        <Card
                            sx={{
                                maxWidth: 'auto',
                                width: '100%',
                                height: '10rem',
                                margin: 'auto',
                                // Add the custom background class
                                backgroundImage: 'url(/certified.svg)',
                                backgroundSize: 'cover', // Optional: adjust based on your needs
                                backgroundRepeat: 'no-repeat', // Optional: adjust based on your needs
                                backgroundPosition: 'center'
                            }}
                        >
                            <CardContent>
                                <Stack className="text-center !text-black font-semibold">{certificate.level}</Stack>
                                <Stack className="text-center !text-black font-semibold">{certificate.approverRole}</Stack>
                                <Stack className="text-center !text-black font-semibold">{certificate.approverRole}</Stack>
                                <Stack className="text-center !text-black font-semibold !text-sm">
                                    {new Date(certificate.approvalDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false,
                                    })}
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </Modal >
    )
}
