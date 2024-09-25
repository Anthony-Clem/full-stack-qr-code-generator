"use client";

import { useCodeContext } from "@/lib/hooks";
import { Loader } from "lucide-react";
import Image from "next/image";

const QrHolder = () => {
  const { generatedCode, pending } = useCodeContext();

  if (generatedCode)
    return (
      <div className="bg-primary flex items-center justify-center w-full h-[300px] mt-5 rounded-lg">
        {!pending ? (
          <Image
            src={generatedCode}
            alt="qr code"
            width={250}
            height={250}
            className="w-[225px] h-[225px] rounded-lg"
          />
        ) : (
          <Loader className="animate-spin" />
        )}
      </div>
    );
};

export default QrHolder;
