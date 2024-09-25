"use server";

import prisma from "@/lib/db";
import { loginSchema, signupSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== "success") {
    return { error: submission.reply().error };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      error: {
        confirmPassword: ["Passwords must match"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: {
        email: ["Email already in use"],
      },
    };
  }

  const hash = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return { success: true };
};

export const login = async (formData: FormData) => {
  const invalidCred = {
    email: ["Invaild Credentials"],
    password: ["Invaild Credentials"],
  };

  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return { error: submission.reply().error };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!validEmail) {
    return {
      error: invalidCred,
    };
  }

  const validPassword = bcrypt.compareSync(password, validEmail.password);

  if (!validPassword) {
    return {
      error: invalidCred,
    };
  }

  const token = jwt.sign(
    {
      userId: validEmail.id,
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24),
    },
    process.env.JWT_SECRET!
  );

  cookies().set("Authorization", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  redirect("/");
};

export const logout = async () => {
  cookies().delete("Authorization");

  redirect("/auth");
};

export const getUser = async () => {
  const cookie = cookies().get("Authorization")?.value;

  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET!);
      return decoded as JwtPayload;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const getUserLetter = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    redirect("/auth");
  }

  const letter = user?.email[0];

  return { letter };
};
