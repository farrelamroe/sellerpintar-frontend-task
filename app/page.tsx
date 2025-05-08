import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Buttons";


const heroButtons = [
  { label: "Register", link: "/auth/register" },
  { label: "Login", link: "/auth/login" },
];

export default function Homepage() {
  return (
    <div className="h-screen w-screen">
      <section className="relative h-full w-full">
        {/* Background Image */}
        <div className="absolute z-0 h-screen w-screen">
          <Image src={"/hero.jpg"} fill alt="Hero Banner" />
        </div>

        {/* Overlay */}
        <div className="absolute h-screen w-screen bg-[#2563EBDB]" />

        {/* Header / Logo */}
        <header className="absolute inset-0 z-30 flex h-[10vh] w-full items-center justify-center px-[40px] py-[20px]">
          <span className="mt-[48px]">
            <img className="md:scale-[1.4]" src="/Logo.svg" alt="" />
          </span>
        </header>

        {/* Hero Content */}
        <section className="relative flex h-full flex-col items-center justify-center gap-[8px] px-[40px] text-center text-white md:gap-[16px] md:px-[160px] lg:gap-[8px] lg:px-[360px]">
          <span className="text-[12px] font-semibold md:text-[16px]">
            Blog genzet
          </span>
          <h1 className="text-[20px] font-semibold md:text-[32px]">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <h2 className="text-[12px] font-normal md:text-[16px]">
            Your daily dose of design insights!
          </h2>

          {/* Buttons */}
          <div className="mt-[40px] flex gap-[20px]">
            {heroButtons.map((btn, idx) => (
              <Link key={idx} href={btn.link}>
                <Button
                  className="bg-transparent px-[40px] text-[12px] md:px-[72px] md:py-[24px] md:text-[14px]"
                  variant={"outline"}
                >
                  {btn.label}
                </Button>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
