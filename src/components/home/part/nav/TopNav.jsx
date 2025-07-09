import getPart from "@/helpers/getPart";
import React from "react";
import {
  PiMapPinAreaBold,
  PiPhoneCallBold,
  PiEnvelopeBold,
} from "react-icons/pi";

export default async function TopNav({ content }) {
  return (
    <div className="bg-dh-newsecondory">
      <div className="flex justify-between items-center container m-auto lg:px-0 p-2">
        <div className="flex items-center justify-between gap-3 grow text-xs text-white tracking-wider">
          <div className="items-center gap-2 flex">
            <span>
              <PiMapPinAreaBold />
            </span>
            <span className="text-nowrap lg:block hidden">
              {content?.address}
            </span>
            <span className="text-nowrap lg:hidden">
              {content?.shortAddress}
            </span>
          </div>
          <div className="flex lg:justify-end justify-between">
            <div className="flex items-center gap-2">
              <span>
                <PiPhoneCallBold />
              </span>
              <span>
                <a href={`tel:${content?.phone}`}>{content?.phone}</a>
              </span>
            </div>
            <div className="divider divider-horizontal after:bg-black before:bg-black px-0 mx-0 lg:block hidden"></div>
            <div className="items-center gap-2 overflow-hidden lg:grow-0 grow text-ellipsis lg:flex hidden">
              <span>
                <PiEnvelopeBold />
              </span>
              <span>
                <a href={`mailto:${content?.email}`}>{content?.email}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
