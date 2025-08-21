import React from "react";
const Tracking = React.lazy(() => import("../../Pages/MapBox"));
const ComponentsPage = React.lazy(() => import("../../Pages/Components"));

export const protectedRoutes = [
    {
        path: "/",
        element: <Tracking />,
    },
    {
        path: "/components",
        element: <ComponentsPage />,
    },
];