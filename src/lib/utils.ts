import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateName() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export const downloadImg = async (code: string, name: string) => {
  try {
    const response = await fetch(code);
    const blob = await response.blob();
    const fileURL = window.URL.createObjectURL(blob);

    const alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = `${name}`;
    alink.click();
  } catch (error) {
    console.log("Error while downloading the image:", error);
  }
};
