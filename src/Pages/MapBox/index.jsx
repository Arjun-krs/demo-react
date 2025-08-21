import React, { act, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useMapWithCurrentLocation } from './Hooks/useMapWithCurrentLocation';
import MapSidebar from './MapComponents/MapSidebar';
import { DeviceList, vehicleList } from '../../Redux/Action';
import { useMapWithFleetRoutes } from './Hooks/useMapWithFleetRoutes';
import { vehicleRoutes } from './StaticData';
import { Popup } from '../../Components';
import { BottomCard, KmlInfoCard, PlaybackCard, PopupCard } from './MapComponents';
import { usePlayback } from './Hooks/usePlayback';
import { EstateIcon } from '../../Config';
import { useKmlLoader } from './Hooks/useKmlLoader';
import "./style.scss"

const MapWrapper = () => {
    const dispatch = useDispatch();
    mapboxgl.accessToken = import.meta.env.VITE_API_URI_MAP_BOX_DEFAULT_TOKEN;
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const animationRef = useRef(null);

    const [mapData, setMapData] = useState({
        vehicleList: [],
        selectedVehicle: null,
        params: {
            search: '',
            startDate: '',
            endDate: ''
        },
        trackAction: null,
        playBack: 0,
        kml: {
            hoverDetail: {
                estateHead: null,
                estateSubHead: null
            },
            showKmlPopup: false,
            kmlDetails: null
        }
    })

    const { loadKml } = useKmlLoader(mapRef);
    const { play, pause, restart, forward, rewind } = usePlayback({
        route: vehicleRoutes,
        mapRef,
        markerRef,
        speed: 2000,
    });
    useMapWithFleetRoutes({ selectedVehicle: mapData.selectedVehicle, fleetRoutes: vehicleRoutes, mapRef, mapContainerRef, markerRef, animationRef }); // for tracking
    useMapWithCurrentLocation({ fleetRoutes: vehicleRoutes, selectedVehicle: mapData.selectedVehicle, mapRef, mapContainerRef, markerRef });

    // useEffect(() => {
    //     const AccessToken = localStorage.getItem('protrackerToken')
    //     console.log('AccessToken', AccessToken);

    //     // dispatch(vehicleList()).then((res) => {
    //     //     setMapData((prev) => ({ ...prev, vehicleList: res?.payload?.data }));
    //     // })
    //     dispatch(DeviceList({ accessToken: AccessToken, account: 'TProject1' })).then((res) => {
    //         console.log('Device list api response', res);
    //         setMapData((prev) => ({ ...prev, vehicleList: res?.payload.record }));
    //     })
    // }, [])

    useEffect(() => {
        if (!mapData.selectedVehicle) return;
        pause();
        restart();
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }, [mapData.selectedVehicle]);

    const handleSearchChange = useCallback((field, value) => {
        setMapData(prev => ({
            ...prev,
            params: { ...prev.params, [field]: value }
        }))
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* Sidebar and info card  */}
            <div className="absolute top-[10px] left-[10px] z-50 w-[330px] rounded-2xl flex flex-col gap-[15px]">
                <MapSidebar
                    vehicles={mapData?.vehicleList}
                    selectedVehicle={mapData?.selectedVehicle}
                    onSelect={(vehicle) => {
                        setMapData((prev) => ({
                            ...prev,
                            selectedVehicle: vehicle,
                        }));
                    }}
                    search={mapData?.params}
                    onSearchChange={handleSearchChange}
                    onOption={(action, vehicle) => {
                        setMapData((prev) => ({
                            ...prev,
                            trackAction: action,
                        }));
                    }}
                />
                {mapData?.selectedVehicle && (
                    <BottomCard
                        selectedVehicle={mapData?.selectedVehicle}
                    />
                )}
            </div>

            {/* Kml estate navigation button */}
            <button
                onClick={() =>
                    loadKml("/assets/Tongod_Sabah.kml", "estate-layer", {
                        onFeatureClick: (props, geometry) => {
                            console.log("Clicked feature:", props, geometry);
                            setMapData((prev) => ({
                                ...prev,
                                kml: {
                                    ...prev.kml,
                                    showKmlPopup: true,
                                    kmlDetails: props
                                }
                            }))
                        },
                        onFeatureHover: (head, sub) => {
                            setMapData((prev) => ({
                                ...prev,
                                kml: {
                                    ...prev.kml,
                                    hoverDetail: {
                                        estateHead: head,
                                        estateSubHead: sub
                                    }
                                }
                            }));

                        },
                    })
                }
                className="absolute top-[10px] right-[10px] z-50 rounded-2xl bg-white p-2 cursor-pointer shadow-xl"
            >
                <div className="bg-[#bababa] rounded-full p-2 flex-shrink-0">
                    <EstateIcon width={25} height={25} />
                </div>
            </button>

            {/* This is for kml estate name */}
            {Object.values(mapData?.kml?.hoverDetail).every((val) => val !== null) && (
                <div className='bg-[#FFFFFF] rounded-full py-[8px] px-[24px] top-[10px] absolute left-1/2 transform -translate-x-1/2 z-50'>
                    <label className='!text-[#696969] !text-[12px]'>{mapData?.kml?.hoverDetail?.estateHead}</label>
                    <h5 className='!text-[#00888A] !text-[20px]'>{mapData?.kml?.hoverDetail?.estateSubHead}</h5>
                </div>
            )}

            {/* Main map container */}
            <div ref={mapContainerRef} className="w-full h-full rounded-2xl" />

            {/* Playback actions */}
            {mapData?.trackAction === "playback" && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                    <PlaybackCard
                        onPlay={play}
                        onPause={pause}
                        onRewind={rewind}
                        onRestart={restart}
                        onForward={forward}
                    />
                </div>
            )}

            {/* Popup for vehicle details */}
            <Popup
                open={mapData?.trackAction === "details"}
                onClose={() =>
                    setMapData((prev) => ({ ...prev, trackAction: false }))
                }
                confirmClose={false}
            >
                <PopupCard selectedVehicle={mapData?.selectedVehicle} />
            </Popup>

            {/* Popup for kml details */}
            <Popup
                open={mapData?.kml?.showKmlPopup}
                onClose={() =>
                    setMapData((prev) => ({
                        ...prev,
                        kml: {
                            ...prev.kml,
                            showKmlPopup: false,
                            kmlDetails: null
                        }
                    }))}
                confirmClose={false}
            >
                <KmlInfoCard
                    cardInfo={mapData?.kml?.kmlDetails}
                />
            </Popup>
        </div>

    );
};

export default MapWrapper;
