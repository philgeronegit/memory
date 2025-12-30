export const AUTH_COOKIE_NAME = "auth-token";
export const USER_COOKIE_NAME = "user-data";

// Simple cookie utilities without external dependencies
export const authCookies = {
  isTokenExpired: (token: string): boolean => {
    try {
      // Basic validation - token should have 3 parts separated by dots
      if (!token || token.split(".").length !== 3) {
        console.log("🚀 ~ isTokenExpired : Invalid token format");
        return true;
      }

      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if token has expiration field
      if (!payload.exp) {
        console.log("🚀 ~ isTokenExpired : Token missing expiration field");
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const isTokenExpired = payload.exp < currentTime;
      return isTokenExpired;
    } catch {
      console.log("🚀 ~ isTokenExpired : Error decoding token");
      // If token can't be decoded, consider it expired
      return true;
    }
  },

  setAuthCookie: (token: string) => {
    if (typeof document !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      document.cookie = `${AUTH_COOKIE_NAME}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;
    }
  },

  getAuthCookie: (): string | null => {
    if (typeof document === "undefined") return null;
    const name = AUTH_COOKIE_NAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  },

  removeAuthCookie: () => {
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  },

  setUserCookie: (userData: unknown) => {
    if (typeof document !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      document.cookie = `${USER_COOKIE_NAME}=${encodeURIComponent(
        JSON.stringify(userData)
      )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;
    }
  },

  getUserCookie: (): unknown | null => {
    if (typeof document === "undefined") return null;
    const name = USER_COOKIE_NAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const userData = c.substring(name.length, c.length);
        try {
          return JSON.parse(decodeURIComponent(userData));
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  removeUserCookie: () => {
    if (typeof document !== "undefined") {
      document.cookie = `${USER_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  },

  clearAllAuthCookies: () => {
    if (typeof document !== "undefined") {
      document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${USER_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
};
