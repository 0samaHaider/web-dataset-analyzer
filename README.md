The **Web Dataset Analyzer** is a Chrome extension designed for **data scientists and analysts**. It allows you to:

* Quickly detect tables (datasets) on any webpage
* Analyze dataset quality and statistics
* Export both raw data and stats to **Excel format**

The extension ensures accuracy by **detecting only real datasets**, ignoring empty or layout tables.

---

## 🔹 Features

1. **Dataset Detection**

   * Automatically detects HTML tables on the page
   * Validates tables using:

     * Minimum 2 rows (header + data)
     * Minimum 2 columns
     * At least one non-empty data cell
   * Prevents false positives from layout or empty tables

2. **Dataset Analysis**

   * Computes dataset statistics:

     * Total rows
     * Total columns
     * Missing values percentage
     * Number of duplicate rows

3. **Popup Insights**

   * Shows dataset detection status:

     * ✅ Dataset detected (green)
     * ❌ No dataset found (red)
   * Displays statistics in a clean, modern popup
   * Dynamically enables/disables the **Export** button

4. **Data Export**

   * Exports dataset as an **Excel file (`.xlsx`)**
   * Contains two sheets:

     * Sheet 1: Raw data
     * Sheet 2: Dataset statistics
   * Safe filename generated (fallback to table header, page title, or hostname)

5. **Safe Chrome Messaging**

   * Uses `chrome.runtime.lastError` checks to prevent runtime errors
   * Works reliably even on pages with no datasets

6. **Modern UI Design**

   * Clean, intuitive popup
   * Footer shows: `Developed by Osama Haider` with LinkedIn link

---

## 🔹 How to Use

1. **Download the extension code**

   * Click **Code → Download ZIP** on this GitHub repository
   * Extract the folder to a convenient location on your computer

2. **Load the extension in Chrome**

   * Open Chrome and go to:

     ```
     chrome://extensions
     ```
   * Turn on **Developer mode** (top-right toggle)
   * Click **Load unpacked** → select the folder where you extracted the extension

3. **Use the extension**

   * Open any webpage containing tables
   * Click the **Web Dataset Analyzer** icon in the Chrome toolbar
   * The popup will display:

     * Dataset detection status
     * Dataset statistics

4. **Export data**

   * Click **Export Excel** to download the dataset along with statistics

---

## 🔹 Limitations (for now)

* Only works on **HTML table datasets**
* Does not scrape **dynamically loaded tables** (e.g., via JavaScript frameworks) unless they are present in the DOM
* Exported filename does not yet include **table heading or host automatically**

Do you want me to do that?
