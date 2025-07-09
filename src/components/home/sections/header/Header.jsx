import HeaderSlider from "../Slider";
import Marquee from "../Marquee";
import HeaderContent from "./HeaderContent";

export default function HeaderView({ section }) {
  return (
    <div className="lg:h-screen   w-full">
      <header className="relative header ">
        <div className="w-full ">
          <div className="lg:h-[calc(100dvh-5rem)]">
            <HeaderSlider section={section} />
          </div>
          <Marquee section={section} />
        </div>
        <HeaderContent section={section} />
      </header>
    </div>
  );
}
