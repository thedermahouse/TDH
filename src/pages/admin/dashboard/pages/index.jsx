import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import Link from "next/link";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";

function PagesHead({ put }) {
  const dialog = useDialogProvider();
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="font-semibold text-xl uppercase text-base-content">
        Pages
      </h1>
      <div>
        <button
          className="btn btn-accent btn-sm"
          type="button"
          onClick={() => {
            dialog({
              open: true,
              title: "Add New Page",
              form: [
                {
                  name: "title",
                  type: "text",
                  label: "Page Title",
                  placeholder: "Enter page title",
                  required: true,
                },
              ],
              onSubmit: ({ title }) => {
                put({
                  title,
                  slug: title.toLowerCase().replace(/\s/g, "-"),
                });
              },
            });
          }}
        >
          <span>
            <CiCirclePlus />
          </span>
          <span>New Page</span>
        </button>
      </div>
    </div>
  );
}

export default function index() {
  const { data, put } = useQuery("/api/pages");
  return (
    <div>
      <div className="bg-base-100 min-h-screen">
        <AdminPanelWrapper>
          <div>
            <PagesHead put={put} />
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Page Title</th>
                  <th>Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((p) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td>{p.slug}</td>
                      <td>
                        <div className="space-x-2">
                          <Link
                            href={`/admin/dashboard/pages/${p.id}/`}
                            className="btn btn-sm btn-primary btn-square"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AdminPanelWrapper>
      </div>
    </div>
  );
}
