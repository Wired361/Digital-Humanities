//waypoints scroll constructor
function scroll(n, offset, func1, func2) {
  return new Waypoint({
    element: document.getElementById(n),
    handler: function(direction) {
      switch (direction) {
        case 'down':
          func1();
          break;

        case 'up':
          func2();
          break;
      }
    },
    // offset starts from the top of the div

    offset: offset
  });
}
// Data Wrangling

let data1900 = d3
  .json('/maps/1917')
  .then(function(response) {
      response.map(function (d) {
          d.latLng = [parseFloat(d.Longitude), parseFloat(d.Latitude)];
          return d;
  });
//baseLayers

let light = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution: '',
    maxZoom: 19,
    id: 'light-v10',
    username: 'Wired361',
    accessToken:
      'pk.eyJ1Ijoid2lyZWQzNjEiLCJhIjoiY2p0bGlteGppMGI2dzRicGthbWRjNGhhdSJ9.RopVXgG4fVgIXJ0_1FPdHQ'
  }
);

//data1900 = dataGrab(1900);
let data1900 = dataGrab1900.map(function(d) {
  d.latLng = [parseFloat(d.Longitude), parseFloat(d.Latitude)];
  return d;
});
console.log(data1900);

//D3 overlayLayers
//1900
let dots1900 = L.d3SvgOverlay(function(selection, projection) {
  var ppl1900 = selection.selectAll('circle').data(data1900);
  ppl1900
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function x(d) {
      return projection.latLngToLayerPoint(d.latLng).x;
    })
    .attr('cy', function y(d) {
      return projection.latLngToLayerPoint(d.latLng).y;
    })
    .attr('fill', (d, i) => (d["Race_Color"]=='B' ? 'var(--prussian-blue)' : 'var(--red-inactive)'))
    .attr('opacity', 0.75);
});
/* //1907
let dots1907 = L.d3SvgOverlay(function(selection, projection) {
  var ppl1907 = selection.selectAll('circle').data(data1907);
  ppl1907
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function x(d) {
      return projection.latLngToLayerPoint(d.latLng).x;
    })
    .attr('cy', function y(d) {
      return projection.latLngToLayerPoint(d.latLng).y;
    })
    .style('fill', 'black')
    .attr('opacity', 0.75);
});
//1908
let dots1908 = L.d3SvgOverlay(function(selection, projection) {
  var ppl1908 = selection.selectAll('circle').data(data1908);
  ppl1908
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function x(d) {
      return projection.latLngToLayerPoint(d.latLng).x;
    })
    .attr('cy', function y(d) {
      return projection.latLngToLayerPoint(d.latLng).y;
    })
    .style('fill', 'black')
    .attr('opacity', 0.75);
});
//1915
let dots1915 = L.d3SvgOverlay(function(selection, projection) {
  var ppl1915 = selection.selectAll('circle').data(data1915);
  ppl1915
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function x(d) {
      return projection.latLngToLayerPoint(d.latLng).x;
    })
    .attr('cy', function y(d) {
      return projection.latLngToLayerPoint(d.latLng).y;
    })
    .style('fill', 'black')
    .attr('opacity', 0.75);
});
//1917
let dots1917 = L.d3SvgOverlay(function(selection, projection) {
  var ppl1917 = selection.selectAll('circle').data(data1917);
  ppl1917
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function x(d) {
      return projection.latLngToLayerPoint(d.latLng).x;
    })
    .attr('cy', function y(d) {
      return projection.latLngToLayerPoint(d.latLng).y;
    })
    .style('fill', 'black')
    .attr('opacity', 0.75);
});
 */
//Res overlay
let resOutline = L.curve(
  [
    'M',
    [29.76099, -95.37625],
    'C',
    [29.7608, -95.3779],
    [29.7625, -95.3774],
    [29.7623, -95.3794],
    'Q',
    [29.76215, -95.38025],
    [29.762, -95.38027],
    'V',
    [29.75952],
    'H',
    [-95.37937],
    'V',
    [29.75872],
    'H',
    [-95.37845],
    'V',
    [29.75832],
    'H',
    [-95.37625],
    'Z'
  ],
  { color: 'red', 'border-style': 'dotted', fill: true, animate: 2000 }
);

//Heat Layers

//heatLayer 1900
let heat1900 = L.heatLayer(data1900, {
  radius: 25,
  blur: 35
});
/* 
let heat1907 = L.heatLayer(data1907, {
  radius: 25,
  blur: 35
});
let heat1908 = L.heatLayer(data1908, {
  radius: 25,
  blur: 35
});
let heat1915 = L.heatLayer(data1915, {
  radius: 25,
  blur: 35
});
let heat1917 = L.heatLayer(data1917, {
  radius: 25,
  blur: 35
});
 */
//Map Set up

let resMap = L.map('map', {
  center: [29.76, -95.378],
  zoom: 17,
  layers: [light, resOutline, dots1900],
  scrollWheelZoom: false,
  attributionControl: false
});
var overlayMaps = {
  Reservation: resOutline,
  '1900 Homes': dots1900,
  '1900 Heatmap': heat1900
};

L.control.layers(overlayMaps).addTo(resMap);

console.log(data1900);

/* var trace1 = {
  x: ['1900', '1910', '1920'],
  y: [193, 28, 352],
  name: 'Child(0-11)',
  type: 'bar'
};

var trace2 = {
  x: ['1900', '1910', '1920'],
  y: [137, 43, 299],
  name: '12-19',
  type: 'bar'
};

var trace3 = {
  x: ['1900', '1910', '1920'],
  y: [273, 132, 1473],
  name: '20-40',
  type: 'bar'
};

var trace4 = {
  x: ['1900', '1910', '1920'],
  y: [111, 32, 374],
  name: '40-65',
  type: 'bar'
};

var trace5 = {
  x: ['1900', '1910', '1920'],
  y: [15, 3, 40],
  name: 'Above 65',
  type: 'bar'
};

var data = [trace1, trace2, trace3, trace4, trace5];
var layout = { barmode: 'group' };

var layout = {
  title: 'Age Group of Black Population for Years 1910-1920',

  xaxis: {
    title: {
      text: 'Year'
    }
  },
  yaxis: {
    title: {
      text: 'Count'
    }
  }
};

Plotly.newPlot('myDiv', data, layout, {}, { showSendToCloud: true }); */

/* 
//Declarations
let svg = d3
  .select('svg')
  .attr('width', 500)
  .attr('height', 1000);

let group = svg
  .selectAll('g')
  .data(data1900)
  .enter()
  .append('g');

let rects = group.append('rect');

//set up grid spacing
let spacing = 40;
let rows = 15;
let column = 10
 */