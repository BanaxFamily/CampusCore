/* eslint-disable react/prop-types */
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import DashBoarHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";

export default function AddModalUser(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(credentials) {
    const response = await UserApi.addUser(credentials);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("User added successfully!");
      reset();
      navigate(0);
    }
  }

  return (
    <Modal
      onDismiss={props.onClose}
      heading={<DashBoarHeading title="Add user" desc="" />}
    >
      <div className="w-full border">
        <div className="p-2">
          <form action="" onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <div className="w-full flex-col sm:flex sm:w-1/2 justify-start md:gap-[3px]">


                <TextField
                  id="outline-idno"
                  name="idno"
                  label="ID #"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("idno", { required: true })}
                />
                <div className="flex flex-col w-full mt-1">
                  <TextField
                    id="filled-userType"
                    select
                    label="User type"
                    // defaultValue="  "
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
                <div className="flex flex-col w-full ">

                  <TextField
                    id="filled-status"
                    select
                    label="Status"
                    // defaultValue=""
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
                  // value={selectedItem.id || ''}

                  {...register("firstName", { required: true })}
                />

                <TextField
                  id="outline-lastName"
                  name="lastName"
                  label="Lastname"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-[4px]">


                <TextField
                  id="outline-username"
                  name="username"
                  label="Username"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("username", { required: true })}
                />

                <TextField
                  id="outline-email"
                  name="email"
                  label="Email"
                  variant="filled"
                  // value={selectedItem.id || ''}

                  {...register("email", { required: true })}
                />


                <TextField
                  id="outline-password"
                  name="password"
                  label="Password"
                  variant="filled"
                  type="password"
                  // value={selectedItem.id || ''}

                  {...register("password", { required: true })}
                />


                <TextField
                  id="outline-confirmPass"
                  name="rePassword"
                  label="Confirm password"
                  variant="filled"
                  type="password"
                  // value={selectedItem.id || ''}

                  {...register("rePassword", { required: true })}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  className="text-white font-bold
                  w-full md:w-3/4 flex place-self-end justify-end  rounded-lg
                  py-4 mt-4 tracking-wider md:py-2"
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
