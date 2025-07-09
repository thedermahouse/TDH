import Link from "next/link";
import { TbEdit, TbTrash } from "react-icons/tb";

export default function MarqueeEditor({ section, setSection }) {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">MARQUEE STRIP</div>
          </div>
          <div className="flex gap-2">
            <Link
              className="btn btn-sm"
              target="_blank"
              aria-label="Edit ig banner"
              href={`/admin/dashboard/marquee/`}
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
    </>
  );
}
