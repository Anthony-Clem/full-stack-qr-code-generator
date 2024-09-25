"use client";

import React, { createContext, useState } from "react";

interface CodeContextProviderProps {
  children: React.ReactNode;
}

interface TCodeContext {
  generatedCode: string | undefined;
  pending: boolean;
  handleSetGeneratedCode: (code: string | undefined) => void;
  handleSetPending: (bool: boolean) => void;
}

export const CodeContext = createContext<TCodeContext | null>(null);

export default function CodeContextProvider({
  children,
}: CodeContextProviderProps) {
  const [generatedCode, setGeneratedCode] = useState<string | undefined>("");
  const [pending, setPending] = useState<boolean>(false);

  const handleSetPending = (bool: boolean) => {
    setPending(bool);
  };

  const handleSetGeneratedCode = (code: string | undefined) => {
    setGeneratedCode(code);
  };
  return (
    <CodeContext.Provider
      value={{
        generatedCode,
        pending,
        handleSetGeneratedCode,
        handleSetPending,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}
