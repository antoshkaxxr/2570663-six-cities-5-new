import { useEffect, useRef, memo } from 'react';
import { useMap } from '../../hooks/useMap/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Point } from '../../types/offer.ts';

type MapProps = {
  points: Point[];
  activePointId: string | null;
  height: number;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapComponent ({ points, activePointId, height }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, points[0].city);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      points.forEach((point) => {
        const markerIcon = point.id === activePointId ? currentCustomIcon : defaultCustomIcon;

        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: markerIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, activePointId]);

  return (
    <div
      style={{ height: `${height}px` }}
      ref={mapRef}
    >
    </div>
  );
}

export const Map = memo(MapComponent);
