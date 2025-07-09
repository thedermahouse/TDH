import Link from "next/link";
import { TbAlignBoxLeftBottom, TbMessageCircleQuestion } from "react-icons/tb";
import { IoIosCog } from "react-icons/io";
import { TbSection } from "react-icons/tb";
import { PiSuitcaseLight } from "react-icons/pi";
import { TfiGallery, TfiParagraph } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { CgCalendarTwo, CgInstagram } from "react-icons/cg";
import { useRouter } from "next/router";
import { PiBookBookmarkLight } from "react-icons/pi";
import { TbHeartQuestion } from "react-icons/tb";
import { RiBloggerLine } from "react-icons/ri";

export default function Sidebar({}) {
  const router = useRouter();
  return (
    <div className="h-full">
      <div className="bg-accent h-full flex flex-col bg-gray-900">
        <div className="aspect-square flex items-center justify-center bg-base-200 text-white font-black">
          DH
        </div>
        <div className="grow flex flex-col">
          {[
            {
              name: "Navigation",
              href: "/admin/dashboard/navigation",
              icon: <CgCalendarTwo />,
            },
            {
              name: "Home Sections",
              href: "/admin/dashboard/home_sections",
              icon: <TbSection />,
            },
            {
              name: "Footer",
              href: "/admin/dashboard/footer",
              icon: <TbAlignBoxLeftBottom />,
            },
            {
              name: "Services",
              href: "/admin/dashboard/services",
              icon: <PiSuitcaseLight />,
            },
            {
              name: "Blogs",
              href: "/admin/dashboard/blogs",
              icon: <RiBloggerLine />,
            },
            {
              name: "About Us",
              href: "/admin/dashboard/about_us_sections",
              icon: <TbHeartQuestion />,
            },
            {
              name: "Marquee Strip",
              href: "/admin/dashboard/marquee",
              icon: <PiBookBookmarkLight />,
            },
            {
              name: "Testimonials",
              href: "/admin/dashboard/testimonials",
              icon: <HiOutlineChatBubbleBottomCenterText />,
            },
            {
              name: "Instagram Banners",
              href: "/admin/dashboard/ig-banners",
              icon: <CgInstagram />,
            },
            {
              name: "Enquiries",
              href: "/admin/dashboard/enquiries",
              icon: <TbMessageCircleQuestion />,
            },
            {
              name: "Media",
              href: "/admin/dashboard/media",
              icon: <TfiGallery />,
            },
            {
              name: "Pages",
              href: "/admin/dashboard/pages",
              icon: <TfiParagraph />,
            },
            {
              name: "Settings",
              href: "/admin/dashboard/settings",
              icon: <IoIosCog />,
            },
          ].map((item) => {
            const active = router.pathname.startsWith(item.href);
            const activeClass = active ? "btn-active hover:bg-gray-900" : "";
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`p-2 btn rounded-none text-3xl relative transition-all duration-300 grow ${activeClass}`}
                aria-label="Go to "
              >
                <span>{item.icon}</span>
                <span
                  className="tooltip tooltip-right absolute top-0 left-0 right-0 bottom-0 m-auto block z-10"
                  data-tip={item.name}
                ></span>
              </Link>
            );
          })}
        </div>
        <div>
          <button className="p-2 btn btn-error rounded-none text-3xl relative hover:rounded-3xl transition-all duration-300">
            <span>
              <IoIosLogOut />
            </span>
            <span
              className="tooltip tooltip-right absolute top-0 left-0 right-0 bottom-0 m-auto block z-10"
              data-tip={"Logout"}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}
