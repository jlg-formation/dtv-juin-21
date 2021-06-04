const getElectronsSvg = (shell, r) => {
  console.log("shell: ", shell);

  const shellArray = shell.split("-");
  console.log("shellArray: ", shellArray);

  const array = [];

  for (let i = 0; i < shellArray.length; i++) {
    console.log("shellArray[i]: ", shellArray[i]);
    for (let j = 0; j < shellArray[i]; j++) {
      const angle = ((360 / shellArray[i]) * j * Math.PI) / 180;
      const cx = r * (i + 1) * Math.cos(angle);
      const cy = r * (i + 1) * Math.sin(angle);
      const spin = getSpin(j);
      console.log("spin: ", spin);
      const result = `
        <circle class="electron" r="9" cy="${cy}" cx="${cx}" fill="hsl(0, 100%, ${
        50 - spin * 40
      }%)"/>
        `;
      array.push(result);
    }
  }

  return array.join("");
};

const getElectronData = (shell, r) => {
  console.log("shell: ", shell);

  const shellArray = shell.split("-");
  console.log("shellArray: ", shellArray);

  const array = [];

  for (let i = 0; i < shellArray.length; i++) {
    console.log("shellArray[i]: ", shellArray[i]);
    for (let j = 0; j < shellArray[i]; j++) {
      const angle = ((360 / shellArray[i]) * j * Math.PI) / 180;
      const cx = r * (i + 1) * Math.cos(angle);
      const cy = r * (i + 1) * Math.sin(angle);
      const spin = getSpin(j);
      console.log("spin: ", spin);
      const result = { cx: cx, cy: cy, spin };
      array.push(result);
    }
  }

  return array;
};
