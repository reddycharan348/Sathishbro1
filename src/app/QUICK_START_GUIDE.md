# Quick Start Guide - Getting Forms Working

## 📊 Your Google Sheet

**Sheet URL:** https://docs.google.com/spreadsheets/d/1XZMQMzOjQAD9_UwovsKEXf8mFlaFkwwR90gaeQM8QRI/edit?usp=sharing

## ⚡ Quick Setup (5 minutes)

### Step 1: Open Your Google Sheet
1. Click the link above to open your sheet
2. Make sure the sheet has these headers in Row 1:
   ```
   Timestamp | Name | Email | Phone Number | College Name | CR Number | Course | Course Price | Form Type
   ```
3. If headers are missing, add them now

### Step 2: Add Apps Script
1. In sheet: `Extensions` → `Apps Script`
2. Paste this code:

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

3. Save the script

### Step 3: Deploy Web App
1. Click `Deploy` → `New deployment`
2. Select type: `Web app`
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click `Deploy`
5. **Copy the URL** (looks like: `https://script.google.com/macros/s/XXX/exec`)

### Step 4: Add to Supabase
1. Go to Supabase Dashboard
2. `Project Settings` → `Edge Functions` → `Environment Variables`
3. Add new variable:
   - Name: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Value: (paste the URL from Step 3)
4. Save and redeploy functions if needed

### Step 5: Test It!
1. Go to your EduPulseX site
2. Click "Enroll Now" on any course
3. Fill out the form
4. Check your Google Sheet for the data!

---

## 🎯 What You Get

### Course Enrollment Form
- Opens when clicking "Enroll Now" on any course
- Collects: Name, Email, Phone, College, CR Number
- Course name auto-filled
- Price shown (₹999)

### Get Started Form
- Opens from "Get Started" buttons (navbar, CTA section)
- Collects: Name, Email, Phone, College
- Shows benefits preview

### Projects GitHub Link
- Click GitHub buttons to see all projects
- Opens: https://github.com/edupulsex
- (Change this URL if needed in ProjectsSection.tsx)

---

## 🐛 Troubleshooting

### Form doesn't submit?
✅ Check: Is `GOOGLE_SHEETS_WEBHOOK_URL` set in Supabase?
✅ Check: Did you deploy Apps Script with "Anyone" access?
✅ Check: Browser console for errors

### Data not in Google Sheets?
✅ Check: Apps Script execution logs
✅ Check: Is the sheet shared/accessible?
✅ Check: Supabase Edge Function logs

### GitHub link wrong?
✅ Update in: `/components/ProjectsSection.tsx`
✅ Search for: `https://github.com/edupulsex`
✅ Replace with your GitHub org URL

---

## 📁 Files Changed

**New Components:**
- `/components/EnrollmentModal.tsx`
- `/components/GetStartedModal.tsx`

**Modified Components:**
- `/components/CoursesSection.tsx`
- `/components/BranchesSection.tsx`
- `/components/Navbar.tsx`
- `/components/CTASection.tsx`
- `/components/ProjectsSection.tsx`

**Backend:**
- `/supabase/functions/server/index.tsx`

**Documentation:**
- `/GOOGLE_SHEETS_SETUP.md`
- `/IMPLEMENTATION_SUMMARY.md`
- `/QUICK_START_GUIDE.md` (this file)

---

## 🎨 Customization

### Change GitHub URL
File: `/components/ProjectsSection.tsx`
```tsx
// Find and replace all instances:
href="https://github.com/edupulsex"
// With your org URL:
href="https://github.com/your-org-name"
```

### Change Form Fields
Files: `/components/EnrollmentModal.tsx` or `/components/GetStartedModal.tsx`
- Add/remove input fields
- Update validation
- Modify backend endpoint to match

### Change Pricing
File: `/components/CoursesSection.tsx`
```tsx
// Find:
price: '₹999'
// Change to your price
```

---

## ✨ Features Summary

✅ **Courses:** 6 courses at ₹999 for 3 months
✅ **Enrollment Form:** Collects student data → Google Sheets
✅ **Get Started Form:** Lead capture → Google Sheets  
✅ **Branches Page:** Enhanced with stats, salaries, companies
✅ **GitHub Integration:** Direct links to project repository
✅ **Mobile Responsive:** All forms work on mobile
✅ **Success Animations:** Smooth UX with confirmations
✅ **Error Handling:** User-friendly error messages
✅ **Data Backup:** KV store backup for all submissions

---

## 🚀 Ready to Launch?

**Checklist:**
- [ ] Google Sheet created with headers
- [ ] Apps Script added and deployed
- [ ] Webhook URL added to Supabase
- [ ] Tested enrollment form
- [ ] Tested get started form
- [ ] GitHub links verified
- [ ] Mobile tested
- [ ] Ready to accept students! 🎉

---

**Need help?** Check the full documentation in `GOOGLE_SHEETS_SETUP.md` and `IMPLEMENTATION_SUMMARY.md`

Good luck with EduPulseX! 🚀