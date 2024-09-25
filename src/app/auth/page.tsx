import { getUser } from "@/actions/authActions";
import AuthCard from "@/components/auth/auth-card";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-3">
      <AuthCard />
    </main>
  );
}
