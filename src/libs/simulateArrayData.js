export function simulateArrayData() {
  let dataArray = {};
  return function (newData) {
    if (newData !== undefined) {
      const oldData = dataArray[newData.symbol];
      dataArray[newData.symbol] = JSON.parse(JSON.stringify(newData));
      if (newData.lastPrice > oldData?.lastPrice) {
        return true;
      } else if (newData.lastPrice < oldData?.lastPrice) {
        return false;
      } else {
        return true;
      }
    }
  };
}
