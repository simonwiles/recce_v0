const image = document.getElementById("image");
const searchInput = document.getElementById("search");
searchInput.value = "";

const scale = 4416 / 1000;
const scale_coords = (vertices, scale) =>
  vertices.map(([x, y]) => [x / scale, 1 - y / scale]);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

const drawFeature = (feature, ctx) => {
  const vertices = scale_coords(feature.geometry.coordinates[0], scale);
  ctx.beginPath();
  ctx.moveTo(vertices[0][0], vertices[0][1]);
  vertices.slice(1).forEach(([x, y]) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  });
  ctx.closePath();
};

const drawFeatures = (query) => {
  ctx.clearRect(0, 0, 1000, 750);
  features.forEach((feature) => {
    ctx.strokeStyle =
      query && query.test(feature.properties.text) ? "#0f0" : "#f004";
    drawFeature(feature, ctx);
  });
};

const features = await fetch("./1586 Aberdeen.geojson")
  .then((response) => response.json())
  .then((data) => data.features);

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

searchInput.addEventListener("input", () => {
  drawFeatures(
    searchInput.value
      ? new RegExp(escapeRegExp(searchInput.value), "i")
      : false,
  );
});

drawFeatures();
