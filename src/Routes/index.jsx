import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MD5 from "crypto-js/md5";
import { useDispatch } from "react-redux";
import { Loader } from "../Components";
import MainLayout from "../Layout";
import { protectedRoutes } from "./MainRoute";
import { authCheck } from "../Redux/Action";

const RouteComponent = () => {
    const dispatch = useDispatch();

    const getUnixTimestamp = () => Math.floor(Date.now() / 1000);

    const generateSignature = (password, timestamp) => {
        const firstHash = MD5(password).toString();
        return MD5(firstHash + timestamp).toString();
    };

    const password = "Ravan@tracker1";
    const timestamp = getUnixTimestamp();
    const signature = generateSignature(password, timestamp);

    console.log("Timestamp:", timestamp);
    console.log("Signature:", signature);

    useEffect(() => {
        const payload = {
            time: timestamp,
            account: 'TProject1',
            signature: signature
        }
        dispatch(authCheck(payload)).then((res) => {
            console.log('authCheck res----------', res);

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
