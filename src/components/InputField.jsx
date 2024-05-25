import React from "react";

export default function InputField(props) {

	return (
		<div className=" bg-white w-[190px] h-[170px] flex items-center justify-around flex-col px-4  overflow-hidden rounded-xl">
			<input
				className=" text-center h-[100px] text-[2.5rem] focus:border-none font-bold"
				onChange={props.handleChange}
				name={props.name}
				value={props.value}
				placeholder={props.placeholder}
				type="text"
				maxLength={props.maxLength}
				ref = {props.inputRef}
				onFocus={props.onFocus}
				required
			/>
			<p className="w-full bg-gray h-[0.01rem] "></p>
			<p className="text-black text-[1.2rem] tracking-widest  uppercase">{props.name}</p>
		</div>
	);
}
