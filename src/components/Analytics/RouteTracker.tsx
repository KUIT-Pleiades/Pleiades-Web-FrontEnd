import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteTracker = () => {
  const location = useLocation();
  const lastPageRef = useRef<string>("");

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    const page = location.pathname + location.search;
    if (lastPageRef.current === page) return;
    lastPageRef.current = page;

    ReactGA.send({
      hitType: "pageview",
      page,
    });
  }, [location]);

  return null;
};

export default RouteTracker;