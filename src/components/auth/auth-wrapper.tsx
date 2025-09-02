"use client";

import { User } from "@/domain/user";
import { authCookies } from "@/lib/auth-cookies";
import useNotesStore from "@/store/useNotesStore";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isLoggedIn, setLoggedIn, setUser } = useNotesStore();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuthentication = useCallback(() => {
    const authCookie = authCookies.getAuthCookie();
    const userCookie = authCookies.getUserCookie();

    // Check if auth cookie exists and contains a valid token
    if (!authCookie || authCookies.isTokenExpired(authCookie)) {
      setLoggedIn(false);
      authCookies.clearAllAuthCookies();
      return false;
    }

    // Check if user cookie exists
    if (!userCookie) {
      setLoggedIn(false);
      authCookies.clearAllAuthCookies();
      return false;
    }

    // If all checks pass, user is authenticated
    if (!isLoggedIn) {
      setLoggedIn(true, authCookie);
      setUser(userCookie as User);
    }

    return true;
  }, [isLoggedIn, setLoggedIn, setUser]);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setIsCheckingAuth(false);

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [checkAuthentication, router]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Vérification de l&apos;authentification...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
