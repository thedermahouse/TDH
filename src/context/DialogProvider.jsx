import Img from "@/components/misc/Img";
import fileToB64 from "@/lib/functions/fileToB64";
import { createContext, useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const DialogProviderContext = createContext();

function Modal(props) {
  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const data = (props.form || []).map(({ name, value }) => ({ name, value }));
    const formKVP = {};

    data.forEach(({ name, value }) => {
      formKVP[name] = value;
    });
    setFormData(formKVP);
  }, [props.form]);

  const close = () => {
    setPreviews([]);
    setFormData({});
    props.setModalData({ ...props, open: false });
  };

  const disableButton = (props.form || [])
    .map(({ name, required }) => {
      return (
        !!required && (formData[name] === undefined || formData[name] === null)
      );
    })
    .includes(true);

  return (
    <div>
      <dialog
        id="my_modal_1"
        className={`modal ${props.open ? "modal-open" : ""} ${
          props.blur ? "filter backdrop-blur-sm" : ""
        }`}
      >
        <div
          className={`modal-box ${props.rounded ? "" : "rounded-none"} ${
            props.modalStyle || "bg-[#202020]"
          }`}
        >
          <div className="pb-1 mb-2 flex justify-between items-end">
            <h3 className="font-bold text-lg">{props.title || "Title"}</h3>
            <button
              className={`btn btn-sm text-lg btn-circle ${props.buttonProps}`}
              onClick={close}
            >
              <IoClose />
            </button>
          </div>
          <div className={`${props.innerStyle || "p-1"}`}>
            {props.content}
            {previews.map((p, i) => (
              <div
                className="w-full p-2 bg-gray-700 rounded-md ac"
                key={`preview-${i}`}
              >
                <Img src={p.data} width={200} alt="preview" />
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (props.onSubmit) {
                  props.onSubmit(formData);
                } else {
                }
                close();
              }}
            >
              <div className="mb-5">
                {props.form && (
                  <div className="flex flex-col gap-3">
                    {(props.form || []).map(
                      (
                        {
                          name,
                          type,
                          label,
                          optional = true,
                          placeholder,
                          options,
                          list,
                          multiple,
                          allowPreviews,
                          accept,
                          defaultValue,
                          disabled,
                          rows,
                        },
                        i
                      ) => {
                        if (type === "select") {
                          return (
                            <div
                              className="form-control"
                              key={`label-form-${i}`}
                            >
                              <label className={`label ${props.labelStyle}`}>
                                <span className="label-text font-semibold">
                                  {label}
                                  {optional ? " " : " *"}
                                </span>
                              </label>
                              <select
                                className={`select select-bordered ${props.inputStyle}`}
                                value={formData[name] || ""}
                                onChange={(e) => {
                                  setFormData((curr) => ({
                                    ...curr,
                                    [name]: e.target.value,
                                  }));
                                }}
                                multiple={multiple}
                                required={!optional}
                              >
                                <option disabled value="">
                                  Select
                                </option>
                                {(options || []).map((opt, idx) => {
                                  const val = opt.val ?? opt.value ?? "";
                                  const labelText =
                                    opt.option ?? opt.label ?? "";
                                  return (
                                    <option
                                      key={`option-${val || idx}`}
                                      value={val}
                                    >
                                      {labelText}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          );
                        } else if (type === "textarea") {
                          return (
                            <div
                              className="form-control"
                              key={`label-form-${i}`}
                            >
                              <label className={`label`}>
                                <span
                                  className={`label-text font-semibold ${props.labelStyle}`}
                                >
                                  {label}
                                  {optional ? "" : "*"}
                                </span>
                              </label>
                              <textarea
                                value={formData[name] || ""}
                                className={`textarea textarea-bordered ${props.inputStyle} w-full`}
                                placeholder={placeholder || label}
                                rows={rows || 5}
                                minLength={props.minLength || ""}
                                onChange={(e) => {
                                  setFormData((curr) => {
                                    return { ...curr, [name]: e.target.value };
                                  });
                                }}
                                required={!optional}
                              />
                            </div>
                          );
                        }
                        return (
                          <div
                            className="form-control flex flex-wrap"
                            key={`label-form-${i}`}
                          >
                            <label
                              className={`label ${props.labelStyle} w-full`}
                            >
                              <span
                                className={`label-text font-semibold ${props.labelStyle}`}
                              >
                                {label}
                                {optional ? "" : "*"}
                              </span>
                            </label>
                            <input
                              type={type || "text"}
                              placeholder={placeholder || label}
                              {...(multiple ? { multiple } : {})}
                              className={`${props.inputStyle} ${
                                type === "file"
                                  ? "file-input file-input-bordered w-full"
                                  : "input input-bordered w-full"
                              }`}
                              {...(list ? { list } : {})}
                              {...(accept ? { accept } : {})}
                              {...(defaultValue ? { defaultValue } : {})}
                              value={
                                type === "file" ? "" : formData[name] || ""
                              }
                              disabled={disabled || false}
                              onChange={async (e) => {
                                var { files, value } = e.target;

                                files = Array.from(files || []);
                                files = files.map(async (file) => {
                                  return await fileToB64(file);
                                });
                                files = await Promise.all(files);

                                if (allowPreviews) {
                                  setPreviews(files);
                                }

                                setFormData((curr) => {
                                  if (type === "file") {
                                    return {
                                      ...curr,
                                      [name]: files,
                                    };
                                  }

                                  return { ...curr, [name]: value };
                                });
                              }}
                              required={!optional}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
              {!props.hideFooter && (
                <div className="justify-end w-full flex gap-3">
                  <button
                    type="button"
                    className="btn btn-error btn-outline"
                    onClick={close}
                  >
                    Close
                  </button>
                  <button
                    className={`btn btn-success ${
                      disableButton && "pointer-events-none opacity-10"
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default function DialogProvider({ children }) {
  const [modal_data, setModalData] = useState({ open: false });
  return (
    <DialogProviderContext.Provider
      value={(dat) => {
        setModalData(() => {
          return { ...dat };
        });
      }}
    >
      {children}
      <Modal {...modal_data} setModalData={setModalData} />
    </DialogProviderContext.Provider>
  );
}

export const useDialogProvider = () => {
  return useContext(DialogProviderContext);
};
