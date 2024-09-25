"use client";

import { useRef, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { editCodeName } from "@/actions/codeActions";

type Props = {
  name: string;
  id: string;
};

const CodeName = ({ name, id }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [inputValue, setInputValue] = useState(name); // Manage input value state

  useEffect(() => {
    // Update input value whenever `name` changes (e.g., a new code is generated)
    setInputValue(name);
  }, [name]);

  const handleBlur = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await editCodeName(formData, id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      ref={formRef}
      className="flex"
      action={async (formData: FormData) => {
        await editCodeName(formData, id);
      }}
    >
      <Input
        value={inputValue} // Use controlled input
        onChange={handleChange}
        className="w-[70px]"
        name="name"
        onBlur={handleBlur}
      />
    </form>
  );
};

export default CodeName;
