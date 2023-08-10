import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const bounds = [ [116, 4], [127, 21] ];

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [122, 13], 
    zoom: 5,
    minZoom: 4,
    maxZoom: 12,
    // interactive: false
    // maxBounds: bounds
});

(async () => {
    try {
        const response = await fetch("../assets/data/done-provinces.json");
        const doneProvinces = await response.json();

        map.on("load", () => loadMap(doneProvinces));

    } catch (error) {
        console.error('Error fetching the JSON:', error);
    }
})();

function loadMap (doneProvinces) {
    map.addSource("provincesData", {
        "type": "geojson",
        "data": "../assets/data/philippines-provinces.geojson"
    })
    console.log(doneProvinces)
    map.addLayer({
        "id": "provincesLayer",
        "type": "fill",
        "source": "provincesData",
        "paint": {
            "fill-color": [
                "match",
                ["get", "NAME_1"],
                doneProvinces,
                "#f00",
                "#39f"
            ],
            "fill-opacity": 0.4
        }
    });
    map.on("click", "provincesLayer", (e) => {
        if (map.dragging?.moving() || map.zooming?.zooming()) {
            return;
        }

        var title = e.features[0].properties.NAME_1;
    
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<span>" + title + "</span>")
            .addTo(map);
    })
    map.on("mousemove", (e) => {
        var features = map.queryRenderedFeatures(e.point, { layers: ["provincesLayer"] });
        map.getCanvas().style.cursor = features.length ? "pointer" : "";
    })
    map.resize();
}
