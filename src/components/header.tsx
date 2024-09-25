import Image from "next/image";
import logo from "@/app/icon.svg";
import Link from "next/link";
import { getUserLetter } from "@/actions/authActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogoutBtn from "./auth/logout-btn";

const Header = async ({ userId }: { userId: string }) => {
  const { letter } = await getUserLetter(userId);

  return (
    <header className="border-b border-slate-200] p-4 flex items-center justify-between w-full">
      <Link href="/">
        <Image src={logo} alt="logo" priority className="size-12" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="size-8 bg-gray-500 flex items-center justify-center rounded-full font-bold text-white capitalize">
            {letter}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <LogoutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
