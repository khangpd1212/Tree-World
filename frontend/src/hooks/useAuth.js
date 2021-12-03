import { useMemo } from "react";
export default function useAuth() {
  const actionAuth = useMemo(
    () => {
      let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
      const [encodedHeader, encodedBody, signature] = token
        .toString()
        .split(".");

      const { isAdmin, id } = encodedBody ? JSON.parse(window.atob(encodedBody)) : {};
      return {isAdmin, id}
    },
    [],
  )
  return { isAdmin: actionAuth.isAdmin, id: actionAuth.id }
}
