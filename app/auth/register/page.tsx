"use client";

import Image from "next/image";
import { z } from "zod";
import { Input } from "@/components/Inputs";
import {
  DropdownRoot,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownValue,
} from "@/components/Dropdown";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Buttons";
import Link from "next/link";
import { setUser } from "@/lib/localStorage";
import { UsersType } from "@/types/UserType";
import { useRouter } from "next/navigation";

const RolesEnum = z.enum(["User", "Admin"]);
type RolesEnum = z.infer<typeof RolesEnum>;

const RegisterSchema = z.object({
  username: z.string().min(3, { message: "Username field cannot be empty" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  roles: RolesEnum,
});

type RegisterSchema = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterSchema> = (data: RegisterSchema) => {
    // assigned users data
    const newUsers: UsersType = {
      username: data.username,
      password: data.password,
      roles: data.roles,
    };

    //  if key: users doesnt exist, turn into empty array
    const users: UsersType[] = JSON.parse(
      localStorage.getItem("users") || "[]",
    );

    // if key: users exist insert newUsers into array
    const addNewUsers = [...users, newUsers];

    // set to localStorage
    setUser(addNewUsers);

    localStorage.setItem("currentUser", JSON.stringify(newUsers));

    if (data.roles === "Admin") {
      router.push("/dashboard");
    } else if (data.roles === "User") {
      router.push("/articles");
    }

    reset({
      username: "",
      password: "",
    });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-[#F3F4F6]">
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-[40px] rounded-lg md:h-[40vh] md:w-[640px] md:bg-white lg:h-[75vh] lg:w-[512px]">
        <div className="relative aspect-[3/1] w-[640px] translate-y-[24px] md:w-[480px] lg:w-[256px]">
          <Image src={"/authLogo.svg"} fill alt="Logo" priority />
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
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="">Role</label>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => (
                <DropdownRoot
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <DropdownTrigger className="w-full">
                    <DropdownValue placeholder="Select Role" />
                  </DropdownTrigger>
                  <DropdownContent>
                    <DropdownItem value="User">User</DropdownItem>
                    <DropdownItem value="Admin">Admin</DropdownItem>
                  </DropdownContent>
                </DropdownRoot>
              )}
            />
          </div>

          <Button
            type="submit"
            className="mt-[24px] w-full bg-blue-600 font-normal"
          >
            Register
          </Button>
        </form>

        <span className="-translate-y-[20px] text-[12px]">
          Already have an account?
          <Link className="pl-[4px] text-blue-500" href={"/auth/login"}>
            Login
          </Link>
        </span>
      </div>
    </main>
  );
}
