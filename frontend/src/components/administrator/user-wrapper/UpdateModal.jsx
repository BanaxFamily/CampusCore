/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import * as UserApi from "../../../network/user_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";

export default function UpdateModal(props) {
  const { user } = props;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(credentials) {
    const response = await UserApi.updateUser(credentials);
    if (response.status) {
      alert(`Error: ${response.status}`);
      console.log(response);
      console.log(credentials);
    } else {
      alert("User updated successfully!");
      reset();
      navigate(0);
    }
  }

  const confirmUpdate = (credentials) => {
    let text = "Data will be overrride. Are you sure you want to proceed?";
    if (confirm(text) === true) {
      onSubmit(credentials);
    }
  };
  return (
    <Modal
      onDismiss={props.onClose}
      heading={<DashBoardHeading title="Update user" desc="" />}
    >
      <div className="shadow-md">
        <div className="p-2">
          <form action="" onSubmit={handleSubmit(confirmUpdate)}>
            
            <input type="text" hidden name="id" value={user.id} {...register("id", { required: "select one option" })}/>
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <div className="w-full sm:w-1/2 flex flex-col gap-[3px]">
                <div className="flex flex-col w-full">
                  <label
                    className="text-[18px] md:text-[15px] font-[200]"
                    htmlFor="roles"
                  >
                    Type of user
                  </label>
                  <select
                    id="roles"
                    name="role"
                    defaultValue={user.role}
                    {...register("role", { required: "select one option" })}
                    className="w-full text-sm md:text-[12px] border-0 rounded-md bg-gray-300 py-2 md:py-2 px-4 "
                  >
                    <option disabled value="" className="text-gray-300">
                      --Choose user type
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Faculty">Faculty</option>
                    <option value="PRC">PRC</option>
                    <option value="Dean">Dean</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="firstname"
                >
                  Firstname
                </label>
                <input
                  className=" bg-gray-300 rounded-lg w-full mr-2 py-2 px-4 md:py-1"
                  type="text"
                  name="firstname"
                  placeholder="Paul"
                  id="firstName"
                  defaultValue={user.firstName}
                  {...register("firstName", { required: true })}
                />
                <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="lastname"
                >
                  Lastname
                </label>
                <input
                  className=" bg-gray-300 rounded-lg w-full mr-2 py-2 px-4 md:py-1"
                  type="text"
                  name="lastname"
                  placeholder="Ebara"
                  id="lastName"
                  defaultValue={user.lastName}
                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-[3px]">
                <div className="flex flex-col w-full ">
                  <label
                    className="text-[18px] md:text-[15px] font-[200]"
                    htmlFor="status"
                  >
                    User status
                  </label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={user.status}
                    {...register("status", { required: "select one option" })}
                    className="w-full text-sm md:text-[12px] border-0 rounded-md bg-gray-300 py-2 md:py-2 px-4 "
                  >
                    <option disabled value="" className="text-gray-300">
                      --Choose user type
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1"
                  type="username"
                  name="username"
                  placeholder="xxxxxxx"
                  id="username"
                  defaultValue={user.username}
                  {...register("username", { required: true })}
                />
                <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1"
                  type="email"
                  name="email"
                  placeholder="juan@gmail.com"
                  id="email"
                  defaultValue={user.email}
                  {...register("email", { required: true })}
                />

                <button
                  disabled={isSubmitting}
                  className="bg-mainBlueColor flex sef-end justify-center text-white font-bold
                w-full rounded-lg py-4 mt-4 tracking-wider md:py-2"
                >
                  Update user
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}