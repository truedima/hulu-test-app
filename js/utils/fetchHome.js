const fetchData = async () => {
  try {
    const response = await fetch(
      "https://d1q0vy0v52gyjr.cloudfront.net/hub.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const {processedRows, emptyRows} = processData(data);
    drawUI(processedRows);
    emptyRows.forEach(async (rowId) => {
      const responseRow = await fetch(
        `https://d1q0vy0v52gyjr.cloudfront.net/collections/${rowId}.json`
      );
      if (!responseRow.ok) {
        throw new Error(`HTTP error! Status: ${responseRow.status}`);
      }
      const dataRow = await responseRow.json();
      drawUI([processRow(dataRow)], true);
    });
  } catch (error) {
    console.error(error);
  }
};
