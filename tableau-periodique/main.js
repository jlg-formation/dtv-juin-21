console.log("Coucou");

const buildPeriodicTable = () => {
  console.log("start");
  const div = document.querySelector("div.tableau");
  div.innerHTML =
    '<div class="element" style="transform: translate(5em, 2em);"><span>H</span></div>';
};

addEventListener("DOMContentLoaded", buildPeriodicTable);
