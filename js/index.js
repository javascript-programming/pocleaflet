const map = L.map('map', {
    center: [53.21, 6.56],
    zoom: 13,
    preferCanvas: true,
});


const baseMap = new L.TileLayer('http://tile.osm.org/{z}/{x}/{y}.png');
baseMap.addTo(map);

(async () => {
    const response = await fetch('./data/groningen_trees_wgs84.geojson');

    const data = await response.json();
    const treeLayer = new L.GeoJSON(data, {
        pointToLayer:(geoObj, latLng) => {
            return L.circleMarker(latLng, {
                radius:2,
                color:'#226d29'
            });
        }
        ,onEachFeature: (feature, layer) => {
            layer.on('click', (tree) => {
                console.log(feature);
            })
        }
    });
    // treeLayer.addTo(map);
    const clusterLayer = L.markerClusterGroup({
        disableClusteringAtZoom:16,
        maxClusterRadius:60,
        spiderfyOnMaxZoom:false
    });
    clusterLayer.addLayer(treeLayer);
    clusterLayer.addTo(map);

    // map.on('click', (eve) => {
    //     L.marker(eve.latlng).addTo(map);
    //
    // })

})();

