const getBlock = (record) => {
  if (record.AtomicNumber === "2") {
    return "s";
  }
  if ([1, 2].includes(+record.Group)) {
    return "s";
  }
  if ([13, 14, 15, 16, 17, 18].includes(+record.Group)) {
    return "p";
  }
  if ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(+record.Group)) {
    return "d";
  }
  if (record.Group === "") {
    return "f";
  }
  throw new Error("bloc not found");
};
