"use client";

import { deleteCode } from "@/actions/codeActions";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

const DeleteBtn = ({ id }: { id: string }) => {
  return (
    <Button
      variant="ghost"
      className="p-3"
      onClick={async () => {
        await deleteCode(id);
      }}
    >
      <FaTrash className="size-3 text-destructive" />
    </Button>
  );
};

export default DeleteBtn;
