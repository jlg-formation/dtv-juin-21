const getAngle = (shellArray, i, j) => {
  return ((360 / shellArray[i]) * j * Math.PI) / 180;
};

const angleStart = [0, 30, 100, 200];

const getAngle2 = (nbr) => {
  const subshellIndex = subshells.findIndex((n) => n > nbr) - 1;

  const subshellCapacity =
    subshells[subshellIndex + 1] - subshells[subshellIndex];
  const subshellFilled = nbr + 1 - subshells[subshellIndex];

  return -(angleStart[subshellIndex] + subshellFilled * 10) * (Math.PI / 180);
};
