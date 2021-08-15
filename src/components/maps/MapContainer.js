import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '50vh',
    width: '100%'
  };

  const defaultCenter = {
    lat: -6.2146,
    lng: 106.8451
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBs6wa9O1w5GDUNYbTzYlq0cuIE7cHPO0Y">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
