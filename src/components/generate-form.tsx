"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useCodeContext } from "@/lib/hooks";
import { createCode } from "@/actions/codeActions";

const GenerateForm = () => {
  const { handleSetGeneratedCode, handleSetPending } = useCodeContext();
  const [error, setError] = useState<
    Record<string, string[] | null> | undefined
  >({});
  return (
    <form
      className="flex flex-col"
      action={async (formData: FormData) => {
        handleSetPending(true);
        const res = await createCode(formData);
        if (res?.error) {
          return setError(res.error);
        }

        handleSetGeneratedCode(res?.code);
        handleSetPending(false);
      }}
    >
      {error && (
        <p className="text-red-800 font-bold text-xs ml-auto">{error.link}</p>
      )}
      <div className="space-y-2">
        <Input placeholder="Enter Link..." name="link" />
        <Button type="submit" className="w-full font-bold" size={"lg"}>
          Generate
        </Button>
      </div>
    </form>
  );
};

export default GenerateForm;
