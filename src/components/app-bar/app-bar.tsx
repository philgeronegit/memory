"use client";

import { useLogin } from "@/application/mutations/use-login";
import { useUserMessages } from "@/application/queries/use-user-messages";
import { OptionsDialog } from "@/components/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
import { Ellipsis, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffectOnce, useMedia } from "react-use";
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

const links = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Uploads", path: "/uploads" },
  { label: "Kanban", path: "/kanban" },
  { label: "Utilisateurs", path: "/users" }
];

export const AppBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isOptionsDialogOpen, setOptionsDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const isWide = useMedia("(min-width: 480px)");
  const { data: userMessages, isLoading: isLoadingMessages } = useUserMessages({
    userId: user?.id
  });
  const hasUnreadMessages =
    userMessages && userMessages.some((message) => !message.readAt);
  const hasMessages = userMessages && userMessages.length > 0;

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
    if (itemName === "modify-pasword") {
      router.push("/profile/change-password");
    } else if (itemName === "settings") {
      setOptionsDialogOpen(true);
    } else if (itemName === "logout") {
      setUser(undefined);
      setRoleUser(undefined);
      router.push("/login");
    }
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border border-slate-300 bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        {!isWide && (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="p-2">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {links.map((link) => (
                <DropdownMenuItem
                  key={link.path}
                  onSelect={() => setDropdownOpen(false)}>
                  <CustomLink
                    pathname={pathname}
                    path={link.path}
                    label={link.label}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <h4 className="text-primary scroll-m-20 text-xl font-semibold tracking-tight">
          Memory
        </h4>
      </div>
      {user && isWide && (
        <div className="flex items-center gap-4">
          <CustomLink pathname={pathname} path={"/"} label="Home" />
          <CustomLink
            pathname={pathname}
            path={"/dashboard"}
            label="Dashboard"
          />
          <CustomLink pathname={pathname} path={"/profile"} label="Profile" />
          <CustomLink pathname={pathname} path={"/messages"} label="Messages" />
          <CustomLink pathname={pathname} path={"/uploads"} label="Uploads" />
          {isWide && (
            <CustomLink pathname={pathname} path={"/kanban"} label="Kanban" />
          )}
          {isWide && hasPermission(roleUser, "view:users") ? (
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
          {isLoadingMessages && <Ellipsis className="animate-spin" />}{" "}
          {hasMessages && (
            <Link
              href="/messages"
              className="relative flex items-center justify-center">
              {hasUnreadMessages && (
                <>
                  <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  <span className="sr-only">Messages</span>
                </>
              )}
              <Mail />
            </Link>
          )}
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
                <MenubarItem onClick={() => handleMenuItemClick("settings")}>
                  Options
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
      <OptionsDialog
        isOpen={isOptionsDialogOpen}
        onClose={() => setOptionsDialogOpen(false)}
      />
    </header>
  );
};
