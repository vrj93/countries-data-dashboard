'use client'

import {GoogleMap, Marker} from "@react-google-maps/api";

export const defaultMapContainerStyle = {
  width: '100%',
  height: '60vh',
  borderRadius: '0px 0.75rem 0.75rem 0px',
};

const defaultMapZoom = 5;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'satellite',
};

interface MapComponentProps {
  coordinates: number[];
}

const MapComponent = ({ coordinates }: MapComponentProps) => {
  const mapCenter = {
    lat: coordinates[0],
    lng: coordinates[1]
  }
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        mapTypeId="roadmap">
        <Marker position={mapCenter}/>
      </GoogleMap>
    </div>
  )
};

export default MapComponent;