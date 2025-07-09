import { BiTrash } from "react-icons/bi";
import { TbEdit, TbTrash } from "react-icons/tb";
import Link from "next/link";

export default function InstagramBanners({ section, setSection }) {
  return (
    <div>
      <div className="mb-2 flex justify-between items-center gap-4">
        <div>
          <h1 className="m-0 font-semibold uppercase">Instagram Banners</h1>
        </div>
        <div className="flex gap-2">
          <div>
            {" "}
            <Link
              className="btn btn-sm"
              target="_blank"
              aria-label="Edit ig banner"
              href={`/admin/dashboard/ig-banners/`}
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
    </div>
  );
}
