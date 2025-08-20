import React from "react";
const Tracking = React.lazy(() => import("../../Pages/MapBox"));

export const protectedRoutes = [
    {
        path: "/",
        element: <Tracking />,
    },
];