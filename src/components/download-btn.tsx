"use client";

import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from "./ui/button";
import { downloadImg } from "@/lib/utils";

type Props = {
  code: string;
  name: string;
};

const DownloadBtn = ({ code, name }: Props) => {
  return (
    <Button
      variant="ghost"
      className="p-3"
      onClick={() => downloadImg(code, name)}
    >
      <MdOutlineFileDownload className="size-5" />
    </Button>
  );
};

export default DownloadBtn;
