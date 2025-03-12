import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAlert } from "../hooks/useAlert";

export function RouteChangeHandler() {
  const location = useLocation();
  const { clear } = useAlert();

  useEffect(() => {
    clear();
  }, [location]);

  return null;
}
