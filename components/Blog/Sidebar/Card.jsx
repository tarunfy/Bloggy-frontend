import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Card = ({ article }) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Link href={article.url}>
        <li className="px-2 py-4 group cursor-pointer">
          <img
            src={article?.urlToImage}
            alt="img"
            className="w-full h-40 object-cover mb-2 rounded-md"
          />

          <a target="_blank">
            <p
              className={`text-sm ${
                colorMode === "light"
                  ? "group-hover:!text-[#313CB3]"
                  : "group-hover:!text-[#7f5dde]"
              }`}
            >
              {article.title}
            </p>
          </a>
        </li>
      </Link>
    </>
  );
};

export default Card;
