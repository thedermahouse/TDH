import Img from "@/components/misc/Img";
import getPart from "@/helpers/getPart";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const LinkSection = ({ links, notSocial, isLocation }) => {
  const iconMap = {
    facebook: <FaFacebook className="text-xl" />,
    twitter: <FaTwitter className="text-xl" />,
    instagram: <FaInstagram className="text-xl" />,
    linkedin: <FaLinkedin className="text-xl" />,
    youtube: <FaYoutube className="text-xl" />,
  };

  return (
    <div className="text-sm">
      {notSocial ? (
        links.map((link, i) => (
          <div key={i} className="mb-2 hover:text-dh-s">
            <Link
              href={link.url || "/"}
              key={i}
              target={isLocation ? "_blank" : "_self"}
            >
              {link.name}
            </Link>
          </div>
        ))
      ) : (
        <div className="flex gap-3 justify-center lg:justify-start">
          {links?.map((link, i) => (
            <Link
              href={link.url || "/"}
              key={i}
              target="_blank"
              className="flex items-center gap-2 hover:text-dh-s"
            >
              {iconMap[link.name.toLowerCase()] || null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const NavLinkSection = ({ section }) => {
  if (section.isVisible === false) return null;

  return (
    <div className="w-full text-center lg:text-start">
      <div>
        <div className="mb-2">
          <h2 className="text-dh-s font-bold">
            <Link href={section.link || "/"}>{section.title}</Link>
          </h2>
        </div>
        {section.sub_links && section.sub_links.length > 0 && (
          <div className="text-sm">
            {section.sub_links.map((subLink, i) => (
              <div key={i} className="mb-2 hover:text-dh-s">
                <Link href={subLink.link || "/"}>{subLink.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FooterSection = ({ section }) => {
  const linkSection = section.type === "links";
  const notSocial = section?.content !== "Social Media";
  const isLocation =
    section?.title === "Loction" || section?.title === "Location";

  return (
    <div className="w-full text-center lg:text-start">
      <div>
        <div className="mb-2">
          {notSocial && (
            <h2 className="text-dh-s font-bold">{section?.title}</h2>
          )}
        </div>
        <div>
          {linkSection ? (
            <LinkSection
              links={section?.links}
              notSocial={notSocial}
              isLocation={isLocation}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default async function Footer2() {
  const footerPart = await getPart("FOOTER");
  if (!footerPart) {
    console.error("FOOTER content not found");
    return null; // or fallback UI / error component
  }
  const { content } = footerPart;
  const navigationData = await getPart("NAVIGATION");

  const socialSection = content?.sections?.find(
    (section) => section.content === "Social Media"
  );

  const navSection = content?.sections?.find(
    (section) => section.type === "Nav"
  );

  const locationSection = content?.sections?.find(
    (section) => section.title === "Loction" || section.title === "Location"
  );

  const helpSection = content?.sections?.find(
    (section) => section.title === "Help" || section.content === "Help"
  );

  const navLinks = navSection?.links?.filter(
    (link) => link.isVisible !== false
  );

  const otherSections = content?.sections?.filter(
    (section) =>
      section.content !== "Social Media" &&
      section.type !== "Nav" &&
      section.title !== "Help" &&
      section.title !== "Loction" &&
      section.title !== "Location" &&
      section.content !== "Help"
  );

  const combinedSections = [];

  if (navLinks && navLinks.length > 0) {
    navLinks.forEach((navLink) => {
      combinedSections.push({
        type: "nav",
        data: navLink,
      });
    });
  }

  if (otherSections && otherSections.length > 0) {
    otherSections.forEach((section) => {
      combinedSections.push({
        type: "section",
        data: section,
      });
    });
  }

  return (
    <footer className="min-h-96 bg-black w-full ac">
      <div className="pt-24 text-center text-white container   lg:px-0 px-12">
        <div className="pt-24 text-center text-white  flex lg:px-0 px-12">
          <div className="w-1/4 ac mb-12">
            <div>
              <Img
                src="/logo.svg"
                alt="Footer Image"
                className="invert h-36 aspect-square"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-24 gap-12">
            {/* Navigation Links */}
            {combinedSections.map((item, i) =>
              item.type === "nav" ? (
                <NavLinkSection section={item.data} key={`nav-${i}`} />
              ) : (
                <FooterSection section={item.data} key={`section-${i}`} />
              )
            )}

            <div className="flex flex-col gap-8">
              {helpSection && (
                <FooterSection section={helpSection} key="help-section" />
              )}

              {locationSection && (
                <FooterSection
                  section={locationSection}
                  key="location-section"
                />
              )}
            </div>
          </div>
          <div className="w-1/4 ac mb-12">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.602800496804!2d72.83463440000001!3d19.0811936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93bef0a0bed%3A0xe066700a417e5635!2sThe%20Derma%20House%3A%20Best%20Dermatologist%20Clinic%20in%20Mumbai%20By%20Dr.%20Manu%20S.%20Walia%20M.D!5e0!3m2!1sen!2sin!4v1755275070453!5m2!1sen!2sin"
                width="400px"
                height="400px"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="py-12"></div>
        <div>
          <hr className="bg-white" />
          <div className="py-3 text-xs flex flex-col md:flex-row md:justify-between gap-4">
            <div className="text-center md:text-left">
              Copyright © 2025 TheDermaHouse - All rights reserved. | Developed
              by{" "}
              <Link
                href="https://adatechnologies.com"
                target="_blank"
                className=""
              >
                AdaTechnologies
              </Link>
            </div>
            {socialSection && (
              <div className="flex justify-center md:justify-end">
                <LinkSection links={socialSection.links} notSocial={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
