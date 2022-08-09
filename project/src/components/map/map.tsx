import {useRef, useEffect} from 'react';
import {LayerGroup, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';
import {UrlMapMarker, MapMarker} from '../../const';

type MapProps = {
  activeOffer: number | null,
  className: string,
  offers: Offer[],
};

function Map({activeOffer, className, offers}: MapProps) {
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
      const markers:Marker[] = [];
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        const icon = getIcon(activeOffer === offer.id);

        marker.setIcon(icon);
        markers.push(marker);
      });
      const layerGroup = new LayerGroup(markers);
      layerGroup.addTo(map);

      return () => {
        map.removeLayer(layerGroup);
      };
    }
  }, [map, activeOffer, offers]);

  return (
    <section className={`${className} map`} ref={mapRef}/>
  );
}

export default Map;
