import React from "react";

export default function Result(props) {
  return (
    <div className=" result2 flex gap-4 items-center ">
      <p className="text-red font-bold text-[1.5rem]">{props.data}</p>
      <p className="one bg-white rounded-lg font-bold text-[1.5rem] p-2 ">{props.text}</p>
    </div>
  );
}
