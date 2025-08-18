import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import DialogProvider from "@/context/DialogProvider";
import SectionEditor from "@/components/admin/landing/SectionEditor";
import FAQEditor from "@/components/admin/landing/FAQEditor"; // create this for landing pages
import { useQuery } from "@/hooks/useQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeftSquare } from "react-icons/bs";
import LandingFAQEditor from "@/components/admin/landing/FAQEditor";

export default function LandingPageDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, patch } = useQuery(`/api/landing-pages/${id}`);

  return (
    <div className="bg-base-100 min-h-screen">
      <DialogProvider>
        <AdminPanelWrapper>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin/dashboard/landing-pages">
              <BsArrowLeftSquare className="text-4xl" />
            </Link>
            <h1 className="font-bold">{data?.title || "Loading..."}</h1>
          </div>

          {/* Tabs */}
          <div role="tablist" className="tabs tabs-bordered">
            {/* Sections Tab */}
            <input
              type="radio"
              name="landing_tabs"
              role="tab"
              className="tab"
              aria-label="Sections"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content py-10">
              <SectionEditor
                sections={data?.sections || []}
                patch={async (payload) => {
                  await patch(payload);
                }}
              />
            </div>

            {/* FAQ Tab */}
            <input
              type="radio"
              name="landing_tabs"
              role="tab"
              className="tab"
              aria-label="FAQs"
            />
            <div role="tabpanel" className="tab-content py-10">
             <LandingFAQEditor lid={id} />
            </div>
          </div>
        </AdminPanelWrapper>
      </DialogProvider>
    </div>
  );
}
