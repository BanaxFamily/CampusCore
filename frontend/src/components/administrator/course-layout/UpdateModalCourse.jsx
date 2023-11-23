/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as CourseApi from "../../../network/course_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";

export default function UpdateModalCourse(props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function updateCourse(credentials) {
    const response = await CourseApi.updateCourse(credentials);
    console.log(credentials);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("Course updated successfully!");
      navigate(0);
    }
  }

  function updateConfirmation(credentials) {
    const text = "Do you want to proceed? Data will be overriden";
    if (confirm(text) === true) {
      updateCourse(credentials);
    }
  }

  return (
    <Modal onDismiss={props.onClose}>
      <div className="mb-3">
        <DashBoardHeading title="Update course" desc="" className="py-6" />
      </div>

      <form
        onSubmit={handleSubmit(updateConfirmation)}
        className="flex flex-col justify-start items-center"
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-col flex-grow">
          <input type="text" hidden name="id" value={props.course.id} {...register("id", { required: "select one option" })} />

            <TextField
              id="outline-name"
              name="name"
              label="Name"
              variant="filled"
              defaultValue={props.course.name}
              // value={selectedItem.id || ''}

              {...register("name", { required: true })}
            />
            <div className="flex flex-col w-full mt-1">
              <TextField
                id="filled-role"
                select
                label="Course status"
                defaultValue={props.course.status}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select a type of user"
                variant="filled"
                name="status"
                {...register("status", { required: "select one option" })}
              >
                <option value=""></option>
                <option value="open">Open</option>
                <option value="close">Close</option>
              </TextField>
            </div>
            <TextField
              id="outline-name"
              name="description"
              label="Description"
              variant="filled"
              defaultValue={props.course.description}
              // value={selectedItem.id || ''}

              {...register("description", { required: true })}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-1/4 flex mt-2 self-end justify-center 
              bg-mainBlueColor text-white font-bold tracking-wide py-2 rounded-md
              hover:cursor-pointer hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
