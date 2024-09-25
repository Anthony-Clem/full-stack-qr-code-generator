"use server";

import prisma from "@/lib/db";
import { linkSchema } from "@/lib/schemas";
import { generateName } from "@/lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import { getUser } from "./authActions";

export const createCode = async (formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: linkSchema,
  });

  if (submission.status !== "success") {
    return { error: submission.reply().error };
  }

  const link = formData.get("link") as string;

  const code = await QRCode.toDataURL(link);

  const generatedName = generateName();

  try {
    const user = await getUser();

    if (!user) {
      return;
    }

    const qr = await prisma.qr.create({
      data: {
        name: generatedName,
        original: link,
        code,
        userId: user.userId,
      },
    });

    revalidatePath("/");
    return { code: qr.code };
  } catch (error) {
    console.error(error);
  }
};

export const deleteCode = async (id: string) => {
  try {
    await prisma.qr.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const editCodeName = async (formData: FormData, id: string) => {
  const name = formData.get("name") as string;

  if (!name) {
    return;
  }

  try {
    await prisma.qr.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};
