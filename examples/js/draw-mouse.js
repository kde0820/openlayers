var vectorSource;

$(function () {
    var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    vectorSource = new ol.source.Vector({wrapX: false});

    var vector = new ol.layer.Vector({
        source: vectorSource
    });

    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp'
    });

    var map = new ol.Map({
        layers: [raster, vector],
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions: {
                collapsible: false
            }
        }).extend([mousePositionControl]),
        view: new ol.View({
            center: [14827315, 4785815],
            zoom: 5
        })
    });

    var typeSelect = $("#type");
    var draw;

    typeSelect.change(function () {
        map.removeInteraction(draw);
        startInteraction();
    });

    function startInteraction() {
        var type = typeSelect.val();
        console.log(type);
        if (type !== 'None') {
            draw = new ol.interaction.Draw({
                source: vectorSource,
                type: type
            });

            map.addInteraction(draw);
        }
    }
});