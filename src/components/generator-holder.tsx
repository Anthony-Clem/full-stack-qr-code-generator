import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import CodeContextProvider from "@/contexts/code-context-provider";
import GenerateForm from "./generate-form";
import QrHolder from "./qr-holder";

const GeneratorHolder = () => {
  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">QrCode Generator</h1>
        <p className="text-xs text-muted-foreground font-semibold">
          Enter a link below and begin generating your codes
        </p>
      </CardHeader>
      <CodeContextProvider>
        <CardContent>
          <GenerateForm />
          <QrHolder />
        </CardContent>
      </CodeContextProvider>
      <CardFooter>
        <small className="text-xs text-gray-400">&copy; Anthony Clement</small>
      </CardFooter>
    </Card>
  );
};

export default GeneratorHolder;
