import React, {useEffect, useState} from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams} from 'react-router-dom'

import '../styles/pages/nursinghome.css';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import api from '../services/api';

interface NursingHome {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    path: string;
    _id: number;
  }>;
}
interface NursingHomeParams{
  id: string;
}

export default function NursingHome() {
  const params = useParams<NursingHomeParams>()
  const [nursingHome, setNursingHomes] = useState<NursingHome>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`nursing_homes/${params.id}`).then(response => {
      setNursingHomes(response.data);
    });
  }, [params.id]);

  if(!nursingHome){
    return <p>Carregando</p>
  }
  return (
    <div id="page-nursinghome">
      <Sidebar/>
      <main>
        <div className="nursinghome-details">
          <img src={nursingHome.images[activeImageIndex].path} alt={nursingHome.name} />
          <div className="images">
              {nursingHome.images.map((image, index) =>{
                return(
                  <button 
                    key={image._id}
                    className={activeImageIndex === index ? 'active' : ''}
                    type="button"
                    onClick={() =>{
                      setActiveImageIndex(index)
                    }}
                  >
                    <img 
                      src={image.path} 
                      alt={nursingHome.name} 
                    />
                  </button>
                )
              })}
          </div>
          
          <div className="nursinghome-details-content">
            <h1>{nursingHome.name}</h1>
            <p>{nursingHome.about}</p>

            <div className="map-container">
              <Map 
                center={[nursingHome.latitude,nursingHome.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                <Marker interactive={false} icon={mapIcon} position={[nursingHome.latitude,nursingHome.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${nursingHome.latitude},${nursingHome.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{nursingHome.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {nursingHome.opening_hours}
              </div>
              {nursingHome.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="open-on-weekends dont-open" >
                <FiInfo size={32} color="#FF6690" />
                Não atendemos  <br />
                fim de semana
              </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}