import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    maxWidth: '1030px',
    height: '400px',
    borderRadius: `10px`,
};

const center = {
    lat: 60.39182248928281,
    lng: 5.320100304310781
};

function Location() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBwsH_6vZ4gBNHmJPqQostWbtsyroCBZNM"
    })

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>

            {<Marker position={center} />}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Location) 