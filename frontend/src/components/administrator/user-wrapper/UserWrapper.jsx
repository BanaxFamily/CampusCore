/* eslint-disable react/prop-types */
import { Button, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import DynamicTable from "../../reusable/DynamicTable";
import WrapperLayout from "../../reusable/WrapperLayout";
import AddModalUser from "./AddModalUser";
import AddUserThroughExcelConfirmation from "./AddUserThroughExcelConfirmation";
import TableBodyUser from "./TableBody";
import UpdateModal from "./UpdateModal";

export default function UserWrapper({ users }) {
  let count = 0;
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userData = users.data;
  const [searchkey, setSearchKey] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function handleDeleteUser(id) {
    const response = await UserApi.deleteUser(id);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("User deleted successfully!");
      setFilteredUsers(
        filteredUsers.filter((userExist) => userExist.id !== id)
      );
      navigate(0);
    }
  }

  async function handleSearchSubmit(key) {
    const response = await UserApi.searchUser(key);
    if (response.status === true) {
      setFilteredUsers(response.data);
      setSearchKey(key);
    }
  }

  const deleteConfirmation = (id) => {
    let text = "Are you sure you want to delete this user?";
    if (confirm(text) === true) {
      handleDeleteUser(id);
    }
  };

  return (
    <WrapperLayout>
      <div className=" flex flex-col sm:flex-row justify-between gap-2 ml-2 sm:px-4 w-ful tracking-wider">
        <div className="flex py-2 rounded-md gap-2">
          <Button
            onClick={() => setShowAddModal(true)}
            variant="outlined"
            size="small"
            className="mr-2 text-[15px] font-semibold hover:text-black">
            Add
            <AiOutlineUserAdd
              size={20}
            />
          </Button>
          <AddUserThroughExcelConfirmation/>
        </div>
        <div className="flex  gap-4 w-[400px] justify-end items-center">
          <form className="flex" onSubmit={handleSubmit(handleSearchSubmit)}>
            <TextField
              label="search by name.... "
              name="searchKey"
              size="small"
              InputProps={{ style: { fontSize: 12 } }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              className=" !text-white !w-[400px] px-2  rounded-md sm:w-min border-none"
              {...register("searchKey", { required: true })}

            />
            <button disabled={isSubmitting} className="cursor-pointer hover:text-blue-400">
              <BsSearch className="ml-2" />
            </button>
          </form>
          <button className="hover:text-slate-400" onClick={() => navigate(0)}>
            <IoRefreshCircleOutline size={30} />
          </button>
        </div>
      </div>
      <div className="overflow-auto shadow-md shadow-gray-500 rounded-sm">
        <DynamicTable>
          <TableHead>
            <TableRow className="bg-slate-300">
              <TableCell className="w-[4%]"></TableCell>
              <TableCell className="w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">ID#</TableCell>
              <TableCell className="!text-[13px] 2xl:text-md !text-black !font-bold">Username</TableCell>
              <TableCell className="!text-[13px] 2xl:text-md !text-black !font-bold">Firstname</TableCell>
              <TableCell className="!text-[13px] 2xl:text-md !text-black !font-bold">Lastname</TableCell>
              <TableCell className="w-[20%] !text-[13px] 2xl:text-md !text-black !font-bold">Email</TableCell>
              <TableCell className="w-[5%] !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
              <TableCell className="w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">Role</TableCell>
              <TableCell className="w-[10%] !text-[13px] 2xl:text-md !text-black !font-bold" colSpan={2} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchkey ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  count++;
                  return (
                    <TableBodyUser
                      className="py-[1px] mt-1 px-2"
                      key={index}
                      index={count}
                      user={user}
                      onDeleteUserCliked={deleteConfirmation}
                      showModalUpdate={() => {
                        setShowUpdateModal(true);
                        setUserToUpdate(user);
                      }}
                    />
                  );
                })
              ) : (
                <span className="w-full flex just">No records found</span>
              )
            ) : (
              userData.map((user, index) => {
                count++;
                return (
                  <TableBodyUser
                    className="py-[1px] mt-1 px-2"
                    key={index}
                    index={count}
                    user={user}
                    onDeleteUserCliked={deleteConfirmation}
                    showModalUpdate={() => {
                      setShowUpdateModal(true);
                      setUserToUpdate(user);
                    }}
                  />
                );
              })
            )}
          </TableBody>
        </DynamicTable>
      </div>
      {/* </div> */}

      {showAddModal && <AddModalUser onClose={() => {
        setShowAddModal(false)
        navigate(0)
      }} />}

      {showUpdateModal && (<UpdateModal user={userToUpdate} onClose={() => {
        setUserToUpdate(null);
        setShowUpdateModal(false);
      }} />
      )}

    </WrapperLayout>
  );
}
