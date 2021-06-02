let csv;

const loadData = () => {
  return new Promise((resolve, reject) => {
    const url = "data.csv";
    Papa.parse(url, {
      download: true,
      header: true,
      complete: function (results) {
        resolve(results.data);
      },
      error: function (err, file, inputElem, reason) {
        reject(err);
      },
    });
  });
};

const buildPeriodicTable = async () => {
  csv = await loadData();

  const div = document.querySelector("div.tableau");
  const array = [];
  for (const record of csv) {
    if (record.AtomicNumber === "") {
      continue;
    }
    if (!record.Group) {
      continue;
    }

    const x = 0.5 + (record.Group - 1) * (2.5 + 0.2);
    const y = 0.5 + (record.Period - 1) * (3.5 + 0.2);
    if (!record.AtomicRadius) {
      record.AtomicRadius = 0;
    }
    const scale = record.AtomicRadius / 3.3;
    const str = `
    <div
      class="element"
      style="transform: translate(${x}em, ${y}em);"
      title="${record.Element} (${record.AtomicNumber})">
      <div class="symbol">${record.Symbol}</div>
      <div
        class="circle"
        style="transform: scale(${scale});"
      ></div>
    </div>`;
    array.push(str);
  }

  div.innerHTML = array.join("");

  const elementsDiv = document.querySelectorAll("div.element");
  elementsDiv.forEach((elt) =>
    elt.addEventListener("click", showElementDetail)
  );
};

function showElementDetail(evt) {
  const symbol = this.querySelector("div.symbol").innerHTML;
  const record = csv.find((r) => r.Symbol === symbol);
  console.log("record: ", record);
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

  const angle = (150 * Math.PI) / 180;
  const cx = r * Math.cos(angle);
  const cy = r * Math.sin(angle);
  div.innerHTML = `
  <svg viewBox="-300 -300 600 600">
 <g>
 ${shells}
  <circle class="nucleus" r="10" cy="0" cx="0"  />
  <circle class="electron" r="9" cy="${cy}" cx="${cx}" />
 </g>
</svg>
  `;
}

addEventListener("DOMContentLoaded", buildPeriodicTable);
