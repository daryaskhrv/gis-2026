import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import { fromLonLat } from 'ol/proj';
import { apply } from 'ol-mapbox-style';


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new ImageLayer({
      source: new ImageWMS({
        url: "http://localhost:8080/geoserver/gis/wms",
        params: {
          LAYERS: "gis:buildings",
          TILED: true,
          TRANSPARENT: true
        },
        ratio: 1,
        serverType: "geoserver",
      }),
    }),
    new ImageLayer({
      source: new ImageWMS({
        url: "http://localhost:8080/geoserver/gis/wms",
        params: {
          LAYERS: "gis:roads",
          TILED: true,
          TRANSPARENT: true
        },
        ratio: 1,
        serverType: "geoserver",
      }),
    }),
    new ImageLayer({
      source: new ImageWMS({
        url: "http://localhost:8080/geoserver/gis/wms",
        params: {
          LAYERS: "gis:poi",
          TILED: true,
          TRANSPARENT: true
        },
        ratio: 1,
        serverType: "geoserver",
      }),
    })
  ],
  view: new View({
    center: fromLonLat([49.101301, 53.247287]),
    zoom: 16
  })
});

fetch('/mapbox-style.json')
  .then((r) => r.json())
  .then((style) => apply(map, style));
