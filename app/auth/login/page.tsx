"use client";

import Image from "next/image";
import { Input } from "@/components/Inputs";
import { Button } from "@/components/Buttons";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { UsersType } from "@/types/UserType";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username field cannot be empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginSchema = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const route = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
    // Check local storage for validation
    const users: UsersType[] = JSON.parse(
      localStorage.getItem("users") || "[]",
    );
    const user = users.find(
      (u) => u.username === data.username && u.password === data.password,
    );

    if (user) {
      console.log(`benar`);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (user.roles === "Admin") {
        route.push("/dashboard");
      } else {
        route.push("/articles");
      }
    } else {
      console.log("Salah");
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-[#F3F4F6]">
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-[40px] rounded-lg md:h-[35vh] md:w-[640px] md:bg-white lg:h-[60vh] lg:w-[512px]">
        <div className="relative h-[15vh] w-[640px] translate-y-[56px] md:h-[5vh] md:w-[480px] md:translate-y-[24px]">
          <Image src={"/authLogo.svg"} fill alt="Auth Logo" />
        </div>

        <form
          className="flex w-full flex-col gap-[8px] px-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="">Username</label>
            <Input
              {...register("username", { required: true })}
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-[12px] text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="">Password</label>
            <Input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-[12px] text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="mt-[24px] w-full bg-blue-600 font-normal"
          >
            Login
          </Button>
        </form>

        <span className="-translate-y-[20px] text-[12px]">
          Dont have an account?
          <Link className="pl-[4px] text-blue-500" href={"/auth/register"}>
            Register
          </Link>
        </span>
      </div>
    </main>
  );
}
