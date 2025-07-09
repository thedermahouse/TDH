import getPart from "@/helpers/getPart";
import MarqueeContentView from "./MarqueeContentView";
export default async function Marquee() {
  const { content } = await getPart("MARQUEE_STRIP");
  return (
    <section className="">
      <MarqueeContentView content={content} />
    </section>
  );
}
