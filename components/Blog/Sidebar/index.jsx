import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import NewsCardSkeleton from "../../../skeletons/NewsCardSkeleton";
import Card from "./Card";

const Sidebar = () => {
  const [news, setNews] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    async function getNews() {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.API_KEY}`
      );

      const data = await res.json();

      setNews(data?.articles?.slice(0, 5));
    }

    getNews();
  }, []);

  return (
    <div
      className={`flex max-w-sm items-start  flex-col border-[1px] rounded-lg ${
        colorMode === "light"
          ? "!border-gray-300 !bg-white/50"
          : "!border-gray-50/70 !bg-[#2D3748]/50"
      }`}
    >
      <div className="p-2">
        <h1 className="text-xl font-semibold">Latest tech news 👨‍💻</h1>
      </div>
      <ul
        className={`divide-y w-full ${
          colorMode === "light" ? "divide-gray-300" : "divide-gray-100/50"
        }`}
      >
        {news ? (
          news?.map((article, index) => <Card key={index} article={article} />)
        ) : (
          <div className="w-full">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
