# ⚡ Quick Setup - Your Google Sheet Integration

## 📋 Your Google Sheet
**https://docs.google.com/spreadsheets/d/1XZMQMzOjQAD9_UwovsKEXf8mFlaFkwwR90gaeQM8QRI/edit?usp=sharing**

---

## Step 1️⃣: Add Column Headers

Open your Google Sheet and add these headers in **Row 1**:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone Number | College Name | CR Number | Course | Course Price | Form Type |

---

## Step 2️⃣: Add Apps Script

1. In your Google Sheet, click: **Extensions** → **Apps Script**
2. Delete any existing code
3. **Copy and paste this entire code:**

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var rowData = [
      new Date(data.timestamp || new Date()),
      data.name || '',
      data.gmail || '',
      data.phoneNumber || '',
      data.collegeName || '',
      data.crNumber || '',
      data.course || '',
      data.coursePrice || '',
      data.formType || 'Course Enrollment'
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name it: "EduPulseX Handler"

---

## Step 3️⃣: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the ⚙️ icon → Select **Web app**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone ⚠️ (Important!)
4. Click **Deploy**
5. Authorize:
   - Click **Authorize access**
   - Select your Google account
   - Click **Advanced** → **Go to project (unsafe)**
   - Click **Allow**
6. **📋 COPY THE WEB APP URL** - You'll need this!
   - It looks like: `https://script.google.com/macros/s/XXXXXXXXXXX/exec`

---

## Step 4️⃣: Add URL to Supabase

1. Go to your **Supabase Dashboard**
2. Click **Project Settings** → **Edge Functions** → **Environment Variables**
3. Add new variable:
   - **Name:** `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value:** (Paste the URL you copied in Step 3)
4. Click **Save**

---

## Step 5️⃣: Test Your Forms! 🎉

### Test Enrollment Form:
1. Go to your EduPulseX website
2. Navigate to **Courses** page
3. Click **"Enroll Now"** on any course
4. Fill out the form
5. Submit
6. ✅ **Check your Google Sheet** - New row should appear!

### Test Get Started Form:
1. Click any **"Get Started"** button
2. Fill out the form
3. Submit
4. ✅ **Check your Google Sheet** - New row should appear!

---

## 📊 What Data You'll Get

### From Course Enrollments:
- Timestamp
- Student Name
- Email
- Phone Number
- College Name
- CR Number
- Course Name
- Course Price (₹999)
- Form Type: "Course Enrollment"

### From Get Started:
- Timestamp
- Student Name
- Email
- Phone Number
- College Name
- Form Type: "Get Started"

---

## 🆘 Troubleshooting

### ❌ Form not submitting?
- Check if `GOOGLE_SHEETS_WEBHOOK_URL` is set in Supabase
- Verify Apps Script is deployed with "Anyone" access
- Check browser console for errors (F12)

### ❌ Data not appearing in sheet?
- Verify the Web App URL is correct
- Check Apps Script logs: **Extensions** → **Apps Script** → **Executions**
- Make sure you have edit access to the sheet

### ❌ Authorization issues?
- Re-authorize the Apps Script
- Make sure "Execute as: Me" is selected
- Use an account that owns/can edit the sheet

---

## 🎯 Quick Checklist

- [ ] Column headers added to Row 1
- [ ] Apps Script code pasted and saved
- [ ] Script deployed as Web App
- [ ] Web App URL copied
- [ ] Environment variable added to Supabase
- [ ] Tested enrollment form ✅
- [ ] Tested get started form ✅
- [ ] Data appearing in sheet! 🎉

---

## 💡 Pro Tips

1. **Freeze the header row:** Select Row 1 → **View** → **Freeze** → **1 row**
2. **Format timestamp:** Select Column A → **Format** → **Number** → **Date time**
3. **Add filters:** Select Row 1 → Click **Filter** icon
4. **Color code form types:** Use conditional formatting on Column I

---

## 📧 Get Email Notifications (Optional)

Add this line after `sheet.appendRow(rowData);` in your Apps Script:

```javascript
MailApp.sendEmail("your-email@gmail.com", "New EduPulseX Submission", 
  "Name: " + data.name + "\nEmail: " + data.gmail + "\nCourse: " + (data.course || "Get Started"));
```

---

**🚀 That's it! Your forms are now connected to Google Sheets!**

Need more help? Check `GOOGLE_SHEETS_SETUP.md` for detailed documentation.
