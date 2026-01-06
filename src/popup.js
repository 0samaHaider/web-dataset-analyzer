document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");
  const exportBtn = document.getElementById("exportBtn");

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab.id) return;

    chrome.tabs.sendMessage(tab.id, { type: "EXTRACT_DATA" }, response => {
      if (chrome.runtime.lastError || !response) {
        status.innerText = "❌ No dataset found";
        status.style.color = "#dc2626"; // red
        exportBtn.disabled = true;
        return;
      }

      status.innerText = "✅ Dataset detected";
      status.style.color = "#16a34a"; // green
      document.getElementById("stats").style.display = "block";

      document.getElementById("rows").innerText =
        `Rows: ${response.stats.rows}`;
      document.getElementById("cols").innerText =
        `Columns: ${response.stats.columns}`;
      document.getElementById("missing").innerText =
        `Missing %: ${response.stats.missingPercentage}`;
      document.getElementById("duplicates").innerText =
        `Duplicate rows: ${response.stats.duplicateRows}`;

      exportBtn.disabled = false;

      exportBtn.onclick = () => exportExcel(response);
    });
  });
});

function exportExcel(payload) {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Raw Data
  const dataSheet = XLSX.utils.json_to_sheet(payload.data);
  XLSX.utils.book_append_sheet(wb, dataSheet, "Data");

  // Sheet 2: Dataset Statistics
  const statsSheetData = [
    {
      "Metric": "Rows",
      "Value": payload.stats.rows
    },
    {
      "Metric": "Columns",
      "Value": payload.stats.columns
    },
    {
      "Metric": "Missing %",
      "Value": payload.stats.missingPercentage
    },
    {
      "Metric": "Duplicate Rows",
      "Value": payload.stats.duplicateRows
    }
  ];

  const statsSheet = XLSX.utils.json_to_sheet(statsSheetData);
  XLSX.utils.book_append_sheet(wb, statsSheet, "Statistics");

  XLSX.writeFile(wb, "dataset_with_stats.xlsx");
}
