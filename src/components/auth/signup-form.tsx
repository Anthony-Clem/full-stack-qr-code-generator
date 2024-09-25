import React from "react";
import { Input } from "../ui/input";

const SignupForm = ({
  error,
}: {
  error: Record<string, string[] | null> | undefined;
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Input placeholder="Email address" name="email" />
        {error && (
          <p className="text-xs text-red-800 font-bold  text-right">
            {error.email}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Password" type="password" name="password" />
        {error && (
          <p className="text-xs text-red-800 font-bold  text-right">
            {error.password}
          </p>
        )}
      </div>
      <div>
        <Input
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
        />
        {error && (
          <p className="text-xs text-red-800 font-bold  text-right">
            {error.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
