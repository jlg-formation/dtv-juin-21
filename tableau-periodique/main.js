console.log("Coucou");

const loadData = () => {
  return new Promise((resolve, reject) => {
    const url = "data.csv";
    Papa.parse(url, {
      download: true,
      complete: function (results) {
        console.log("Finished:", results.data);
        resolve(results);
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
  div.innerHTML =
    '<div class="element" style="transform: translate(5em, 2em);"><span>H</span></div>';
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
