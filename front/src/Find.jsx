import React, {useCallback, useEffect, useState} from 'react'
import List from './map/list/List';
import Map from './map/map/Map';
import {CssBaseline, Grid} from '@material-ui/core';
import logoImg from "./img/logo.png";
import {useNavigate} from "react-router-dom";
import {LoadScript} from "@react-google-maps/api";


const Find = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
        sessionStorage.setItem('board_type', 'FREE')
    }

    const goToLogout = () => {
        sessionStorage.removeItem('token')
        goToHome()
    }

    const lib = ["places"];
    const key = "AIzaSyC3XVuVdAVcPiWvdbYJVW94q7bKgsJ9tNw"; // PUT GMAP API KEY HERE
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 37.4760836, lng: 126.9404539});
    const [bounds, setBounds] = useState({});

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), [])
    const refreshPlaces = () => {
        forceUpdate();
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, [])

    useEffect(() => {
        console.log('test000000', coordinates,bounds, places);

    },[coordinates, bounds, places])

    console.log('test11111', coordinates)

    return (
        <>
            <div className="board">
                <div className="nav">
                    <div className="category">

                    </div>
                    <div className="logo">
                        <a href="" onClick={goToHome}>
                            {/*<img src={logoImg} alt=""/>*/}
                            <h1>GOLF</h1>
                        </a>
                    </div>
                    <div className={"nav_but"}>
                        {sessionStorage.getItem('token') != null ? <a href="" onClick={goToLogout}>로그아웃</a> : <a></a>}
                    </div>
                </div>
                <div className="mapContainer">
                    <Grid container spacing={3} style={{width: '100%'}}>
                        <Grid item xs={12} md={4}>
                            <List places={places}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <LoadScript googleMapsApiKey={key} libraries={lib}>
                                <Map
                                    setCoordinates={setCoordinates}
                                    coordinates={coordinates}
                                    setPlaces={setPlaces}
                                    places={places}
                                    setBounds={setBounds}
                                    bounds={bounds}
                                    refreshPlaces={refreshPlaces}/>
                            </LoadScript>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
};

export default Find;
