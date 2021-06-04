const subshells = [0, 2, 8, 18, 32];

const getSpin = (nbr) => {
  const subshellIndex = subshells.findIndex((n) => n > nbr) - 1;
  const subshellCapacity =
    subshells[subshellIndex + 1] - subshells[subshellIndex];
  const subshellFilled = nbr + 1 - subshells[subshellIndex];
  return subshellFilled > subshellCapacity / 2 ? SPIN_DOWN : SPIN_UP;
};
