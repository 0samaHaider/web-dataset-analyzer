// -----------------------------
// Validate tables: must have at least 2 rows and 2 columns
function getValidTables() {
  return Array.from(document.querySelectorAll("table"))
    .filter(table => {
      const rows = table.querySelectorAll("tr");
      if (rows.length < 2) return false; // header + 1 data row

      const firstRowCells = rows[0].querySelectorAll("th, td");
      if (firstRowCells.length < 2) return false; // at least 2 columns

      // Check if table has at least one non-empty cell
      const hasData = Array.from(rows).some(row => {
        const cells = row.querySelectorAll("td");
        return Array.from(cells).some(cell => cell.innerText.trim() !== "");
      });
      if (!hasData) return false;

      return true;
    });
}

// -----------------------------
// Extract table data and compute stats
function extractTableData() {
  const tables = getValidTables();
  if (!tables.length) return null; // No valid dataset

  // Pick the largest table (by number of rows)
  let largestTable = tables[0];
  let maxRows = 0;

  tables.forEach(table => {
    const rows = table.querySelectorAll("tr").length;
    if (rows > maxRows) {
      maxRows = rows;
      largestTable = table;
    }
  });

  const rows = Array.from(largestTable.querySelectorAll("tr"));
  const headers = Array.from(rows[0].querySelectorAll("th, td"))
    .map(cell => cell.innerText.trim())
    .filter(h => h); // remove empty headers

  if (headers.length < 2) return null; // not enough columns

  const data = rows.slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll("td"));
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i]?.innerText.trim() || "";
    });
    return obj;
  }).filter(row => 
    Object.values(row).some(v => v !== "") // keep rows with at least 1 non-empty cell
  );

  if (!data.length) return null; // no valid data rows

  return analyzeData(data);
}

// -----------------------------
// Analyze dataset: missing values, duplicates, etc.
function analyzeData(data) {
  const rowCount = data.length;
  const columns = Object.keys(data[0] || {});
  const colCount = columns.length;

  let missing = 0;
  let duplicates = 0;

  const seen = new Set();

  data.forEach(row => {
    const key = JSON.stringify(row);
    if (seen.has(key)) duplicates++;
    seen.add(key);

    columns.forEach(col => {
      if (!row[col]) missing++;
    });
  });

  const totalCells = rowCount * colCount;
  const missingPct = totalCells
    ? ((missing / totalCells) * 100).toFixed(2)
    : 0;

  return {
    data,
    stats: {
      rows: rowCount,
      columns: colCount,
      missingPercentage: missingPct,
      duplicateRows: duplicates
    }
  };
}

// -----------------------------
// Listen for popup requests
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "EXTRACT_DATA") {
    sendResponse(extractTableData());
  }
});
