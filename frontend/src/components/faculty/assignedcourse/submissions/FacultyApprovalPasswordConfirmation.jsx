/* eslint-disable react/prop-types */
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as SubmissionApi from "../../../../network/submission_api";
import Modal from "../../../administrator/Modal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import { useAuth } from "../../../../utils/AuthContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyApprovalPasswordConfirmation({ onDismiss }) {
  const { userRole, userId } = useAuth()
  let {submissionId} = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState([])
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()

  async function attachApproval(data) {
    console.log(data)
    try {
      const response = await SubmissionApi.addApproval(data)
      if (response.isSuccess) {
        navigate(0)
        return
      }
      if (!response.isSuccess) {
        const data = await response.json();
        setMessage(data.message)
        return
      }
    } catch (error) {
      console.error(error)
    }

  }


  return (
    <Modal
      onDismiss={onDismiss}
      heading={<DashBoardHeading title="Please enter your password" desc="" />}
      width="md:w-[25rem]"
    >
      <form action="" onSubmit={handleSubmit(attachApproval)}>
        {message && <Alert severity="error">{message}</Alert>}
        <input type="text" value={userId} name='userId' hidden {...register('userId', { required: true })} />
        <input type="text" value={userRole} name='role' hidden {...register('role', { required: true })} />
        <input type="text" value={submissionId} name='submissionId' hidden {...register('submissionId', { required: true })} />
        <Stack className="gap-2">
          <TextField
            label="Password"
            type="password"
            size="small"
            name="password"
            className="w-full"
            {...register('password', { required: true })}
          />
          <Stack className="!flex-row justify-between mt-4">
            <Button variant='contained' type="submit" disabled={isSubmitting}>Yes</Button>
            <Button size="small" className="w-[30%]" variant="outlined" onClick={onDismiss}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  )
}
