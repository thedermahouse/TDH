import Login from "@/components/admin/Login";
import getServerSession from "@/lib/functions/getServerSession";

export default function AdminPanel() {
  return (
    <div>
      <Login />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res);

  if (session) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
