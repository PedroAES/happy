import React,  {useEffect, useState} from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/nursinghomes-map.css';
import api from '../services/api';

interface NursingHome {
  _id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function NursingHomeMap() {
  const [nursingHomes, setNursingHomes] = useState<NursingHome[]>([]);

  useEffect(() => {
    api.get('nursing_homes').then(response => {
      console.log('Response ' + response);
      setNursingHomes(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>

        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um asilo no mapa</h2>
          <p>Muitos idosos estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map 
        center={[-12.9876699,-38.4987764]}
        zoom={14}
        style={{width: '100%', height: '100%'}}
      >
      <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
      {nursingHomes.map(nursingHome => (
          <Marker
            key={nursingHome._id}
            icon={mapIcon}
            position={[nursingHome.latitude, nursingHome.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {nursingHome.name}
              <Link to={`/nursinghome/${nursingHome._id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/nursinghome/create" className="create-nursinghome">
        <FiPlus size={32} color="#fff"/>
      </Link> 
    </div>
  )
}

export default NursingHomeMap;
