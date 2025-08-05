"use client";

import { useLogin } from "@/application/mutations/use-login";
import { Roles } from "@/lib/auth";
import useNotesStore from "@/store/useNotesStore";
import { useState } from "react";

export const useAuth = () => {
  const [replyError, setReplyError] = useState<string>();
  const login = useLogin();
  const { setLoggedIn, setUser, setRoleUser } = useNotesStore();

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await login.mutateAsync({
        username,
        password
      });
      setLoggedIn(true, user.access_token);
      setUser(user);
      if (user?.id) {
        setRoleUser({
          id: user.id,
          role: user.roleValue as keyof Roles
        });
      }
      return { success: true, user };
    } catch (error) {
      if (error instanceof Error) {
        const hasStatus = (err: unknown): err is { status: number } =>
          typeof err === "object" && err !== null && "status" in err;
        if (hasStatus(error) && error.status === 401) {
          setReplyError("Nom d'utilisateur ou mot de passe incorrect.");
        } else if (hasStatus(error) && error.status === 403) {
          setReplyError(
            "Accès refusé. Vous n'avez pas les autorisations nécessaires."
          );
        } else if (hasStatus(error) && error.status === 500) {
          setReplyError(
            "Erreur interne du serveur. Veuillez réessayer plus tard."
          );
        }
      }
      return { success: false, error };
    }
  };

  const clearError = () => {
    setReplyError(undefined);
  };

  return {
    handleLogin,
    replyError,
    clearError,
    isLoading: login.isPending
  };
};
