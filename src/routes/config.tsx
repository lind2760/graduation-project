import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import { Navigate, RouteObject } from "react-router-dom";

const routes = [
  {
    path: "/home",
    element: () => import("@/pages/Home/Home"),
  },
  { path: "/", element: <Navigate to="home" /> },
];
function LazyElement(props: { importFunc: () => Promise<any> }) {
  const { importFunc } = props;
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}

function dealRoutes(routesArr: any[]): RouteObject[] {
  const newRoutesArr: RouteObject[] = routesArr;
  if (routesArr && Array.isArray(routesArr) && routesArr.length > 0) {
    routesArr.forEach((route, index) => {
      if (route.element && typeof route.element === "function") {
        newRoutesArr[index].element = (
          <LazyElement importFunc={route.element} />
        );
      }
      if (route.children) {
        newRoutesArr[index].children = dealRoutes(route.children);
      }
    });
  }
  return newRoutesArr;
}

export default dealRoutes(routes);
