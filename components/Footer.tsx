import Image from "next/image";

export default function Footer() {
    return (
      <div className="relative h-[100px] bg-[#2563EBDB]">
        <div className="relative flex h-full w-full flex-row items-center justify-center gap-[16px]">
          <Image src="/Logo.svg" alt="logo" width={133.4} height={24} />
          <p className="text-[16px] leading-[24px] text-white">
            © 2025 Blog genzet. All rights reserve
          </p>
        </div>
      </div>
    );
}