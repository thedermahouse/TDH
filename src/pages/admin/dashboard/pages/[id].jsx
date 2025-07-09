import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import Jodit from "@/components/admin/editor/Jodit";
import usePage from "@/hooks/usePage";
import rp from "@/lib/functions/rp";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function Page({ id }) {
  const { part, setPart, isLoading, changed, SaveButton } = usePage(id);
  return (
    <div>
      <div>
        <div className="top-0 sticky bg-gray-900 py-4 z-10">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-xl">Edit {part?.title}</h1>
            </div>
            <div className="flex gap-3">
              <Link
                className="btn btn-sm btn-accent"
                href={`/pages/${part?.slug}`}
                target="_blank"
              >
                <span>Preview</span>
                <span>
                  <FaExternalLinkAlt />
                </span>
              </Link>
              <SaveButton />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="input input-sm w-full ac">
                <span>
                  <span>Title</span>
                </span>
                <input
                  type="text"
                  placeholder="Title"
                  value={part?.title}
                  onChange={(e) =>
                    setPart((p) => {
                      p.title = e.target.value;
                      return rp(p);
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-sm w-full ac">
                <span>
                  <span>Slug</span>
                </span>
                <input
                  type="text"
                  placeholder="Slug"
                  value={part?.slug}
                  onChange={(e) =>
                    setPart((p) => {
                      p.slug = e.target.value;
                      return rp(p);
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label className="input input-sm w-full ac">
                <span>
                  <span>Meta Image</span>
                </span>
                <input
                  type="text"
                  placeholder="Meta Image"
                  value={part?.meta_image}
                  onChange={(e) =>
                    setPart((p) => {
                      p.meta_image = e.target.value;
                      return rp(p);
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <textarea
              value={part?.description}
              placeholder="Description"
              className="textarea textarea-sm w-full"
              onChange={(e) =>
                setPart((p) => {
                  p.description = e.target.value;
                  return rp(p);
                })
              }
            ></textarea>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <Jodit
              height={600}
              content={part?.content}
              setContent={(content) =>
                setPart((p) => {
                  p.content = content;
                  return rp(p);
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Slug() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div>{id && <Page id={id} />}</div>
      </AdminPanelWrapper>
    </div>
  );
}
