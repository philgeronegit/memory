"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../assets/logo.png";
import { LoginDialog } from "../users";

interface CustomLinkProps {
  label: string;
  pathname: string;
  path: string;
}

const CustomLink = ({ label, pathname, path = "/" }: CustomLinkProps) => (
  <Link
    className={`${
      pathname === path
        ? "underline underline-offset-2 decoration-secondary decoration-4"
        : ""
    }`}
    href={path}>
    {label}
  </Link>
);

export const AppBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleMenuItemClick = (itemName: string) => {
    console.log(`${itemName} clicked!`);
    if (itemName === "login") {
      setOpen(true);
    }
    if (itemName === "logout") {
      // Add your custom logic here
    }
  };

  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Image src={Logo} alt="Memory" width={64} height={64} />

      <div className="flex items-center gap-4">
        <CustomLink pathname={pathname} path={"/"} label="Home" />
        <CustomLink pathname={pathname} path={"/dashboard"} label="Dashboard" />
        <CustomLink pathname={pathname} path={"/profile"} label="Profile" />
        <CustomLink pathname={pathname} path={"/users"} label="Utilisateurs" />
      </div>

      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/philgerone.png" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => handleMenuItemClick("login")}>
                Login
              </MenubarItem>
              <MenubarItem onClick={() => handleMenuItemClick("logout")}>
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <LoginDialog open={open} setOpen={setOpen} />
    </header>
  );
};
