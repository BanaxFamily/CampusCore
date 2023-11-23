/* eslint-disable react/prop-types */
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as UserApi from "../../../network/user_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

export default function UpdateModal(props) {
  const { user } = props;
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(credentials) {

    try {
      const response = await UserApi.updateUser(credentials);
      console.log(response)
      if (response.isSuccess) {
        setSuccess(response.message);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        // Check if there are multiple errors
        // Extract values from errors
        const errorValues = Object.values(data.errors)
          .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
        // Set the error state with values
        setError(errorValues.join(', '));
        // console.error('Error : ', [...data.errors]);
        // setError(data.errors[0]);
        return;
      }


    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred. Please check your inputs.');
    } finally {
      setTimeout(() => {
        setError(null)
        setSuccess(null);
      }, 5000);
    }
  }

  const confirmUpdate = (credentials) => {
    let text = "Data will be overrride. Are you sure you want to proceed?";
    if (confirm(text)) {
      onSubmit(credentials);
    }
  };

  return (
    <Modal
      onDismiss={() => {
        props.onClose
        navigate(0)
      }}
      heading={<DashBoardHeading title="Update user" desc="" />}
    >
      {error && <Alert severity="error">{error}!</Alert>}
      {success && <Alert severity="success">{success}!</Alert>}
      <div className="shadow-md">
        <div className="p-2">
          <form action="" onSubmit={handleSubmit(confirmUpdate)}>

            <input type="text" hidden name="id" value={user.id} {...register("id", { required: "select one option" })} />
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <div className="w-full flex-col sm:flex sm:w-1/2 justify-start md:gap-[3px]">



                <div className="flex flex-col w-full ">

                  <TextField
                    id="filled-status"
                    select
                    label="Status"
                    defaultValue={user.status}
                    SelectProps={{
                      native: true,
                    }}

                    helperText="Please select if user is active or not"
                    variant="filled"
                    name="status"
                    {...register("status", { required: "select one option" })}
                  >

                    <option value=""></option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </TextField>
                </div>

                <TextField
                  id="outline-firstname"
                  name="firstName"
                  label="Firstname"
                  variant="filled"
                  defaultValue={user.firstName}
                  // value={selectedItem.id || ''}

                  {...register("firstName", { required: true })}
                />

                <TextField
                  id="outline-lastName"
                  name="lastName"
                  label="Lastname"
                  variant="filled"
                  defaultValue={user.lastName}
                  // value={selectedItem.id || ''}

                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-[4px]">
                <div className="flex flex-col w-full">
                  <TextField
                    id="filled-userType"
                    select
                    label="User type"
                    defaultValue={user.role}
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Please select a type of user"
                    variant="filled"
                    name="role"
                    {...register("role", { required: "select one option" })}
                  >
                    <option value=""></option>
                    <option value="Admin">Admin</option>
                    <option value="Faculty">Faculty</option>
                    <option value="PRC">PRC</option>
                    <option value="Dean">Dean</option>
                    <option value="Student">Student</option>
                  </TextField>
                </div>

                <TextField
                  id="outline-username"
                  name="username"
                  label="Username"
                  variant="filled"
                  defaultValue={user.username}
                  // value={selectedItem.id || ''}

                  {...register("username", { required: true })}
                />

                <TextField
                  id="outline-email"
                  name="email"
                  label="Email"
                  variant="filled"
                  defaultValue={user.email}
                  // value={selectedItem.id || ''}

                  {...register("email", { required: true })}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  className="text-white font-bold
                  w-full md:w-3/4 flex place-self-end justify-end  rounded-lg
                  py-4 mt-4 tracking-wider md:py-8"
                >
                  Add account
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </Modal>
  );
}
