import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as UserApi from "../../../network/user_api";


export default function Edit() {
  // const { role, id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  async function updateUser(credentials) {
    const response = await UserApi.addUser(credentials);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("User updated successfully!");
      reset();
    }
  }

  function updateConfirmation(credentials){
    const text = "Do you want to proceed? Data will be overriden."
    if(confirm(text) === true){
      updateUser(credentials)
    }
  }
  return (
    <>
      <div className="w-full flex text-blue-200 group">
        <Link
          to=".."
          path="relative"
          className="flex flex-row-reverse items-center group-hover:text-blue-400 underline underline-offset-2 text-sm md:text-[10]"
        >
          Back
          <BsArrowBarLeft />
        </Link>
      </div>
      <div
        className=" w-full m-auto border border-slate-600 overflow-hidden 
                  bg-white h-auto md:mt-4 md:h-fit md:w-[90%] flex flex-col rounded-md"
      >
        <div className="m-2 p-2">
          <h1 className=" text-black font-bold tracking-wide text-[20px]">
            Update user
          </h1>
          <p className="text-neutral-400 text-sm">
            Exclusive for university staff, student etc..
          </p>
        </div>

        <div className="shadow-md">
          <div className="p-2">
            <form action="" onSubmit={handleSubmit(updateConfirmation)}>
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
      </div>
    </>
  );
}
