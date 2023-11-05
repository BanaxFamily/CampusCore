import emptProfilePic from "../assets/emptypic.jpg";

export default function User() {
//   const [userName, setUserName] = useState("Maria Ty");
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static mb-4">
      <span className="absolute -inset-1.5"></span>
      <img className="h-8 w-8 rounded-full" src={emptProfilePic} alt="" />
      <span className="text-white font-semibold ml-2">NAME OF USER</span>
    </div>
  );
}
