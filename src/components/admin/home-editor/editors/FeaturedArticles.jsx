import Link from "next/link";
import { TbEdit } from "react-icons/tb";

export default function FeaturedArticles({ section, setSection }) {
  return (
    <div>
      <div className="mb-2 flex justify-between items-center gap-4">
        <div>
          <h1 className="m-0 font-semibold uppercase">Featured Articles</h1>
        </div>
        <div className="flex gap-2">
          <Link
            className="btn btn-sm"
            target="_blank"
            href={`/admin/dashboard/featured-articles`}
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
