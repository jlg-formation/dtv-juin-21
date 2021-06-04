const buildPeriodicTable = async () => {
  csv = await d3.csv("data/elements.csv");
  electronShellCsv = await d3.csv("data/electron-shell.csv");

  data = csv.filter((record) => record.AtomicNumber && record.Group);
  console.log("data: ", data);

  let alreadyDone = false;
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
    // .on("click", showElementDetail)
    .transition()
    .delay(0)
    .duration(1000)
    .attr("style", function (record) {
      const x = 0.5 + (record.Group - 1) * (2.5 + 0.2);
      const y = 0.5 + (record.Period - 1) * (3.5 + 0.2);
      return `transform: translate(${x}em, ${y}em);`;
    })
    .on("end", () => {
      if (!alreadyDone) {
        alreadyDone = true;
        initDetails();
        d3.selectAll("div.command input").on("input", updateTableau);
      }
    });
};

const initDetails = () => {
  const elt = d3.select("div.element[title='Aluminum (13)']").node();
  elt.classList.add("active");
  console.log("elt: ", elt);

  const symbol = d3
    .select("div.element[title='Aluminum (13)']")
    .select("div.symbol")
    .text();
  console.log("symbol: ", symbol);
  const record = csv.find((r) => r.Symbol === symbol);
  const recordShell = electronShellCsv.find(
    (r) => r.atomicNbr === record.AtomicNumber
  );
  console.log("record: ", record);
  console.log("recordShell: ", recordShell);

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

  const div = d3.select("div.detail").html(`
    
    <div class="title">${record.Element}</div>
    <div class="atomicNbr">${record.AtomicNumber} protons</div>
    <div class="neutronNbr">${(
      +record.AtomicMass - +record.AtomicNumber
    ).toFixed(3)} neutrons </div>
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
   
    `);
};
