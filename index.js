mapboxgl.accessToken = 'pk.eyJ1IjoiamJ1c3RhcmRlIiwiYSI6ImNsZDIzYjE2czAxcGozd29kbGx1cWlua2kifQ.CXKGQ4gXLUgVqCmPlI0kNw';

const bounds = [
    [116, 4],
    [127, 21]
];
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [122, 13], 
    zoom: 5,
    minZoom: 4,
    maxZoom: 12
    // maxBounds: bounds
});

const doneProvinces = ['Metropolitan Manila', 'Laguna', 'Batangas',
    'Mountain Province', 'Cavite', 'Cebu', 'Iloilo', 'Bataan',
    'Ilocos Norte', 'Ilocos Sur', 'Guimaras', 'Ifugao', 'Cagayan',
    'Negros Occidental', 'Albay', 'Rizal', 'Quezon', 'Bohol',
    'Benguet', 'Pangasinan', 'Marinduque', 'Aurora', 'La Union',
    'Misamis Oriental', 'Davao del Norte', 'Camiguin', 'Oriental Mindoro',
    'Lanao del Norte', 'Aklan', 'North Cotabato', 'Zambales'];

map.on('load', loadMap);

function loadMap () {
    map.addSource('provincesData', {
        'type': 'geojson',
        'data': 'philippines-provinces.geojson'
    })
    map.addLayer({
        'id': 'provincesLayer',
        'type': 'fill',
        'source': 'provincesData',
        'paint': {
            'fill-color': [
                'match',
                ['get', 'NAME_1'],
                doneProvinces,
                '#f00',
                '#39f'
            ],
            'fill-opacity': 0.4
        }
    });
    map.on('click', 'provincesLayer', (p) => {
        console.log(p.features[0].properties.NAME_1);
    })
    map.on('mousemove', (e) => {
        var features = map.queryRenderedFeatures(e.point, { layers: ['provincesLayer'] });
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    })
    map.resize();
}