import { CodeContext } from "@/contexts/code-context-provider";
import { useContext } from "react";

export function useCodeContext() {
  const context = useContext(CodeContext);

  if (!context) {
    throw new Error("useCodeContext must be used within a CodeContextProvider");
  }

  return context;
}
