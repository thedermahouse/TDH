import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function CMasonry({ children }) {
  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 5,
          1200: 6,
          2000: 10,
        }}
      >
        <Masonry className="w-full">{children}</Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
