import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const entries = [
    'Burger',
    'Pizza',
    'Tacos',
    'Sushi',
    'Kebab',
    'Naan',
    'Wraps',
]

// Dimensions
const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

// Color scale
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Create SVG container
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    // Center the pie chart
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .append("g")

// Create pie layout
const pie = d3.pie().value(1);

// Generate pie slices
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Create pie chart
const slices = svg.selectAll("path")
    .data(pie(entries))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i))
    .attr("stroke", "white")
    .attr("stroke-width", 2);

// Add labels to the slices
const labelArc = d3.arc().innerRadius(radius * 0.7).outerRadius(radius * 0.7);

svg.selectAll("text")
    .data(pie(entries))
    .enter()
    .append("text")
    .attr("transform", (d) => `translate(${labelArc.centroid(d)}) rotate(${((d.startAngle + d.endAngle) / 2 * 180 / Math.PI) - 90})`)
    .attr("text-anchor", "middle")
    .text((d) => d.data);


function rotTween(to) {
    let i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}

let oldrotation = 0;
let rotation = 0;

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('start').style.cursor = 'default';
    document.getElementById('start').id = null;

    for (let i = 0; i < 100; i++) {
        // Rotate by keeping translation the same, but adjusting the rotation
        rotation = Math.floor(Math.random() * 900 + 1200);
        svg.transition()
            .duration(7000)
            .attrTween("transform", rotTween)
            .on("end", function () {
                oldrotation = rotation;

                window.setTimeout(() => {
                    const overlay = document.getElementById('overlay');
                    overlay.style.visibility = 'visible';
                    overlay.style.opacity = 1;
                }, 700);
            });
    }
});
