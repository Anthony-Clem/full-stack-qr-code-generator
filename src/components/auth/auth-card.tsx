"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import { login, signup } from "@/actions/authActions";

type AuthTypes = "login" | "signup";

const AuthCard = () => {
  const [authType, setAuthType] = useState<AuthTypes>("login");
  const [error, setError] = useState<
    Record<string, string[] | null> | undefined
  >({});

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          {authType === "login" ? "Login" : "Sign Up"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            if (authType === "login") {
              const res = await login(formData);
              if (res.error) {
                setError(res.error);
              }
            } else if (authType === "signup") {
              const res = await signup(formData);
              if (res.error) {
                setError(res.error);
              }

              if (res.success) {
                setAuthType("login");
              }
            }
          }}
          className="space-y-3"
        >
          {authType === "login" ? (
            <LoginForm error={error} />
          ) : (
            <SignupForm error={error} />
          )}
          <Button className="w-full font-bold">
            {authType === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-muted-foreground text-sm">
          {authType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="font-bold text-black hover:underline transition cursor-pointer"
            onClick={() => {
              setError({});
              setAuthType(authType === "login" ? "signup" : "login");
            }}
          >
            {authType === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
