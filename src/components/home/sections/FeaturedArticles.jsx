import db from "@/lib/db";
import FeaturedArticlesContent from "./FeaturedArticlesContent";

const get_articles = async () => {
  return db.featuredArticle.findMany({
    orderBy: { priority: "asc" },
  });
};

export default async function FeaturedArticlesView() {
  const articles = await get_articles();
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto">
        <FeaturedArticlesContent articles={articles} />
      </div>
    </div>
  );
}
    