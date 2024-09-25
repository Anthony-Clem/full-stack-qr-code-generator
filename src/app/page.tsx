import { getUser } from "@/actions/authActions";
import CodesHolder from "@/components/codes-holder";
import GeneratorHolder from "@/components/generator-holder";
import Header from "@/components/header";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/auth");
  }
  return (
    <main className="min-h-screen flex flex-col gap-y-5 items-center pb-10">
      <Header userId={user.userId} />
      <GeneratorHolder />
      <CodesHolder />
    </main>
  );
}
