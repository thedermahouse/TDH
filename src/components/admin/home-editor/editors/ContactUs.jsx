import usePart from "@/hooks/usePart";
import { BiPlus } from "react-icons/bi";

export default function ContactUs() {
  const { part, setPart, changed, SaveButton } = usePart("CONTACT_US");

  const addNewContact = (type) => {
    if (type === "phone") {
      setPart({
        ...part,
        contactPhone: [...(part?.contactPhone || []), { phone: "" }],
      });
    } else if (type === "email") {
      setPart({
        ...part,
        contactEmail: [...(part?.contactEmail || []), { email: "" }],
      });
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-end">
          <div>
            <SaveButton />
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="container">
        <div className="grid grid-cols-3 gap-5">
          {/* Phone Section */}
          <div className="w-full">
            <div className="font-medium mb-2">Call Us directly on</div>
            {(part?.contactPhone || []).map((phone, index) => (
              <div key={index} className="mb-4">
                <label className="input input-bordered w-full gap-3 flex items-center">
                  <span className="font-bold italic">Phone</span>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone.phone}
                    className="grow"
                    onChange={(e) => {
                      const contactPhone = [...(part?.contactPhone || [])];
                      contactPhone[index].phone = e.target.value;
                      setPart({ ...part, contactPhone });
                    }}
                  />
                </label>
              </div>
            ))}
            <button
              onClick={() => addNewContact("phone")}
              className="btn btn-sm w-full"
            >
              <BiPlus size={20} />
              <span>Add Phone</span>
            </button>
          </div>

          {/* Email Section */}
          <div className="w-full">
            <div className="font-medium mb-2">Write Email</div>
            {(part?.contactEmail || []).map((email, index) => (
              <div key={index} className="mb-4">
                <label className="input input-bordered w-full gap-3 flex items-center">
                  <span className="font-bold italic">Email</span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email.email}
                    className="grow"
                    onChange={(e) => {
                      const contactEmail = [...(part?.contactEmail || [])];
                      contactEmail[index].email = e.target.value;
                      setPart({ ...part, contactEmail });
                    }}
                  />
                </label>
              </div>
            ))}
            <button
              onClick={() => addNewContact("email")}
              className="btn btn-sm w-full"
            >
              <BiPlus size={20} />
              <span>Add Email</span>
            </button>
          </div>

          {/* Address Section */}
          <div className="w-full">
            <div className="font-medium mb-2">Address</div>
            <div className="mb-4">
              <textarea
                placeholder="Address"
                value={part?.contactAddress}
                rows={3}
                className="grow input w-full"
                onChange={(e) => {
                  setPart({ ...part, contactAddress: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
