"use client";

import { useLogin } from "@/application/mutations/use-login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { useToast } from "@/hooks/use-toast";
import { hasPermission, Roles } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import Logo from "../../assets/logo.png";
import { Button } from "../ui/button";
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
  const { user, roleUser } = useNotesStore();
  const avatarUrl = user?.avatarUrl;
  const username = user?.username;
  const initials = username
    ?.split(" ")
    .map((n: string) => n[0])
    .join("");
  const email = user?.email;
  const role = user?.roleName;
  const login = useLogin();
  const { setUser, setRoleUser } = useNotesStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffectOnce(() => {
    const runAsync = async () => {
      try {
        const user = await login.mutateAsync({
          username: "philgerone",
          password: "1234"
        });
        setUser(user);
        setRoleUser({
          id: user.id ?? 0,
          role: (user.roleValue as keyof Roles) ?? "external"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          variant: "destructive",
          title: "Erreur lors de la connexion",
          description: (error as Error).message
        });
      }
    };
    runAsync();
  });

  const handleMenuItemClick = (itemName: string) => {
    if (itemName === "logout") {
      setUser(undefined);
      setRoleUser(undefined);
      router.push("/login");
    }
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border border-slate-300 bg-background px-4 md:px-6">
      <Image src={Logo} alt="Memory" width={64} height={64} />

      {user && (
        <div className="flex items-center gap-4">
          <CustomLink pathname={pathname} path={"/"} label="Home" />
          <CustomLink
            pathname={pathname}
            path={"/dashboard"}
            label="Dashboard"
          />
          <CustomLink pathname={pathname} path={"/profile"} label="Profile" />
          <CustomLink pathname={pathname} path={"/kanban"} label="Kanban" />
          {hasPermission(roleUser, "view:users") ? (
            <CustomLink
              pathname={pathname}
              path={"/users"}
              label="Utilisateurs"
            />
          ) : null}
        </div>
      )}

      {!user && (
        <div className="flex items-center gap-4">
          <Button variant="ghost" title="Login" onClick={() => setOpen(true)}>
            <LogIn />
          </Button>
        </div>
      )}

      {user && (
        <div className="flex gap-2">
          <Menubar className="border-0 shadow-none">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <div className="flex items-center justify-between p-2">
                  <div>
                    <div>{username}</div>
                    <div className="text-xs italic">{email}</div>
                    <div className="text-xs italic">{role}</div>
                  </div>
                  <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </div>
                <MenubarItem
                  onClick={() => handleMenuItemClick("modify-pasword")}>
                  Changer de mot de passe
                </MenubarItem>
                <MenubarItem onClick={() => handleMenuItemClick("logout")}>
                  Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      )}

      <LoginDialog open={open} setOpen={setOpen} />
    </header>
  );
};
