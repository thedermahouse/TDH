import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import Head from "next/head";
import { useQuery } from "@/hooks/useQuery";
import { useState, useRef, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import MediaUploader from "@/components/admin/components/media/MediaUploader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useInView } from "react-intersection-observer";
import MediaItem from "@/components/admin/components/media/MediaItem";
import dynamic from "next/dynamic";

const CMasonry = dynamic(
  () => import("@/components/admin/components/Masonry"),
  {
    ssr: false,
  }
);

export default function Media() {
  const [page, setPage] = useState(1);
  const [media, setMedia] = useState([]);
  const [stopLoading, setStopLoading] = useState(false);
  const [sQuery, setSQuery] = useState("");

  const { data, refetch, isLoading } = useQuery(`/api/files/?page=${page}`);
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (data) {
      setMedia((prevItems) => [...prevItems, ...data]);
      if (data.length === 0) {
        setStopLoading(true);
      }
    }
  }, [data, stopLoading]);

  useEffect(() => {
    if (inView && !isLoading && !stopLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, stopLoading]);

  return (
    <AdminPanelWrapper>
      <Head>
        <title>Admin | Media</title>
      </Head>
      <div className="">
        <label className="input flex items-center gap-2 rounded-none top-0 left-12 right-0 fixed z-10">
          <span>
            <BiSearch />
          </span>
          <input
            type="text"
            className="grow"
            placeholder="Type to Search"
            onChange={(e) => setSQuery(e.target.value)}
            value={sQuery}
          />
        </label>
      </div>
      <div>
        <MediaUploader
          refetch={refetch}
          setPage={setPage}
          setMedia={setMedia}
          setStopLoading={setStopLoading}
        />
      </div>
      <div className="w-full">
        <CMasonry>
          {media ? (
            media
              .sort((a, b) => b.id - a.id)
              .filter((media) =>
                media.filename.toLowerCase().includes(sQuery.toLowerCase())
              )
              .map((media, i) => (
                <MediaItem
                  key={`${media.id}/${i}`}
                  media={media}
                  url={`/api/files/${media.id}`}
                />
              ))
          ) : (
            <div className="w-full p-3">No Media Found</div>
          )}
        </CMasonry>
      </div>
      <div ref={ref}>
        {isLoading && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </AdminPanelWrapper>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/account/signin",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }
