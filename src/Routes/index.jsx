import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader } from "../Components";
import MainLayout from "../Layout";
import { protectedRoutes } from "./MainRoute";
import { authCheck } from "../Redux/Action";

const RouteComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheck()).then((res) => {
            console.log('Auth Res----->',res);
            
            localStorage.setItem('protrackerToken', res?.payload?.record?.access_token)
        })
    }, [])

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {protectedRoutes?.map(({ path, element }, index) => (
                        <Route key={index} path={path} element={element} />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default RouteComponent;
