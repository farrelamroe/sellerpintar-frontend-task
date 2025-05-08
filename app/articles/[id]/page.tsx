import Header from "@/components/Header";
import { Badge } from "@/components/Badge";
import { ArticlesType } from "@/types/ArticlesType";
import axios from "axios";
import Image from "next/image";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetails({ params }: ArticlePageProps) {
  const { id } = await params;

  const res = await axios.get(
    `https://test-fe.mysellerpintar.com/api/articles/`,
  );
  const allArticles: ArticlesType[] = res.data.data;

  const selectedArticle = allArticles.filter((item) => item.id === id);
  const recommendedArticles = allArticles
    .filter((item) => item.id !== id)
    .slice(0, 3);

  return (
    <div className="relative h-[100vh] w-[100vw]">
      <Header
        blueLogo={"/authLogo.svg"}
        whiteLogo={"/Logo.svg"}
        blueLogoStyle={""}
        whiteLogoStyle={"hidden"}
        nameStyle="text-black"
        containerStyle="relative border-b"
      />

      <article className="relative mt-[40px] h-full w-full">
        {selectedArticle.map((article, idx) => (
          <div key={idx} className="flex h-full w-full flex-col">
            <div className="mb-[20px] flex h-[10px] w-full items-center justify-center gap-[16px] text-[14px] font-medium text-slate-600 md:text-[14px]">
              <div>
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <span className="h-[4px] w-[4px] rounded-full bg-black"></span>
              <div>Created by {article.user.username}</div>
            </div>

            <div className="flex w-full flex-col gap-[24px]">
              <h1 className="w-full px-[48px] text-center text-[20px] font-semibold text-slate-900 md:text-[28px] lg:px-[280px]">
                {article.title}
              </h1>

              <div className="h-[180px] w-full justify-items-center lg:h-[360px]">
                <div className="relative h-[180px] w-[90vw] md:w-[70vw] lg:h-[360px] lg:w-[80vw]">
                  {article.imageUrl && (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>

              <p className="w-full px-[20px] text-[14px] text-slate-700 md:px-[120px] md:text-[16px]">
                {article.content}
              </p>
            </div>

            <h4 className="mt-[72px] mb-[20px] w-full px-[20px] text-left text-[18px] font-semibold text-slate-900 md:px-[112px]">
              Other articles
            </h4>

            <div className="relative grid h-full w-full grid-cols-1 justify-items-center px-[20px] lg:grid-cols-3">
              {recommendedArticles.map((article, idx) => (
                <div key={idx}>
                  <div className="flex h-[400px] w-full flex-col items-center justify-between lg:h-[640px]">
                    <div className="relative flex h-[210px] w-[85vw] flex-col gap-[8px] rounded-lg border bg-white md:h-[210px] md:w-[70vw] lg:h-[280px] lg:w-[320px]">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="rounded-lg"
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                    <div className="mt-[16px] flex h-[180px] w-[85vw] flex-col gap-[4px] md:h-[180px] md:w-[70vw] lg:h-[280px] lg:w-[320px]">
                      <p className="text-[12px] text-slate-600">
                        {new Date(article.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <h2 className="text-[20px] font-semibold text-slate-900">
                        {article.title}
                      </h2>
                      <p className="text-slate-600">
                        {article.content.length >= 10
                          ? article.content.slice(0, 70) + "..."
                          : article.content}
                      </p>
                      <div className="mt-[8px] mb-[40px] flex gap-[8px]">
                        <Badge className="bg-blue-200 text-blue-900">
                          {article.category.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}
