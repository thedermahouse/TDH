import usePart from "@/hooks/usePart";
import rp from "@/lib/functions/rp";
import { BiPhoneCall } from "react-icons/bi";
import { FaAddressBook } from "react-icons/fa";
import { PiAddressBookTabs } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";

export default function TopNav() {
  const { part, setPart, SaveButton } = usePart("TOP_NAVIGATION");

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <label className="input w-full">
          <span>
            <TfiEmail />
          </span>
          <input
            type="email"
            className="grow"
            placeholder="Email Address"
            value={part?.email}
            onChange={(e) => {
              setPart((p) => {
                p.email = e.target.value;
                return rp(p);
              });
            }}
          />
        </label>
        <label className="input w-full">
          <span>
            <PiAddressBookTabs />
          </span>
          <input
            type="text"
            className="grow"
            placeholder="Address"
            value={part?.address}
            onChange={(e) => {
              setPart((p) => {
                p.address = e.target.value;
                return rp(p);
              });
            }}
          />
        </label>
        <label className="input w-full">
          <span>
            <PiAddressBookTabs />
          </span>
          <input
            type="text"
            className="grow"
            placeholder="Short Address"
            value={part?.shortAddress}
            onChange={(e) => {
              setPart((p) => {
                p.shortAddress = e.target.value;
                return rp(p);
              });
            }}
          />
        </label>
        <label className="input w-full">
          <span>
            <BiPhoneCall />
          </span>
          <input
            type="phone"
            className="grow"
            placeholder="Phone Number"
            value={part?.phone}
            onChange={(e) => {
              setPart((p) => {
                p.phone = e.target.value;
                return rp(p);
              });
            }}
          />
        </label>
      </div>
      <div className="flex justify-end py-2">
        <SaveButton />
      </div>
    </div>
  );
}
