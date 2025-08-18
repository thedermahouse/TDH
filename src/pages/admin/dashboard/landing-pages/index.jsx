import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import NewLandingPage from "@/components/admin/landing/NewLandingPage";
import LandingPageItem from "@/components/admin/landing/LandingPageItem";
import { useQuery } from "@/hooks/useQuery";

export default function LandingPages() {
  const { data, post, put, refetch } = useQuery("/api/landing-pages");
  console.log("LandingPages data:", data);

  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-xl uppercase">Landing Pages</h1>
            <NewLandingPage post={post} refetch={refetch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(data) &&
              data.map((p) => (
                <LandingPageItem key={p.id} page={p} refetch={refetch} />
              ))}
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
