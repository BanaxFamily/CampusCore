/* eslint-disable react/prop-types */
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as CourseApi from "../../../network/course_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Modal from "../Modal";

export default function AddModalCourse({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(credentials) {
    const formData = {
      'name': credentials.name,
      'status': credentials.status,
      'hasRetainableGroup': Boolean(credentials.hasRetainableGroup),
      'description': credentials.description,
    }
    const response = await CourseApi.addCourse(formData);
    if (response.status) {
      alert(`Error: ${response.status}`);
    } else {
      alert("Course added successfully!");
      reset();
    }
  }
  return (
    <>
      <Modal onDismiss={onClose} width="md:!w-[30rem]" heading={<DashBoardHeading title="Add course" desc="" />}>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col flex-grow gap-2">
              <Typography fontSize={'small'}>Name</Typography>
              <TextField
                id="outline-name"
                name="name"
                label="Name"
                size="small"
                InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                {...register("name", { required: true })}
              />
              <div className="flex flex-col w-full mt-1">
                <Typography fontSize={'small'}>Course status</Typography>
                <TextField
                  id="filled-role"
                  select
                  label="Course status"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  SelectProps={{
                    native: true,
                  }}
                  name="status"
                  size="small"
                  {...register("status", { required: "select one option" })}
                >
                  <option value=""></option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </TextField>
              </div>
              <div className="flex flex-col w-full mt-1">
                <Typography fontSize={'small'}>Retainable</Typography>
                <TextField
                  id="filled-role"
                  select
                  label="Retainable group"
                  InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  SelectProps={{
                    native: true,
                  }}
                  name="hasRetainableGroup"
                  size="small"
                  {...register("hasRetainableGroup", { required: "select one option" })}
                >
                  <option value=""></option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </TextField>
              </div>
              <Typography fontSize={'small'}>Description</Typography>
              <TextField
                id="outline-name"
                name="description"
                label="Description"
                size="small"
                InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                {...register("description", { required: true })}
              />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              className="w-1/4 flex !mt-2 self-end justify-center
              bg-mainBlueColor text-white font-bold tracking-wide py-2 rounded-md
              hover:cursor-pointer hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
