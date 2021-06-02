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
  const csv = await loadData();

  const div = document.querySelector("div.tableau");
  const array = [];
  for (const record of csv) {
    console.log("record: ", record);
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
      title="${record.Element}">
      <div class="symbol">${record.Symbol}</div>
      <div
        class="circle"
        style="transform: scale(${scale});"
      ></div>
    </div>`;
    array.push(str);
  }

  div.innerHTML = array.join("");
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
