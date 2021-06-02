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
}

addEventListener("DOMContentLoaded", buildPeriodicTable);
