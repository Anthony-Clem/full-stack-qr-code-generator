import React from "react";
import { Card } from "./ui/card";
import prisma from "@/lib/db";
import DownloadBtn from "./download-btn";
import DeleteBtn from "./delete-btn";
import CodeName from "./code-name";
import { getUser } from "@/actions/authActions";
import { redirect } from "next/navigation";

const CodesHolder = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const codes = await prisma.qr.findMany({
    where: {
      userId: user.userId,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });

  if (codes.length > 0)
    return (
      <div className="max-w-[600px] h-[300px] overflow-y-scroll w-full space-y-3">
        <h2 className="text-center text-muted-foreground font-bold text-sm">
          Change the name below to what you want your Qr downloaded as
        </h2>
        {codes.map((code) => (
          <Card
            className="p-4 flex items-center justify-between min-w-[400px] overflow-x-scroll"
            key={code.id}
          >
            <CodeName name={code.name} id={code.id} />
            <p className="w-44 truncate">{code.original}</p>
            <div className="flex items-center gap-1">
              <DownloadBtn code={code.code} name={code.name} />
              <DeleteBtn id={code.id} />
            </div>
          </Card>
        ))}
      </div>
    );
};

export default CodesHolder;
