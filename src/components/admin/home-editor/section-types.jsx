import Marquee from "@/components/home/sections/Marquee";
import Header from "./editors/Header";
import MarqueeEditor from "./editors/Marquee";
import SectionTypeSelector from "./editors/SectionTypeSelector";
import HeaderView from "@/components/home/sections/header/Header";
import AboutUs from "./editors/AboutUs";
import AboutUsView from "@/components/home/sections/AboutUs";
import ImageBanner from "./editors/ImageBanner";
import ImageBannerView from "@/components/home/sections/ImageBanner";
import ServiceDisplay from "./editors/ServiceDisplay";
import ServiceDisplayView from "@/components/home/sections/ServiceDisplay";
import Testimonials from "./editors/Testimonials";
import TestimonialsView from "@/components/home/sections/Testimonials";
import InstagramBanners from "./editors/InstagramBanners";
import InstagramBannersView from "@/components/home/sections/InstagramBanners";
import ContentSectionEditor from "./editors/ContentSectionEditor";
import TitleSectionEditor from "./editors/TitleSectionEditor";
import ContentSectionView from "@/components/home/sections/ContentSectionView";
import TitleSectionView from "@/components/home/sections/TitleSectionView";
import KnowYourDoctor from "./editors/KnowYourDoctor";
import KnowYourDoctorView from "@/components/home/sections/KnowYourDoctor";
import TitleDescriptionSection from "@/components/home/sections/TitleDescriptionSection";
import TitleDescriptionEditor from "./editors/TitleDescriptionEditor";
import IconAndHeading from "./editors/IconAndHeading";
import IconAndHeadSection from "@/components/home/sections/IconAndHeadSection";
import EquipmentVisitEditor from "./editors/EquipmentUsedEditor";
import EquipmentVisitSection from "@/components/home/sections/EquipmentUsedSection";
import GallerySection from "@/components/home/sections/GallerySection";
import GalleryEditor from "./editors/GalleryEditor";
import VideoSectionEditor from "./editors/VideoSectionEditor";
import VideoSection from "@/components/home/sections/VideoSection";
import LogoEditor from "./editors/LogoEditor";
import LogosView from "@/components/home/sections/LogosView";
import AboutUsHeaderEditor from "./editors/AboutUsHeaderEditor";
import AboutUsHeaderView from "@/components/home/sections/AboutUsHeaderView";
import ServiceShowcaseEditor from "./editors/ServiceShowcaseEditor";
import ServiceShowcase from "@/components/home/sections/ServiceShowcase";
import LandingTestimonialsBannerEditor from "./editors/LandingTestimonialsBannerEditor";
import LandingTestimonialsBanner from "@/components/home/sections/LandingTestimonialsBanner";
import BeforeAfterProgressionEditor from "./editors/BeforeAfterProgressionEditor";
import BeforeAfterProgression from "@/components/home/sections/BeforeAfterProgression";

const UnknownSection = () => <div>Unknown Section</div>;

const homeSectionTypes = {
  header: { admin: Header, home: HeaderView },
  marquee: { admin: MarqueeEditor, home: Marquee },
  "about-us": { admin: AboutUs, home: AboutUsView },
  "image-banner": { admin: ImageBanner, home: ImageBannerView },
  "service-display": { admin: ServiceDisplay, home: ServiceDisplayView },
  services2: { admin: ServiceShowcaseEditor, home: ServiceShowcase },
  testimonials: { admin: Testimonials, home: TestimonialsView },
  "landing-testimonials": {
    admin: LandingTestimonialsBannerEditor,
    home: LandingTestimonialsBanner,
  },
  video: <></>,
  "follow-us": { admin: InstagramBanners, home: InstagramBannersView },
  "before-after-progression": {
    admin: BeforeAfterProgressionEditor,
    home: BeforeAfterProgression,
  },
  "content-section": {
    admin: ContentSectionEditor,
    home: ContentSectionView,
  },
  "title-section": {
    admin: TitleSectionEditor,
    home: TitleSectionView,
  },
  "title-description": {
    admin: TitleDescriptionEditor,
    home: TitleDescriptionSection,
  },
  "about-us-header": {
    admin: AboutUsHeaderEditor,
    home: AboutUsHeaderView,
  },
  "icon-and-heading": { admin: IconAndHeading, home: IconAndHeadSection },
  // "gallery-section": { admin: GalleryEditor, home: GallerySection },
  "equipment-Used": {
    admin: EquipmentVisitEditor,
    home: EquipmentVisitSection,
  },
  "know-your-doctor": {
    admin: KnowYourDoctor,
    home: KnowYourDoctorView,
  },
  "video-section": { admin: VideoSectionEditor, home: ImageBannerView },
  "logo-section": { admin: LogoEditor, home: LogosView },

  "": { admin: SectionTypeSelector, home: UnknownSection },
};

export default homeSectionTypes;
