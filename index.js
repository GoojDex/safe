const mapbox = window.mapboxgl;

const $ = (selector, callback) => {
    if (callback) {
        return Array.from(document.querySelectorAll(selector)).forEach(callback);
    }
    return document.querySelector(selector);
};

const $message = $('#msg');
const $currentSpeed = $('#current-speed');
const $menuToggle = $('#menu-toggle');
const $menu = $('#menu');
const $addWaypoint = $('#add-waypoint');
const $speedometerUnitSelect = $('#speedometer-unit-select');
const $speedUnitDisplay = $('#speed-unit-display');
const $headingSelect = $('#heading-select');
const $altitudeSelect = $('#altitude-select');
const $accuracySelect = $('#accuracy-select');
const $debugger = $('#menu code');
const $aboutLink = $('#about-link');
const $html = document.scrollingElement;
const $basemapSelect = $('#basemap-select');

let speedometerUnits,
    initialized,
    headingControl,
    altitudeControl,
    accuracyControl,
    currentMetersPerSecond = 0,
    currentHeadingDegrees,
    currentAltitudeMeters,
    currentAccuracyMeters,
    lightLayers,
    darkLayers;

const defaultLayers = JSON.parse($('#default-layers').innerHTML);

const distanceConversions = {
    feet: 3.28084,
    yards: 1.09361,
    meters: 1
};

/* MAP INITIALIZATION */

const mapStyle = {
    version: 8,
    name: 'Speedomapper',
    glyphs: location.origin + '/assets/{fontstack}/{range}.pbf',
    sprite: location.origin + '/assets/sprite',
    sources: {
        satellite: {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            maxzoom: 19,
            tileSize: 512
        },
        labels: {
            type: 'raster',
            tiles: [
                'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png',
                'https://b.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png',
                'https://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png',
                'https://d.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png'

            ],
            maxzoom: 19,
            tileSize: 256
        },
        default: {
            type: 'vector',
            tiles: ['https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf']
        }
    },
    layers: defaultLayers
};

const map = new mapbox.Map({
    container: 'map',
    style: mapStyle,
    center: [-100.3580679, 39.1141388],
    zoom: 3.5,
    attributionControl: false
});

/* MESSAGE */

function showMessage(msg, type = 'success', doPersist) {
    $message.textContent = msg;
    $message.classList.add(type);
    $message.classList.add('visible');
    if (!doPersist) {
        setTimeout(hideMessage, 5000);
    }
}

function hideMessage() {
    $message.classList.remove('success');
    $message.classList.remove('error');
    $message.classList.remove('visible');
}

/* MAP CONTROLS */

const geoControl = new mapbox.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    fitBoundsOptions: {
        animate: false
    }
});

map.addControl(geoControl);

map.addControl(new mapbox.AttributionControl({
    compact: true,
    customAttribution: '&copy; OpenStreetMap contributors'
}));

map.addControl(new mapbox.NavigationControl({
    showZoom: false
}));

const speedUnitMultipliers = {
    MPH: 2.23694,
    KPH: 3.6,
    mPH: 3600,
    mPS: 1,
    FPS: 3.28084
};

function updateSpeedometer() {
    const multiplier = speedUnitMultipliers[speedometerUnits];
    const speed = (currentMetersPerSecond * multiplier).toFixed(1);
    $currentSpeed.innerHTML = speed;
    $speedUnitDisplay.textContent = speedometerUnits;
}

geoControl.on('geolocate', position => {
    const coords = position && position.coords || {};
    currentMetersPerSecond = coords.speed || 0;
    updateSpeedometer();
    currentAltitudeMeters = coords.altitude;
    updateAltitude();
    currentHeadingDegrees = coords.heading;
    updateHeading();
    currentAccuracyMeters = coords.accuracy;
    updateAccuracy();
    if (!initialized) {
        hideMessage();
        setTimeout(() => {
            initialized = true;
        }, 5000);
    }
    if (!location.href.startsWith('https://exportme.blogspot.com') && location.search.startsWith('?debug=true')) {
        const debug = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
            altitude: coords.altitude,
            heading: coords.heading,
            accuracy: coords.accuracy
        };
        console.log(coords);
        $debugger.innerHTML += `<div>${JSON.stringify(debug, null, 4)}</div>`;
    }
});

if (!navigator.geolocation) {
    showMessage('Your browser does not support GPS.');
} else {
    showMessage('Detecting your location...', 'success', true);
    map.on('load', () => {
        geoControl.trigger();
    });
}

/* MENU */

$menuToggle.onclick = () => {
    $menu.classList.toggle('visible');
};

$('.close-on-click', el => {
    el.addEventListener('click', () => $menu.classList.remove('visible'));
});

/* WAYPOINTS */

const waypoints = JSON.parse(localStorage.getItem('waypoints') || '{}');

function saveWaypoints() {
    localStorage.setItem('waypoints', JSON.stringify(waypoints));
}

function removeWaypoint(waypointID) {
    delete waypoints[waypointID];
    saveWaypoints();
}

function addWaypoint(lng, lat) {
    let waypointID = `${lng}:${lat}`;
    if (waypoints[waypointID]) {
        removeWaypoint(waypointID);
    }
    const popup = new mapbox.Popup()
        .on('open', () => {
            popup.getElement().querySelector('a').onclick = () => {
                marker.remove();
                removeWaypoint(waypointID);
            };
        });
    function updateLngLat() {
        removeWaypoint(waypointID);
        const lngLat = marker.getLngLat();
        waypointID = `${lngLat.lng}:${lngLat.lat}`;
        waypoints[waypointID] = 1;
        saveWaypoints();
        popup.setHTML(`<div>${lngLat.lat.toFixed(7)}, ${lngLat.lng.toFixed(7)}</div><a>&#10005; Delete waypoint</a>`);
    }
    const marker = new mapbox.Marker({
        draggable: true,
        pitchAlignment: 'map',
        color: '#ffb123'
    }).setLngLat([lng, lat])
        .addTo(map)
        .on('dragend', updateLngLat)
        .setPopup(popup);
    updateLngLat();
}

if (waypoints) {
    Object.keys(waypoints).forEach(waypointID => {
        addWaypoint(...waypointID.split(':'));
    });
}

$addWaypoint.addEventListener('click', () => {
    const position = geoControl._lastKnownPosition || {};
    const coords = position.coords;
    let lng, lat;
    if (coords) {
        lng = coords.longitude;
        lat = coords.latitude;
    } else {
        const center = map.getCenter();
        lng = center.lng;
        lat = center.lat;
    }
    addWaypoint(lng, lat);
});

/* SPEEDOMETER UNITS */

function setSpeedometerUnits(units) {
    $speedometerUnitSelect.value = units;
    speedometerUnits = units;
    updateSpeedometer();
    localStorage.setItem('speedometerUnits', speedometerUnits);
}

setSpeedometerUnits(localStorage.getItem('speedometerUnits') || 'MPH');

$speedometerUnitSelect.onchange = e => setSpeedometerUnits(e.target.value);

/* HEADING */

class HeadingControl {
    constructor(mode) {
        this.mode = mode;
        this.directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    }
    onAdd() {
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this.update();
        return this._container;
    }
    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
    getDirection() {
        const val = parseInt(currentHeadingDegrees / 22.5 + 0.5);
        return this.directions[val % 16];
    }
    update() {
        let innerHTML;
        if (typeof currentHeadingDegrees !== 'number') {
            innerHTML = '?';
        } else if (this.mode === 'direction') {
            innerHTML = this.getDirection();
        } else {
            innerHTML = parseInt(currentHeadingDegrees) + '&deg;';
        }
        this._container.innerHTML = `<div class="ctrl-label">DIRECTION: </div><div>${innerHTML}</div>`;
    }
}

function updateHeading() {
    if (headingControl) {
        headingControl.update();
    }
}

function setHeadingMode(mode) {
    $headingSelect.value = mode;
    if (headingControl) {
        map.removeControl(headingControl);
        headingControl = null;
    }
    if (mode !== 'off') {
        headingControl = new HeadingControl(mode);
        map.addControl(headingControl, 'bottom-left');
    }
    localStorage.setItem('heading', mode);
}

setHeadingMode(localStorage.getItem('heading') || 'off');

$headingSelect.onchange = e => setHeadingMode(e.target.value);

/* ALTITUDE */

class AltitudeControl {
    constructor(units) {
        this.units = units;
    }
    onAdd() {
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this.update();
        return this._container;
    }
    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
    update() {
        let altitude;
        if (typeof currentAltitudeMeters !== 'number') {
            altitude = '?';
        } else {
            altitude = parseInt(distanceConversions[this.units] * currentAltitudeMeters);
        }
        this._container.innerHTML = `<div class="ctrl-label">ALTITUDE: </div><div>${altitude}</div>`;
    }
}

function updateAltitude() {
    if (altitudeControl) {
        altitudeControl.update();
    }
}

function setAltitudeUnits(units) {
    $altitudeSelect.value = units;
    if (altitudeControl) {
        map.removeControl(altitudeControl);
        altitudeControl = null;
    }
    if (units !== 'off') {
        altitudeControl = new AltitudeControl(units);
        map.addControl(altitudeControl, 'bottom-left');
    }
    localStorage.setItem('altitude', units);
}

setAltitudeUnits(localStorage.getItem('altitude') || 'off');

$altitudeSelect.onchange = e => setAltitudeUnits(e.target.value);

/* ACCURACY */

class AccuracyControl {
    constructor(units) {
        this.units = units;
    }
    onAdd() {
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this.update();
        return this._container;
    }
    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
    update() {
        let accuracy;
        if (typeof currentAccuracyMeters !== 'number') {
            accuracy = '?';
        } else {
            accuracy = (distanceConversions[this.units] * currentAccuracyMeters).toFixed(1);
        }
        this._container.innerHTML = `<div class="ctrl-label">ACCURACY: </div><div>${accuracy}</div>`;
    }
}

function updateAccuracy() {
    if (accuracyControl) {
        accuracyControl.update();
    }
}

function setAccuracyUnits(units) {
    $accuracySelect.value = units;
    if (accuracyControl) {
        map.removeControl(accuracyControl);
        accuracyControl = null;
    }
    if (units !== 'off') {
        accuracyControl = new AccuracyControl(units);
        map.addControl(accuracyControl, 'bottom-left');
    }
    localStorage.setItem('accuracy', units);
}

setAccuracyUnits(localStorage.getItem('accuracy') || 'off');

$accuracySelect.onchange = e => setAccuracyUnits(e.target.value);

/* SMOOTH SCROLLING */

function animateScroll(to) {
    const difference = Math.abs($html.scrollTop - to);
    if (difference) {
        const scrollInterval = window.innerHeight / 20;
        if (difference < scrollInterval) {
            $html.scrollTop = to;
        } else if ($html.scrollTop > to) {
            $html.scrollTop -= scrollInterval;
            requestAnimationFrame(() => animateScroll(to));
        } else if ($html.scrollTop < to) {
            $html.scrollTop += scrollInterval;
            requestAnimationFrame(() => animateScroll(to));
        }
    }
}

$('a[href^="#"]', a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const targetName = a.getAttribute('href').substring(1);
        let targetTop = 0;
        if (targetName === 'about') {
            targetTop = window.innerHeight;
        }
        animateScroll(targetTop);
    });
});

window.addEventListener('scroll', () => {
    if ($html.scrollTop > window.outerHeight / 2) {
        $aboutLink.textContent = 'Map';
        $aboutLink.setAttribute('href', '#map');
    } else {
        $aboutLink.textContent = 'About';
        $aboutLink.setAttribute('href', '#about');
    }
});

/* BASEMAP */

async function setBasemap(basemap = 'default') {
    let layers;
    if (basemap === 'default') {
        layers = defaultLayers;
    } else if (basemap === 'satellite') {
        layers = [{
            id: 'satellite',
            source: 'satellite',
            type: 'raster'
        }, {
            id: 'labels',
            source: 'labels',
            type: 'raster'
        }];
    } else if (basemap === 'dark') {
        if (!darkLayers) {
            await Promise.all([
                fetch('/assets/dark-layers.json').then(res => res.json()),
                fetch('/assets/dark-text-layers.json').then(res => res.json())
            ]).then(results => {
                darkLayers = results.flat();
            });
        }
        layers = darkLayers;
    } else if (basemap === 'light') {
        if (!lightLayers) {
            await Promise.all([
                fetch('/assets/light-layers.json').then(res => res.json()),
                fetch('/assets/light-text-layers.json').then(res => res.json())
            ]).then(results => {
                lightLayers = results.flat();
            });
        }
        layers = lightLayers;
    } else {
        return;
    }
    mapStyle.layers = layers;
    map.setStyle(mapStyle);
    $basemapSelect.value = basemap;
    localStorage.setItem('basemap', basemap);
}

$basemapSelect.onchange = e => setBasemap(e.target.value);

setBasemap(localStorage.getItem('basemap'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
