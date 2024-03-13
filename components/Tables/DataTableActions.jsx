import React from "react";
import { GrView } from "react-icons/gr";
import { LuFileEdit } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

const DataTableActions = ({
  id,
  viewIcon,
  editIcon,
  deleteIcon,
  endPoint,
  deleteEndPoint,
  viewEndPoint,
  editEndPoint,
}) => {
  const deleteHandler = () => {};
  return (
    <div className="flex justify-between items-center">
      {editIcon && (
        <button
          onClick={deleteHandler}
          type="button"
          className="border-none text-[orange] p-1 font-semibold rounded text-xl "
        >
          <LuFileEdit />
        </button>
      )}
      {viewIcon && (
        <Link
          href={`${viewEndPoint}`}
          className="border-none text-[#37cc0d] p-1 font-semibold rounded text-xl "
        >
          <GrView />
        </Link>
      )}
      {deleteIcon && (
        <button
          type="button"
          className="border-none text-[red] p-1 font-semibold rounded text-xl "
        >
          <AiOutlineDelete />
        </button>
      )}
    </div>
  );
};

export default DataTableActions;
