const getAngle = (shellArray, i, j) => {
  return ((360 / shellArray[i]) * j * Math.PI) / 180;
};

const angleStart = [0, 30, 100, 200];

const getAngle2 = (nbr, total) => {
  const subshellIndex = subshells.findIndex((n) => n > nbr) - 1;

  const subshellCapacity =
    subshells[subshellIndex + 1] - subshells[subshellIndex];
  const subshellFilled = nbr + 1 - subshells[subshellIndex];
  const orbitalNbr = subshellFilled % (subshellCapacity / 2);

  const spin = getSpin(nbr);

  return (
    -(angleStart[subshellIndex] + orbitalNbr * 20 + spin * 5) * (Math.PI / 180)
  );
};
