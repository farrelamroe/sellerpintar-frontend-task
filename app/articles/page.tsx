"use client";

import Header from "@/components/Header";
import {
  DropdownRoot,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from "@/components/Dropdown";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/Inputs";
import type { ArticlesType } from "@/types/ArticlesType";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PaginationWrapper,
  PaginationList,
  PaginationListItem,
  PageLink,
  NextPageButton,
  PreviousPageButton,
} from "@/components/Paginations";
import { Badge } from "@/components/Badge";
import { useRouter } from "next/navigation";

type SearchInput = {
  query: string;
};

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticlesType[]>([]);
  const { register, handleSubmit } = useForm<SearchInput>();
  const [displayedArticles, setDisplayedArticles] = useState<ArticlesType[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const router = useRouter();

  useEffect(() => {
    axios.get("https://test-fe.mysellerpintar.com/api/articles").then((res) => {
      setArticles(res.data.data || []);
      setDisplayedArticles(res.data.data || []);
    });

    const handleResize = () => {
      const isMobile = window.innerWidth >= 1080;
      setItemsPerPage(isMobile ? 9 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  const totalPage = Math.ceil(displayedArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginationArticles = displayedArticles.slice(startIndex, endIndex);

  const filterByCategory = (category: string) => {
    const filterCategory = articles.filter(
      (art) => art.category.name === category,
    );
    setDisplayedArticles(filterCategory);
  };

  const searchArticle = (query: string) => {
    const search = articles.filter((art) =>
      art.title.toLowerCase().includes(query.toLowerCase()),
    );
    setDisplayedArticles(search);
  };

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    searchArticle(data.query);
  };

  const handleArticleDetails = (id: string) => {
    router.push(`/articles/${id}`);
  };

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div className="absolute z-0 h-[700px] w-full">
        <Image src="/hero.jpg" fill alt="Young Man" />
      </div>
      <div className="absolute h-[700px] w-[100vw] bg-[#2563EBDB]" />

      <Header
        blueLogo="/authLogo.svg"
        whiteLogo="/Logo.svg"
        blueLogoStyle=""
        whiteLogoStyle="hidden md:block"
        nameStyle="text-white"
      />

      <section
        id="articleList"
        className="relative flex h-[800px] w-full flex-col items-center justify-center gap-[40px]"
      >
        <div className="w-full px-[40px] text-center text-white md:space-y-2 md:px-[72px] lg:px-[292px]">
          <p className="text-[12px] font-semibold">Blog genzet</p>
          <h1 className="text-[40px] font-medium">
            The Journal : Design Resources,Interviews, and Industry News
          </h1>
          <p className="text-[20px]">Your daily dose of design insights!</p>
        </div>

        <div className="relative flex h-[120px] w-[90vw] flex-col items-center justify-center gap-[16px] rounded-[8px] bg-blue-500 px-[16px] md:h-[100px] md:w-[52vw] lg:h-[80px] lg:w-[50vw] lg:flex-row">
          <div className="relative w-[85vw] md:w-[50vw] lg:w-[240px]">
            <DropdownRoot onValueChange={(value) => filterByCategory(value)}>
              <DropdownTrigger className="w-[85vw] bg-white md:w-[50vw] lg:w-[240px]">
                <DropdownValue placeholder="Select Category" />
              </DropdownTrigger>
              <DropdownContent>
                {articles.map((art, index) => (
                  <DropdownItem
                    key={index}
                    value={art.category.name}
                    onClick={() => filterByCategory(art.category.name)}
                  >
                    {art.category.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </DropdownRoot>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-[85vw] items-center md:w-[50vw] lg:w-[480px]"
          >
            <Search
              size={20}
              color="#94A3B8"
              className="absolute translate-x-[8px]"
            />
            <Input
              {...register("query")}
              placeholder="Search Articles"
              className="bg-white pl-[36px]"
            />
          </form>
        </div>
      </section>

      <section className="h-full w-full px-[40px]">
        <div>
          <p>
            Showing {paginationArticles.length} of {articles.length} articles
          </p>
        </div>

        <div className="relative mt-[40px] grid h-full w-full grid-cols-1 justify-items-center lg:grid-cols-3">
          {paginationArticles.map((a, idx) => (
            <div
              onClick={() => handleArticleDetails(a.id)}
              key={idx}
              className="flex h-[500px] w-full flex-col items-center justify-between lg:h-[800px]"
            >
              <div className="relative flex h-[300px] w-[85vw] flex-col gap-[8px] rounded-[8px] border bg-white md:h-[300px] md:w-[70vw] lg:h-[350px] lg:w-[320px]">
                {a.imageUrl ? (
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    className="rounded-[8px]"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <div className="mt-[16px] flex h-[300px] w-[85vw] flex-col gap-[4px] md:h-[300px] md:w-[70vw] lg:h-[350px] lg:w-[320px]">
                <p className="text-[12px] text-slate-600">
                  {new Date(a.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="text-[20px] font-semibold text-slate-900">
                  {a.title}
                </h2>
                <p className="text-slate-600">
                  {a.content.length >= 10
                    ? a.content.slice(0, 70) + "..."
                    : a.content}
                </p>
                <div className="mt-[8px] mb-[40px] flex gap-[8px]">
                  <Badge className="bg-blue-200 text-blue-900">
                    {a.category.name}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PaginationWrapper className="relative mt-[380px] md:mt-[540px] lg:mt-[1400px]">
          <PaginationList>
            <PaginationListItem>
              <PreviousPageButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                href="#"
              />
            </PaginationListItem>
            {Array.from({ length: totalPage }, (_, i) => (
              <PaginationListItem key={i}>
                <PageLink
                  isSelected={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  href=""
                >
                  {i + 1}
                </PageLink>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <NextPageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                }
                href=""
              />
            </PaginationListItem>
          </PaginationList>
        </PaginationWrapper>
      </section>
    </div>
  );
}
