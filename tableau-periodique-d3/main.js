let csv;
let electronShellCsv;
let data;

const buildPeriodicTable = async () => {
  csv = await d3.csv("data/elements.csv");
  electronShellCsv = await d3.csv("data/electron-shell.csv");

  data = csv.filter((record) => record.AtomicNumber && record.Group);
  console.log("data: ", data);
  d3.select("div.tableau")
    .selectAll("div.element")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "element")
    .attr("style", `transform: translate(0, 0);`)
    .attr("title", function (record) {
      return `${record.Element} (${record.AtomicNumber})`;
    })
    .html(function (record) {
      if (!record.AtomicRadius) {
        record.AtomicRadius = 0;
      }
      const scale = record.AtomicRadius / 3.3;

      const circle = `
      <div
      class="circle"
      style="transform: scale(${scale});"
    ></div>
      `;

      const picto = `
      <img class="picto" src="../assets/${record.Phase}.svg" style="opacity: 0">
      `;

      return `
      <div class="symbol">${record.Symbol}</div>
      ${circle}
      ${picto}
      `;
    })
    .on("click", showElementDetail)
    .transition()
    .delay(0)
    .duration(1000)
    .attr("style", function (record) {
      const x = 0.5 + (record.Group - 1) * (2.5 + 0.2);
      const y = 0.5 + (record.Period - 1) * (3.5 + 0.2);
      return `transform: translate(${x}em, ${y}em);`;
    })
    .on("end", () => {
      const elt = document.querySelector("div.element[title='Aluminum (13)']");
      console.log("elt: ", elt);
      showElementDetail.bind(elt)();
    });

  const commands = document.querySelectorAll("div.command input");
  commands.forEach((c) => c.addEventListener("input", updateTableau));
};

function updateTableau() {
  console.log("this: ", this.value);
  const value = this.value;

  d3.select("div.tableau")
    .selectAll("div.element")
    .data(data)
    .attr("title", function (record) {
      if (value === "radius") {
        return `${record.Element} (${record.AtomicNumber})`;
      }
      return `${record.Element} (${record.Phase})`;
    });

  d3.select("div.tableau")
    .selectAll("div.element .circle")
    .data(data)
    .style("opacity", value === "radius" ? 1 : 0);

  d3.select("div.tableau")
    .selectAll("div.element .picto")
    .data(data)
    .style("opacity", value === "phase" ? 1 : 0);
}

function showElementDetail() {
  document
    .querySelectorAll("div.element")
    .forEach((elt) => elt.classList.remove("active"));
  this.classList.add("active");
  const symbol = this.querySelector("div.symbol").innerHTML;
  const record = csv.find((r) => r.Symbol === symbol);
  const recordShell = electronShellCsv.find(
    (r) => r.atomicNbr === record.AtomicNumber
  );
  console.log("record: ", record);
  console.log("recordShell: ", recordShell);
  const div = document.querySelector("div.detail");

  const shellNbr = +record.NumberofShells;
  const r = (record.AtomicRadius * 80) / shellNbr;
  console.log("record.NumberofShells: ", record.NumberofShells);
  const shellArray = new Array(shellNbr).fill(0).map(
    (s, i) => `
    <circle class="shell" r="${(i + 1) * r}" cy="0" cx="0" />
    `
  );
  console.log("shellArray: ", shellArray);

  const shells = shellArray.join("");

  const electrons = getElectronsSvg(recordShell.shell, r);

  div.innerHTML = `
  
  <div class="title">${record.Element}</div>
  <div class="atomicNbr">${record.AtomicNumber} protons</div>
  <div class="neutronNbr">${(+record.AtomicMass - +record.AtomicNumber).toFixed(
    3
  )} neutrons </div>
  <div class="svg" title="${record.Element}">
    <img class="phase" src="../assets/${record.Phase}.svg">
    <svg viewBox="-300 -300 600 600">
      <g>
  ${shells}
        <circle class="nucleus" r="10" cy="0" cx="0"  />
  ${electrons}
      </g>
    </svg>
  </div>
  <div class="footer">Découvert en ${
    record.Year
  } par <a href="https://www.google.com/search?q=${record.Discoverer}">${
    record.Discoverer
  }</a></div>
 
  `;
}

const getElectronsSvg = (shell, r) => {
  console.log("shell: ", shell);

  const shellArray = shell.split("-");
  console.log("shellArray: ", shellArray);

  const array = [];

  for (let i = 0; i < shellArray.length; i++) {
    console.log("shellArray[i]: ", shellArray[i]);
    for (let j = 0; j < shellArray[i]; j++) {
      const angle = ((360 / shellArray[i]) * j * Math.PI) / 180;
      const cx = r * (i + 1) * Math.cos(angle);
      const cy = r * (i + 1) * Math.sin(angle);
      const result = `
      <circle class="electron" r="9" cy="${cy}" cx="${cx}" />
      `;
      array.push(result);
    }
  }

  return array.join("");
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
