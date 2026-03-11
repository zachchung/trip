var map = L.map('map', { center: [46.0, 11.0], zoom: 8, zoomControl: true });
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© CartoDB © OpenStreetMap contributors', maxZoom: 18
}).addTo(map);

// Day 1: Milan-Monza-Sirmione
var day1_path = [
  [45.4654,9.1859], [45.55,9.22], [45.6156,9.2811],
  [45.58,9.4], [45.55,9.6], [45.5,10.0], [45.48,10.4], [45.4968,10.6059]
];
L.polyline(day1_path, { color:'#4A90D9', weight:4, opacity:0.7, tooltip:'Day 1: Milan-Monza-Sirmione' }).addTo(map);

// Day 2: Sirmione → Ortisei → Cortina (Great Dolomite Road)
var day2_path = [
  [45.4968,10.6059], [45.8,10.9], [46.2,11.2], [46.4,11.35],
  [46.45,11.45], [46.4886,11.8267], [46.5178,12.0072], [46.5404,12.1357]
];
L.polyline(day2_path, { color:'#FF8C00', weight:5, opacity:0.8, tooltip:'Day 2: Great Dolomite Road' }).addTo(map);

// Day 4: Braies & Tre Cime
var day4_path = [
  [46.5404,12.1357], [46.6,12.15], [46.6943,12.0847],
  [46.65,12.2], [46.6,12.25], [46.5939,12.2611],
  [46.57,12.2], [46.5404,12.1357]
];
L.polyline(day4_path, { color:'#20B2AA', weight:4, opacity:0.7, tooltip:'Day 4: Braies & Tre Cime' }).addTo(map);

// Day 5: Cortina → Gardena → Carezza → Val di Funes
var day5_path = [
  [46.5404,12.1357], [46.5178,12.0072], [46.5569,11.8261],
  [46.4093,11.5751], [46.6350,11.7242]
];
L.polyline(day5_path, { color:'#4A90D9', weight:5, opacity:0.8, tooltip:'Day 5: Gardena Pass Route' }).addTo(map);

// Day 7: Return to Sirmione
var day7_path = [
  [46.6350,11.7242], [46.0,11.1], [45.4968,10.6059]
];
L.polyline(day7_path, { color:'#7B68EE', weight:4, opacity:0.7, tooltip:'Day 7: Return to Sirmione' }).addTo(map);

// Day 8: Sirmione to Milan
var day8_path = [
  [45.4968,10.6059], [45.48,10.4], [45.5,10.0], [45.55,9.6], [45.4654,9.1859]
];
L.polyline(day8_path, { color:'#9C27B0', weight:4, opacity:0.7, tooltip:'Day 8: Sirmione-Milan' }).addTo(map);

// Markers
var locations = {
  'Milan': [45.4654,9.1859], 'Monza': [45.6156,9.2811], 'Sirmione': [45.4968,10.6059], 'Cortina': [46.5404,12.1357],
  'Lago di Braies': [46.6943,12.0847], 'Tre Cime': [46.5939,12.2611], 'Ortisei': [46.4,11.35],
  'Bolzano': [46.4983,11.3548], 'Carezza': [46.4093,11.5751], 'Val di Funes': [46.6350,11.7242]
};
for (var name in locations) {
  L.marker(locations[name], { icon: L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', iconSize: [25,41], iconAnchor: [12,41] }) }).addTo(map).bindPopup(name);
}

var passes = {
  'Sella Pass (2218m)': [46.5086,11.7631], 'Gardena Pass (2121m)': [46.5569,11.8261],
  'Pordoi Pass (2239m)': [46.4886,11.8267], 'Falzarego Pass (2105m)': [46.5178,12.0072]
};
for (var pass in passes) {
  L.marker(passes[pass], { icon: L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', iconSize: [25,41], iconAnchor: [12,41] }) }).addTo(map).bindPopup(pass);
}

function toggleDay(card) {
  var body = card.querySelector('.day-body');
  var chevron = card.querySelector('.day-chevron');
  var isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  body.style.display = isExpanded ? 'none' : 'block';
  chevron.style.transform = isExpanded ? '' : 'rotate(180deg)';
}

var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;
  sections.forEach(function(sec) {
    var top = sec.offsetTop - 80;
    var bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(function(a) { a.classList.remove('active'); });
      var link = document.querySelector('.nav a[href="#' + sec.id + '"]');
      if (link) link.classList.add('active');
    }
  });
});
