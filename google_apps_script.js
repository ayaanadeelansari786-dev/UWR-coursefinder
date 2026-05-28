/**
 * ================================================================
 * UWR Course Finder – Google Apps Script (Server-side)
 * ================================================================
 * 
 * HOW TO SET UP:
 * 
 * 1. Go to https://sheets.google.com and create a new Google Sheet.
 * 
 * 2. Name the sheet tab "Enrollments" (bottom tab label).
 * 
 * 3. In Row 1, add these column headers (A1 through M1):
 *    A1: Confirmation ID
 *    B1: Timestamp
 *    C1: Parent Name
 *    D1: Child Name
 *    E1: Phone
 *    F1: Email
 *    G1: Selected Course
 *    H1: Course ID
 *    I1: Age Range
 *    J1: Experience Level
 *    K1: Primary Goal
 *    L1: Interests
 *    M1: Schedule Preference
 * 
 * 4. Open Extensions > Apps Script.
 * 
 * 5. Delete any existing code and paste this ENTIRE file.
 * 
 * 6. Click the 💾 Save icon (or Ctrl+S).
 * 
 * 7. Click Deploy > New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 * 
 * 8. Copy the Web App URL it gives you. It looks like:
 *    https://script.google.com/macros/s/AKfycbx.../exec
 * 
 * 9. Paste that URL into app.js where it says:
 *    const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL";
 * 
 * That's it! Every enrollment will now auto-populate your Google Sheet.
 * ================================================================
 */

/**
 * Handles incoming POST requests from the UWR Course Finder app.
 * Appends a new row to the "Enrollments" sheet.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enrollments");
    
    // If the "Enrollments" sheet doesn't exist, create it with headers
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Enrollments");
      sheet.appendRow([
        "Confirmation ID",
        "Timestamp",
        "Parent Name",
        "Child Name",
        "Phone",
        "Email",
        "Selected Course",
        "Course ID",
        "Age Range",
        "Experience Level",
        "Primary Goal",
        "Interests",
        "Schedule Preference"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Append the enrollment data as a new row
    sheet.appendRow([
      data.confirmationId   || "",
      data.timestamp         || new Date().toISOString(),
      data.parentName        || "",
      data.childName         || "",
      data.phone             || "",
      data.email             || "",
      data.selectedCourse    || "",
      data.courseId           || "",
      data.ageRange          || "",
      data.experienceLevel   || "",
      data.primaryGoal       || "",
      data.interests         || "",
      data.schedulePreference || ""
    ]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Enrollment saved." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error details
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (optional – useful for quick browser testing).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "UWR Enrollment endpoint is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
