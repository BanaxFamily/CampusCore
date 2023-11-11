/* eslint-disable react/prop-types */
// import { useForm } from "react-hook-form";
// import Modal from "../Modal";
// import { useNavigate } from "react-router-dom";
// import DashBoarHeading from "../../reusable/DashBoardHeading";

import { Checkbox, List, ListItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";
import { TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form";
import * as OfferCourse from "../../../network/offeredCourse_api"
import * as UserRole from "../../../network/getUserRole_api"

export default function AddOfferedCourse({ offeredCourse, onClose }) {

  const [selectedItem, setSelectedItem] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleToggle = (data) => {
    setSelectedItem(data.id === selectedItem?.id ? null : data);
  };

  async function onSubmit(credentials) {
    const response = await OfferCourse.addOfferCourse(credentials);
    console.log(credentials)
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("User added successfully!");
      // reset();
      // navigate(0);
    }
  }

  useEffect(() => {
    async function getUserRoles(){
      const response = await UserRole.getUserRoles({"role":"faculty"})
      setUserRoles(response.data)
    }
    getUserRoles()
  }, [])


  return (
    <Modal
      onDismiss={onClose}
      heading={<DashBoardHeading title="Add offered course" desc="" />}
    >
      <div className="w-full">
        <div className="p-2">
          <div className="flex flex-col sm:flex-row sm:gap-1 overflow-hidden ">
            <div className="w-full h-32 flex-col sm:h-[400px] overflow-y-auto sm:flex sm:w-1/2 justify-center md:border-r-2 md:gap-[3px]">
              <p className="text-lg font-semibold">Opened Subjects</p>
              <List className="text-lg">
                {offeredCourse.map((data, index) => (
                  <ListItem onClick={() => handleToggle(data)} key={index}>
                    <Checkbox
                      color="primary"
                      checked={data.id === selectedItem?.id}
                    />
                    {data.name} ({data.description})
                  </ListItem>
                ))}
              </List>
            </div>
            <span className="block md:hidden">
              <Divider/>
              </span>
            <form action="" className="w-full h-64 sm:h-full md:h-[400px] md:w-1/2 flex flex-col gap-2 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-lg font-semibold py-2">To be assigned course</p>
              <div className=" w-full py-2 mb-4 mt-2 flex flex-col gap-2">
                <input
                  id="outline-courseId"
                  name="courseId"
                  label="courseId ID"
                  value={selectedItem.id | ''}
                  hidden
                  {...register("courseId", { required: "this si required" })}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Course"
                  value={selectedItem.name || ''}

                />

                <TextField
                  required
                  id="outline-semester"
                  label="Semester"
                  name="sem"
                  {...register("sem", { required: "this si required" })}

                // value={selectedItem.name || ''}
                />

                <TextField
                  required
                  id="outline-year"
                  name="acadYear"
                  label="Year"
                  {...register("acadYear", { required: "this si required" })}

                // value={selectedItem.name || ''}
                />

                <TextField
                  required
                  id="outline-schedule"
                  name="schedule"
                  label="Schedule"
                  {...register("schedule", { required: "this si required" })}

                // value={selectedItem.name || ''}
                />

                {/* <TextField
                  required
                  id="outline-faculty"
                  name="facultyId"
                  label="Faculty ID"
                  {...register("facultyId", {required: "this si required"})}
                // value={selectedItem.name || ''}
                /> */}

                <TextField
                  id="filled-role"
                  select
                  label="Faculty"
                  // defaultValue="  "
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select a proffesor to handle this subject"
                  variant="filled"
                  name="facultyId"
                  {...register("facultyId", { required: "select one option" })}
                >
                  <option value=""></option>
                  {
                    userRoles.map((role, index) => (
                    <option value={role.id} key={index}>{role.fullName}</option>
                    ))
                  }
                  {/* <option value="open">Open</option>
                  <option value="close">Close</option> */}
                </TextField>
              </div>

              <Button type="submit" disabled={isSubmitting} variant="outlined" className="w-full mt-2">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
