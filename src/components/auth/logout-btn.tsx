"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logout } from "@/actions/authActions";

const LogoutBtn = () => {
  return (
    <DropdownMenuItem
      className="text-destructive font-bold"
      onClick={async () => await logout()}
    >
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutBtn;
