export function changeA(a) {
  return {
    type: 'A_CHANGE',
    data: {a}
  };
}

export function changeB(b) {
  return {
    type: 'B_CHANGE',
    data: b
  };
}

export function changeC(c) {
  return {
    type: 'C_CHANGE',
    data: c
  };
}
