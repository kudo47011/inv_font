import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ lat, lng, branch }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleClick = () => {
    setShowPopup(!showPopup)
  }

  return (
    <>
      <div className="marker" onClick={handleClick}>
        📍
      </div>
      {showPopup && <div className="popup">{branch}</div>}
    </>
  )
}

const LocationBranch = ({data}) => {
  const defaultProps = {
    center: {
      lat: 15.225245,
      lng: 101.514008,
    },
    zoom: 6,
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }} className='map-font'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyB80nEBblSL_qgiXUpLciZxrZfHTjA5CSw' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        draggable={true}
      >
        {data.map((position, index) => (
          <Marker
            key={index}
            lat={position.lat}
            lng={position.lng}
            branch={position.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default LocationBranch
