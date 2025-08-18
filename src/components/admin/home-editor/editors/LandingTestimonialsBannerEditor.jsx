import { TbEdit } from "react-icons/tb";
import Link from "next/link";

export default function LandingTestimonialsBannerEditor({ section, setSection }) {
  return (
    <div>
      <div className="mb-2 flex justify-between items-center gap-4">
        <div>
          <h1 className="m-0 font-semibold uppercase">
            Testimonials for Landing Page
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            className="btn btn-sm"
            target="_blank"
            aria-label="Edit landing page testimonials"
            href={`/admin/dashboard/landing-page-testimonials/`}
            onClick={() => {
              setSection((s) => {
                s.items = [...(s?.items || []), {}];
                return s;
              });
            }}
          >
            <span className="text-xl">
              <TbEdit />
            </span>
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
