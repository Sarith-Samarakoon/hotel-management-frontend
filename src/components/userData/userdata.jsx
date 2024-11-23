import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token != null) {
      console.log(token);
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.users.firstName + " " + res.data.users.lastName);
          setUserFound(true);
        });
    } else {
      setName("");
    }
  }, [userFound]);
  return (
    <div className="absolute right-0 flex items-center cursor-pointer mr-2">
      <img
        src={props.imageLink}
        className="rounded-full w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
      />
      <span className="text-white ml-[5px] text-xl ">{name}</span>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUserFound(false);
        }}
      >
        LogOut
      </button>
    </div>
  );
}

export default UserTag;
