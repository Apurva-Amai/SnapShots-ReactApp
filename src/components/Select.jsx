import React, { forwardRef, useId } from "react";

function Select(
  {
    options, // An array of options to populate the select dropdown.
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none 
        focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
