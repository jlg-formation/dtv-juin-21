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
      const result = `
        <circle class="electron" r="9" cy="${cy}" cx="${cx}" />
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
      const result = { cx: cx, cy: cy };
      array.push(result);
    }
  }

  return array;
};
