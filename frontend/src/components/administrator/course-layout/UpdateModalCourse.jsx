/* eslint-disable react/prop-types */
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
            <input
              type="text"
              name="id"
              defaultValue={props.course.id}
              {...register("id", { required: true })}
              hidden
            />
            <label htmlFor="name">Name&nbsp;</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="course.."
              defaultValue={props.course.name}
              className=" bg-gray-200 pl-2 py-1 w-full border-b border-gray-500 rounded-md"
              {...register("name", { required: true })}
            />
            <label htmlFor="status">Status&nbsp;</label>
            <select
              id="roles"
              name="status"
              defaultValue={props.course.status}
              {...register("status", { required: "select one option" })}
              className="w-full text-sm md:text-[12px] border-0 rounded-md bg-gray-300 py-2 md:py-2 px-4 "
            >
              <option defaultValue="" className="text-gray-300">
                --open or close
              </option>
              <option value="open">Open</option>
              <option value="faculty">Close</option>
            </select>
            <label htmlFor="desc  ription">Description&nbsp;</label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={props.course.description}
              className=" bg-gray-200 py-1 w-full border-b border-gray-500 rounded-md"
              {...register("description", { required: true })}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-1/4 flex mt-2 self-end justify-center 
              bg-mainBlueColor text-white font-bold tracking-wide py-2 rounded-md
              hover:cursor-pointer hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
