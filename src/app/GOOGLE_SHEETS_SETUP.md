# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to receive enrollment and get started form submissions from EduPulseX.

## 📊 Your Google Sheet

**Sheet URL:** https://docs.google.com/spreadsheets/d/1XZMQMzOjQAD9_UwovsKEXf8mFlaFkwwR90gaeQM8QRI/edit?usp=sharing

## Setup Instructions

### Step 1: Open Your Google Sheet

1. Open the sheet at the URL above
2. Make sure you have edit access to this spreadsheet
3. You should already have the sheet open - if not, create it first

### Step 2: Create Google Apps Script

1. In your Google Sheet, click on `Extensions` → `Apps Script`
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    var rowData = [
      new Date(data.timestamp || new Date()), // Timestamp
      data.name || '',                         // Name
      data.gmail || '',                        // Email
      data.phoneNumber || '',                  // Phone Number
      data.collegeName || '',                  // College Name
      data.crNumber || '',                     // CR Number (for enrollments)
      data.course || '',                       // Course (for enrollments)
      data.coursePrice || '',                  // Course Price (for enrollments)
      data.formType || 'Course Enrollment'     // Form Type
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'message': 'Data added successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'message': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾)
5. Name your project "EduPulseX Data Handler"

### Step 3: Deploy as Web App

1. Click on **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - Description: "EduPulseX Form Handler"
   - Execute as: **Me**
   - Who has access: **Anyone** (important!)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXX/exec
   ```

### Step 4: Add the Webhook URL to EduPulseX

1. In your EduPulseX project, you need to set the environment variable `GOOGLE_SHEETS_WEBHOOK_URL`
2. Go to your Supabase project dashboard
3. Navigate to **Project Settings** → **Edge Functions** → **Environment Variables**
4. Add a new environment variable:
   - **Name**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: The Web App URL you copied in Step 3
5. Click **Save**
6. Redeploy your Edge Functions if necessary

## Testing the Integration

### Test Enrollment Form
1. Go to your EduPulseX Courses page
2. Click "Enroll Now" on any course
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - a new row should appear with the enrollment data

### Test Get Started Form
1. Click any "Get Started" button on the website
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - a new row should appear with the data

## Data Structure

### Course Enrollment Data
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "name": "John Doe",
  "gmail": "john.doe@gmail.com",
  "phoneNumber": "+91 9876543210",
  "collegeName": "ABC Engineering College",
  "crNumber": "21CS001",
  "course": "Python Programming Mastery",
  "coursePrice": "₹999",
  "formType": "Course Enrollment"
}
```

### Get Started Data
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "name": "Jane Smith",
  "gmail": "jane.smith@gmail.com",
  "phoneNumber": "+91 9876543211",
  "collegeName": "XYZ Engineering College",
  "formType": "Get Started"
}
```

## Troubleshooting

### Form submissions not appearing in Google Sheets?
- Check that the Web App URL is correctly set in the environment variable
- Ensure the Apps Script deployment has "Anyone" access
- Check the browser console for error messages
- Verify that the Edge Functions are running (check Supabase logs)

### Authorization errors?
- Re-authorize the Apps Script
- Make sure you selected "Execute as: Me" during deployment
- Check that your Google account has edit access to the sheet

### Duplicate entries?
- Check if the form is being submitted multiple times
- Verify that the success modal is showing after submission
- Look for any JavaScript errors in the browser console

## Additional Features

### Email Notifications
To receive email notifications when someone submits a form, add this to your Apps Script:

```javascript
function doPost(e) {
  // ... existing code ...
  
  // After appending the row, send email
  var emailAddress = "your-email@gmail.com";
  var subject = "New EduPulseX " + (data.formType || "Course Enrollment");
  var message = "New submission received:\n\n" +
                "Name: " + data.name + "\n" +
                "Email: " + data.gmail + "\n" +
                "Phone: " + data.phoneNumber + "\n" +
                "College: " + data.collegeName;
  
  if (data.course) {
    message += "\nCourse: " + data.course;
  }
  
  MailApp.sendEmail(emailAddress, subject, message);
  
  // ... return response ...
}
```

### Data Validation
Add data validation rules in Google Sheets:
- Email column: Data validation → Custom formula → `=REGEXMATCH(C2,"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")`
- Phone column: Data validation → Custom formula → `=REGEXMATCH(D2,"^[+0-9\s-()]{10,}$")`

## Security Notes

⚠️ **Important Security Considerations:**
- The Web App URL is public but should only accept POST requests
- Never expose sensitive API keys in the frontend
- The backend validates all required fields before sending to Google Sheets
- Data is also backed up in the KV store
- Consider adding rate limiting if you experience spam submissions

## Support

If you encounter any issues:
1. Check the Supabase Edge Function logs for errors
2. Verify the Google Apps Script execution logs
3. Test the Web App URL directly using a tool like Postman
4. Ensure all environment variables are correctly set

---

For more information, contact: support@edupulsex.com