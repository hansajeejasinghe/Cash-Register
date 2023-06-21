function checkCashRegister(price, cash, cid) {
  const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  let changeDue = cash - price;
  let change = [];
  let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);

  if (totalCID < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (totalCID === changeDue) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse();
    for (let i = 0; i < cid.length; i++) {
      let currencyName = cid[i][0];
      let currencyAmount = cid[i][1];
      let currencyValue = currencyUnit[currencyName];
      let currencyCount = Math.floor(currencyAmount / currencyValue);
      let currencyToReturn = 0;

      while (changeDue >= currencyValue && currencyCount > 0) {
        changeDue -= currencyValue;
        changeDue = Math.round(changeDue * 100) / 100;
        currencyCount--;
        currencyToReturn++;
      }

      if (currencyToReturn > 0) {
        change.push([currencyName, currencyValue * currencyToReturn]);
      }
    }

    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: change };
  }
}