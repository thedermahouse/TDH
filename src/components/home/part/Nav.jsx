import getPart from "@/helpers/getPart";
import NavContent from "./nav/NavContent";
import TopNav from "./nav/TopNav";

export default async function Nav() {
  const navigation = (await getPart("NAVIGATION")) || {};
  const topNavigation = (await getPart("TOP_NAVIGATION")) || {};
  const { content = [] } = navigation;
  const { content: top = {} } = topNavigation;

  return (
    <>
      <nav className="lg:fixed sticky top-0 right-0 left-0 z-40">
        {/* navok */}
        <TopNav content={top} />
        <NavContent content={content} />
      </nav>
    </>
  );
}
