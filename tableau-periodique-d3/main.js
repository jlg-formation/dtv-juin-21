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
  d3.selectAll("div.element")
    .nodes()
    .forEach((elt) => elt.classList.remove("active"));
  this.classList.add("active");

  const symbol = d3.select(this).select("div.symbol").text();
  const record = csv.find((r) => r.Symbol === symbol);
  const recordShell = electronShellCsv.find(
    (r) => r.atomicNbr === record.AtomicNumber
  );
  console.log("record: ", record);
  console.log("recordShell: ", recordShell);

  const shellNbr = +record.NumberofShells;
  const r = (record.AtomicRadius * 80) / shellNbr;
  console.log("record.NumberofShells: ", record.NumberofShells);

  const electrons = getElectronsSvg(recordShell.shell, r);

  d3.select("div.detail .title").text(record.Element);
  d3.select("div.detail .atomicNbr").text(record.AtomicNumber + " protons");
  d3.select("div.detail .neutronNbr").text(
    (+record.AtomicMass - +record.AtomicNumber).toFixed(3) + " neutrons"
  );

  d3.select("div.detail .svg").attr("title", record.Element);
  d3.select("div.detail .phase").attr("src", `../assets/${record.Phase}.svg`);
  d3.select("div.detail .footer").html(
    `Découvert en ${record.Year} par <a href="https://www.google.com/search?q=${record.Discoverer}">${record.Discoverer}</a>`
  );

  const shellData = new Array(shellNbr).fill(0).map((s, i) => (i + 1) * r);
  d3.select("div.detail svg g")
    .selectAll("circle.shell")
    .data(shellData, function (d, i) {
      return i;
    })
    .enter()
    .append("circle")
    .attr("class", "shell")
    .attr("r", (d) => d)
    .attr("cx", 0)
    .attr("cy", 0);
}

addEventListener("DOMContentLoaded", buildPeriodicTable);
