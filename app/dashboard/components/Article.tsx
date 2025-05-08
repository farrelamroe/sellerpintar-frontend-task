"use client";

import { useState } from "react";
import AdminHeader from "./Header";
import {
  DropdownRoot,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from "@/components/Dropdown";
import { Input } from "@/components/Inputs";
import { ArrowLeft, ImagePlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/Buttons";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface ArticleFormInput {
  file?: File;
  title: string;
  category: string;
}

export default function ArticleManagerPage() {
  const [activePage, setActivePage] = useState<
    "main" | "Add Article" | "Edit Article" | "Delete Article"
  >("main");

  const { register, handleSubmit, setValue } = useForm<ArticleFormInput>();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const switchPage = (
    destination: "main" | "Add Article" | "Edit Article" | "Delete Article",
  ) => {
    setActivePage(destination);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      const fileUrl = URL.createObjectURL(selected);
      setThumbnailPreview(fileUrl);
      setValue("file", selected);
    }
  };

  const handleFormSubmit: SubmitHandler<ArticleFormInput> = (data) => {
    console.log("form data", data);
    if (data.file) {
      console.log("Uploaded file:", data.file);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <AdminHeader currentPage="Article" />

      {activePage === "main" && (
        <section className="mt-[40px] flex h-[25vh] w-[80vw] flex-col rounded-[8px] border border-slate-200 bg-gray-50">
          <div className="flex h-[10vh] w-full items-center border-b border-slate-200 px-[16px] text-[14px] font-medium">
            Total Articles:
          </div>
          <div className="flex h-[15vh] w-full items-center justify-between px-[16px]">
            <div className="flex items-center gap-[8px]">
              <div>
                <DropdownRoot>
                  <DropdownTrigger>
                    <DropdownValue placeholder="Category" />
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownItem value="s">asa</DropdownItem>
                  </DropdownContent>
                </DropdownRoot>
              </div>
              <div className="relative flex items-center">
                <Search
                  size={18}
                  color="#94A3B8"
                  className="absolute translate-x-[8px]"
                />
                <Input placeholder="Search by title" className="pl-[32px]" />
              </div>
            </div>

            <div>
              <Button
                onClick={() => switchPage("Add Article")}
                className="bg-blue-600 text-[14px] font-medium text-white hover:bg-blue-700"
              >
                <Plus size={18} color="#F8FAFC" />
                Add Articles
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ADD ARTICLE SECTION */}
      {activePage === "Add Article" && (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-[40px] flex h-auto w-[80vw] flex-col rounded-[8px] border border-slate-200 bg-gray-50"
        >
          <div className="w-fit">
            <Button
              onClick={() => switchPage("main")}
              className="bg-transparent text-black hover:bg-transparent"
              type="button"
            >
              <ArrowLeft color="black" className="translate-y-[2px]" />
              Create Articles
            </Button>
          </div>

          {/* Thumbnail Upload */}
          <div className="mt-[40px] flex w-full flex-col gap-[4px] px-[16px]">
            <div className="text-[14px] font-medium">Thumbnails</div>
            <div className="relative h-[25vh] w-[15vw] rounded-[8px] border-[1.5px] border-dashed border-slate-300 bg-white">
              <label
                className="flex h-full w-full cursor-pointer flex-col"
                htmlFor="files"
              >
                {thumbnailPreview ? (
                  <Image src={thumbnailPreview} fill alt="Preview" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-[4px]">
                    <ImagePlus size={20} color="#64748B" />
                    <span className="w-fit text-[12px] text-slate-500 underline">
                      Click to select files
                    </span>
                    <span className="w-fit text-[12px] text-slate-500">
                      Support File Type : jpg or png
                    </span>
                  </div>
                )}
                <Input
                  id="files"
                  type="file"
                  className="hidden"
                  {...register("file")}
                  onChange={onFileChange}
                />
              </label>
            </div>

            <div className="mt-[16px] w-full">
              <label htmlFor="" className="text-[14px] font-medium">
                Title
              </label>
              <Input placeholder="Title" {...register("title")} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
