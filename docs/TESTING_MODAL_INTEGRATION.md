# Testing Modal Integration - Complete Guide

## 🧪 Manual Testing Checklist

This guide will walk you through testing the complete Modal AI model integration end-to-end.

---

## ⚙️ Pre-Testing Setup

### 1. Verify Environment Configuration

Ensure your `.env.local` file contains:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Modal
MODAL_API_URL=https://blackpool25--ai-vs-real-detector-fastapi-app.modal.run

# Other
CRON_SECRET=your-random-secret-string
```

### 2. Start Development Server

```bash
npm run dev
```

Server should start at: http://localhost:3000

### 3. Verify Modal API is Live

Test Modal endpoint directly:

```bash
curl https://blackpool25--ai-vs-real-detector-fastapi-app.modal.run/health
```

Expected response:
```json
{
  "status": "healthy",
  "device": "cuda",
  "cuda_available": true,
  "model_loaded": true
}
```

---

## 📝 Test Cases

### Test Case 1: Image Mode - Real AI Detection

**Objective**: Verify that image uploads use the real Modal AI model.

**Steps**:

1. **Open Browser**
   - Navigate to http://localhost:3000
   - Open Developer Tools (F12)
   - Go to Network tab

2. **Login**
   - Click "Login" in the navigation bar
   - Enter your credentials
   - Verify successful login (user menu appears)

3. **Open Upload Modal**
   - Click "Upload to Detect" button on homepage
   - Modal should open

4. **Select Image Mode**
   - Ensure "Image" mode is selected (should be default)
   - Note the icon and description

5. **Upload Test Image**
   - Click or drag-drop a test image (JPG, PNG, or WebP)
   - File should appear in the upload area
   - Click "Analyze" button

6. **Monitor Network Requests**
   - In Network tab, look for these requests:
     1. POST to Supabase Storage API (file upload)
     2. POST to `/api/detect` (your backend)
     3. The backend should call Modal API

7. **Verify Result Display**
   - Progress bar should animate
   - After ~2-10 seconds (depending on cold start), result should appear
   - Check the displayed values:
     - **Confidence**: Should be a specific percentage (not random 70-99%)
     - **Label**: "AI-Generated" or "Human Created"
     - **Prediction**: Clear indication of result

8. **Check Browser Console**
   - Should show no errors
   - Look for any logged data

**Expected Results**:
- ✅ File uploads successfully to Supabase
- ✅ `/api/detect` endpoint is called
- ✅ Result shows real AI prediction (not mock)
- ✅ No errors in console

**How to Verify It's Real (Not Mock)**:
- Upload the same image multiple times → should get the **same** result
- Mock returns random 70-99%, real model returns consistent predictions

---

### Test Case 2: Verify Database Storage

**Objective**: Confirm detection results are saved correctly.

**Steps**:

1. **Navigate to Dashboard**
   - After getting a result, click "Done"
   - Click "Dashboard" in navigation bar
   - Or go directly to http://localhost:3000/dashboard

2. **Verify Detection Entry**
   - Your recent detection should appear at the top
   - Check the following fields:
     - **Filename**: Matches uploaded image
     - **File Type**: Shows "image"
     - **Confidence**: Matches the result you saw
     - **Result Badge**: "AI Generated" or "Human Created"
     - **Model Used**: Should say `EfficientFormer-S2V1 (Modal)` (not `DetectX-v1`)
     - **Date/Time**: Recent timestamp
     - **File Size**: Shows correct size

3. **Verify Statistics**
   - Top cards show updated counts:
     - Total Detections
     - AI Detected
     - Human Created

**Expected Results**:
- ✅ Detection appears in history
- ✅ Model name is `EfficientFormer-S2V1 (Modal)`
- ✅ All fields are populated correctly
- ✅ Statistics are accurate

---

### Test Case 3: Verify Supabase Storage

**Objective**: Confirm files are uploaded to Supabase bucket.

**Steps**:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your project
   - Navigate to Storage section

2. **Check image-uploads Bucket**
   - Click on `image-uploads` bucket
   - You should see a folder with your user ID
   - Inside, the uploaded image file(s)

3. **Verify File Properties**
   - Filename format: `{timestamp}-{original-name}`
   - File is accessible (public URL works)

**Expected Results**:
- ✅ File exists in `image-uploads` bucket
- ✅ File is in user-specific folder
- ✅ File is accessible via public URL

---

### Test Case 4: Text Mode - Mock Detection

**Objective**: Verify text mode still uses mock detection (unchanged).

**Steps**:

1. **Open Upload Modal**
   - Click "Upload to Detect"

2. **Select Text Mode**
   - Switch to "Text" tab/mode
   - Icon should change to document icon

3. **Upload Text File**
   - Upload a `.txt` file
   - Click "Analyze"

4. **Verify Mock Behavior**
   - Should complete in ~2 seconds
   - Result shows 70-99% confidence (random)
   - Upload the same file multiple times → get **different** results each time

5. **Check Dashboard**
   - Model used should be `DetectX-v1` (not Modal)

**Expected Results**:
- ✅ Text mode works as before (mock)
- ✅ Does not call `/api/detect`
- ✅ Model name is `DetectX-v1`
- ✅ Random results (not consistent)

---

### Test Case 5: Video Mode - Mock Detection

**Objective**: Verify video mode still uses mock detection (unchanged).

**Steps**:

1. **Open Upload Modal**
   - Click "Upload to Detect"

2. **Select Video Mode**
   - Switch to "Video" mode
   - Icon should change to video icon

3. **Upload Video File**
   - Upload a `.mp4` file
   - Click "Analyze"

4. **Verify Mock Behavior**
   - Should complete in ~2 seconds
   - Result shows 70-99% confidence (random)
   - Model name: `DetectX-v1`

**Expected Results**:
- ✅ Video mode works as before (mock)
- ✅ Does not call `/api/detect`
- ✅ Model name is `DetectX-v1`
- ✅ Random results

---

### Test Case 6: Error Handling - No Authentication

**Objective**: Verify proper error handling when not logged in.

**Steps**:

1. **Logout**
   - Click user menu → Logout

2. **Try to Upload**
   - Click "Upload to Detect"
   - Select an image
   - Click "Analyze"

3. **Verify Error Handling**
   - Should see error: "Please login to analyze files"
   - After 2 seconds, should redirect to login page

**Expected Results**:
- ✅ Clear error message
- ✅ Automatic redirect to login
- ✅ No crash or console errors

---

### Test Case 7: Error Handling - Invalid Image

**Objective**: Verify file validation works.

**Steps**:

1. **Try Invalid File Types**
   - Try uploading a `.exe`, `.zip`, or `.pdf` in image mode
   - Should show error before upload

2. **Try Oversized File**
   - Try uploading an image > 10MB
   - Should show error about file size

**Expected Results**:
- ✅ Validation catches invalid files
- ✅ Clear error messages
- ✅ No actual upload happens

---

### Test Case 8: Error Handling - Modal API Unreachable

**Objective**: Test graceful failure when Modal is down.

**Steps**:

1. **Temporarily Break Modal URL**
   - Edit `.env.local`
   - Change `MODAL_API_URL` to invalid URL: `https://invalid-url.modal.run`
   - Restart dev server

2. **Try Image Upload**
   - Upload an image in image mode
   - Click "Analyze"

3. **Verify Error Handling**
   - Should see error: "Failed to analyze image"
   - File should still upload to Supabase
   - No crash or undefined behavior

4. **Restore Modal URL**
   - Change back to correct URL in `.env.local`
   - Restart dev server

**Expected Results**:
- ✅ Graceful error message
- ✅ App doesn't crash
- ✅ File still uploaded to Supabase

---

### Test Case 9: Performance - Multiple Uploads

**Objective**: Verify multiple sequential uploads work correctly.

**Steps**:

1. **Upload 3 Different Images**
   - Upload image 1, wait for result
   - Upload image 2, wait for result
   - Upload image 3, wait for result

2. **Verify Dashboard**
   - All 3 should appear in history
   - All should have Modal model name
   - All should have correct, distinct results

**Expected Results**:
- ✅ All uploads succeed
- ✅ No performance degradation
- ✅ All results are saved correctly

---

### Test Case 10: Cross-Browser Testing

**Objective**: Ensure compatibility across browsers.

**Browsers to Test**:
- Chrome/Edge
- Firefox
- Safari (if on Mac)

**Steps**:
- Run Test Case 1 (Image Upload) in each browser
- Verify results are consistent

**Expected Results**:
- ✅ Works in all major browsers
- ✅ Base64 conversion works correctly
- ✅ No browser-specific issues

---

## 🔍 Debugging Tips

### Check Browser Network Tab

Look for these requests:
1. **Supabase Storage Upload**: `POST` to `*.supabase.co/storage/v1/object/*`
2. **Detection API**: `POST` to `/api/detect`
3. **Database Insert**: `POST` to `*.supabase.co/rest/v1/detection_history`

### Check Console Logs

Our code logs:
- Upload errors
- Detection errors
- Any unexpected behavior

### Check Modal Dashboard

Visit https://modal.com/apps to see:
- API request logs
- Error logs
- Performance metrics

### Check Supabase Dashboard

Visit your Supabase project to see:
- Storage files
- Database records
- Auth logs

---

## ✅ Success Criteria

The integration is successful if:

- [x] Image mode uses real Modal AI model
- [x] Results are consistent (same image → same result)
- [x] Results saved to database with correct model name
- [x] Files uploaded to Supabase storage
- [x] Dashboard displays results correctly
- [x] Text/video modes still work with mock detection
- [x] Error handling works gracefully
- [x] No console errors during normal operation

---

## 🐛 Common Issues & Solutions

### Issue: "AI detection service is not configured"
**Solution**: Add `MODAL_API_URL` to `.env.local` and restart server

### Issue: Modal returns 500 error
**Solution**: Check Modal dashboard logs, model may need to be redeployed

### Issue: Results are still random
**Solution**: 
1. Verify you're in IMAGE mode (not text/video)
2. Check Network tab to confirm `/api/detect` is being called
3. Verify `MODAL_API_URL` is correct

### Issue: Slow first request (10-15 seconds)
**Explanation**: This is normal - Modal cold start
**Solution**: Subsequent requests will be faster (2-3 seconds)

### Issue: File uploads but no detection
**Solution**: Check browser console for errors, verify Modal API is running

---

## 📊 Test Results Template

Use this template to record your test results:

```
Date: _____________
Tester: _____________

Test Case 1 (Image Upload - Real AI): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 2 (Database Storage): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 3 (Supabase Storage): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 4 (Text Mode Mock): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 5 (Video Mode Mock): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 6 (No Auth Error): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 7 (Invalid File): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 8 (Modal Unreachable): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 9 (Multiple Uploads): ☐ Pass ☐ Fail
Notes: _____________________________________________

Test Case 10 (Cross-Browser): ☐ Pass ☐ Fail
Notes: _____________________________________________

Overall Status: ☐ All Pass ☐ Some Failures
```

---

## 🎯 Next Steps After Testing

If all tests pass:
1. Deploy to Vercel (add `MODAL_API_URL` to Vercel env vars)
2. Test in production environment
3. Monitor costs and performance

If tests fail:
1. Review error messages
2. Check logs (browser, server, Modal, Supabase)
3. Refer to troubleshooting section in `MODAL_INTEGRATION.md`

---

**Testing Complete!** ✅

All test cases documented and ready for execution. The integration is implemented and awaiting manual verification.

