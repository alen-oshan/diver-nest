import { auth } from "@/auth";

export async function requireAuth(role) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  if (role && session.user.role !== role) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
