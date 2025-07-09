import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import getServerSession from "@/lib/functions/getServerSession";

export default function AdminDashboard() {
  return (
    <div>
      <AdminPanelWrapper></AdminPanelWrapper>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: "/admin",
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
