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

  const electronData = getElectronData(recordShell.shell, r);

  d3.select("div.detail .title").text(record.Element);
  d3.select("div.detail .atomicNbr").text(record.AtomicNumber + " protons");
  d3.select("div.detail .neutronNbr").text(
    (+record.AtomicMass - +record.AtomicNumber).toFixed(3) + " neutrons"
  );
  d3.select("div.detail .svg").attr("title", record.Element);
  d3.select("div.detail .phase").attr("src", `../assets/${record.Phase}.svg`);
  d3.select("div.detail .block").text("bloc-" + getBlock(record));
  d3.select("div.detail .footer").html(
    `Découvert en ${record.Year} par <a href="https://www.google.com/search?q=${record.Discoverer}">${record.Discoverer}</a>`
  );

  const shellRadiusList = new Array(shellNbr)
    .fill(0)
    .map((s, i) => (i + 1) * r);
  console.log("shellData: ", shellRadiusList);
  const u = d3
    .select("div.detail svg g")
    .selectAll("circle.shell")
    .data(shellRadiusList);

  u.exit()
    .style("opacity", "1")
    .transition()
    .duration(1000)
    .style("opacity", "0")
    .attr("r", 1000)
    .remove();

  u.enter()
    .append("circle")
    .attr("class", "shell")
    .attr("r", 0)
    .attr("cx", 0)
    .attr("cy", 0)
    .style("opacity", "0")
    .transition()
    .duration(1000)
    .style("opacity", "1")
    .attr("r", (d) => d);

  u.transition()
    .duration(1000)
    .attr("r", (d) => d);

  const e = d3
    .select("div.detail svg g")
    .selectAll("circle.electron")
    .data(electronData);

  e.exit()
    .style("opacity", "1")
    .transition()
    .duration(500)
    .style("opacity", "0")
    .remove();

  e.enter()
    .append("circle")
    .attr("class", "electron")
    .attr("r", 9)
    .style("opacity", "0")
    .transition()
    .duration(1000)
    .style("opacity", "1")
    .attr("cx", (d) => d.cx)
    .attr("cy", (d) => d.cy);

  e.transition()
    .duration(1000)
    .attr("cx", (d) => d.cx)
    .attr("cy", (d) => d.cy);
}

addEventListener("DOMContentLoaded", buildPeriodicTable);
