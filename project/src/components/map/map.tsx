import {useRef, useEffect} from 'react';
import {Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';
import {UrlMapMarker, MapMarker} from '../../const';

type MapProps = {
  className: string,
  offers: Offer[],
  activeOffer: number | null
};

function Map({className, offers, activeOffer}: MapProps) {
  const [firstOffer] = offers;
  const {city} = firstOffer;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const getIcon = (isActiveOffer: boolean) => leaflet.icon({
    iconUrl: (isActiveOffer) ? UrlMapMarker.Active : UrlMapMarker.Default,
    iconSize: [MapMarker.Width, MapMarker.Height],
    iconAnchor: [MapMarker.Width, MapMarker.Height],
  });

  useEffect(() => {
    if (map) {
      offers.map((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        const icon = getIcon(activeOffer === offer.id);

        marker
          .setIcon(icon)
          .addTo(map);
      });
    }
  }, [map, activeOffer]);

  return (
    <section className={`${className} map`} ref={mapRef}></section>
  );
}

export default Map;
