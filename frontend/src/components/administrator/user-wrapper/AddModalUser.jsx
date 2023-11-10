/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import * as UserApi from "../../../network/user_api";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import DashBoarHeading from "../../reusable/DashBoardHeading";

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
    console.log(credentials)
    console.log(response)
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
              <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="idno"
                >
                  IDNO
                </label>
                <input
                  className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1"
                  type="text"
                  name="idno"
                  placeholder="18XXXXX"
                  id="idno"
                  {...register("idno")}
                />
                <div className="flex flex-col w-full mt-1">
                  <label
                    className="text-[18px] md:text-[15px] font-[200]"
                    htmlFor="roles"
                  >
                    Type of user
                  </label>
                  <select
                    id="roles"
                    name="role"
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
                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-[4px]">
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
                  {...register("email", { required: true })}
                />

                <label
                  className="text-[18px] md:text-[15px] font-[200]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full bg-gray-300 rounded-lg  mr-2 py-2 px-4 md:py-1"
                  type="password"
                  name="password"
                  placeholder="***********"
                  id="password"
                  {...register("password", { required: true })}
                />

                <label
                  className="text-[18px]  md:text-[15px] font-[200]"
                  htmlFor="rePassword"
                >
                  Confirm password
                </label>
                <input
                  className="w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1"
                  type="password"
                  name="rePassword"
                  placeholder="juan@gmail.com"
                  id="rePassword"
                  {...register("rePassword", { required: true })}
                />
                <button
                  disabled={isSubmitting}
                  className="bg-mainBlueColor text-white font-bold
                  w-full md:w-3/4 flex self-end justify-center  rounded-lg
                  py-4 mt-4 tracking-wider md:py-2"
                >
                  Add account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
