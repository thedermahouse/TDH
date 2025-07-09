import { useSession } from "next-auth/react";

export default function useAdmin() {
  const session = useSession();
  return session?.data?.admin === true;
}
