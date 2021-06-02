console.log("Coucou");

const loadData = () => {
  return new Promise((resolve, reject) => {
    const url = "data.csv";
    Papa.parse(url, {
      download: true,
      header: true,
      complete: function (results) {
        console.log("Finished:", results.data);
        resolve(results.data);
      },
      error: function (err, file, inputElem, reason) {
        console.log("err: ", err);
        reject(err);
      },
    });
  });
};

const buildPeriodicTable = async () => {
  console.log("start");

  const csv = await loadData();
  console.log("csv: ", csv);

  const div = document.querySelector("div.tableau");
  let str = "";
  for (const record of csv) {
    if (record.AtomicNumber === "") {
      continue;
    }
    if (!record.Group) {
      continue;
    }
    console.log("record: ", record);
    const x = 0.5 + (record.Group - 1) * 2.4;
    const y = 0.5 + (record.Period - 1) * 3.4;
    str += `
<div class="element" style="transform: translate(${x}em, ${y}em);">
  <span>${record.Symbol}</span>
</div>`;
  }

  div.innerHTML = str;
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
