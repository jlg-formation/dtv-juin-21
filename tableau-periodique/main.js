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
    if (record.AtomicNumber === "") {
      continue;
    }
    if (!record.Group) {
      continue;
    }

    const x = 0.5 + (record.Group - 1) * 2.4;
    const y = 0.5 + (record.Period - 1) * 3.4;
    const str = `
    <div class="element" style="transform: translate(${x}em, ${y}em);">
      <span>${record.Symbol}</span>
    </div>`;
    array.push(str);
  }

  div.innerHTML = array.join("");
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
