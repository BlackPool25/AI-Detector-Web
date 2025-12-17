# Modal AI Model Integration - Complete Guide

## ✅ Implementation Status: COMPLETE

The EfficientFormer-S2V1 image detection model hosted on Modal is now fully integrated with the Next.js application.

---

## 🎯 What Was Implemented

### 1. Backend API Route (`app/api/detect/route.ts`)
- **POST** endpoint at `/api/detect`
- Accepts base64-encoded images
- Calls Modal's `/predict` endpoint
- Maps Modal's response to the app's `DetectionResult` format
- Returns normalized JSON to the frontend

### 2. Frontend Integration (`components/home/UploadModal.tsx`)
- **Image mode**: Uses real Modal AI model
- **Text/Video modes**: Continue using mock detection (until models are ready)
- Maintains existing Supabase upload flow
- Saves results to `detection_history` database

### 3. Documentation Updates
- Updated `docs/ENV_SETUP.md` with Modal configuration
- Created this integration guide

---

## 🚀 Setup Instructions

### Step 1: Add Environment Variables

Add the following to your `.env.local` file:

```env
# Modal AI Model API
MODAL_API_URL=https://blackpool25--ai-vs-real-detector-fastapi-app.modal.run
# MODAL_API_KEY=your-modal-api-key (optional, for secured endpoints)
```

### Step 2: Verify Supabase Configuration

Ensure your Supabase configuration is complete:

1. **Storage Buckets**: `image-uploads`, `text-uploads`, `video-uploads`
2. **Database Table**: `detection_history` with proper schema
3. **Environment Variables**: All Supabase keys in `.env.local`

See `docs/SUPABASE_SETUP.md` for detailed instructions.

### Step 3: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🧪 Testing the Integration

### Test Image Mode (Real AI Model)

1. **Login** to your account
2. Click **"Upload to Detect"** button
3. Select **Image** mode
4. Upload a test image (JPG, PNG, or WebP)
5. Click **"Analyze"**

**Expected Results:**
- File uploads to Supabase `image-uploads` bucket ✅
- Backend calls Modal API for real inference ✅
- UI displays actual AI confidence score (not random) ✅
- Result saved to `detection_history` with model: `EfficientFormer-S2V1 (Modal)` ✅
- Dashboard shows the detection with correct data ✅

### Test Text/Video Modes (Mock)

1. Switch to **Text** or **Video** mode
2. Upload a file
3. **Expected**: Mock detection still works (random 70-99% confidence)

---

## 🔧 How It Works

### Architecture Flow

```
User uploads image
    ↓
UploadModal.tsx converts file to base64
    ↓
File uploaded to Supabase Storage (unchanged)
    ↓
Frontend calls /api/detect with base64 image
    ↓
Backend (route.ts) calls Modal API
    ↓
Modal returns: { predictions, top_prediction, confidence }
    ↓
Backend maps to: { confidence, isAI, label, model }
    ↓
Frontend saves to detection_history
    ↓
User sees result
```

### Modal API Request

```typescript
POST https://blackpool25--ai-vs-real-detector-fastapi-app.modal.run/predict
Content-Type: application/json

{
  "image": "base64_encoded_image_string_without_prefix",
  "return_all_scores": true
}
```

### Modal API Response

```json
{
  "predictions": [
    { "label": "REAL", "score": 0.92 },
    { "label": "AI", "score": 0.08 }
  ],
  "top_prediction": "REAL",
  "confidence": 0.92
}
```

### Our App's Response (After Mapping)

```json
{
  "confidence": 92,
  "isAI": false,
  "label": "Authentic Human Content",
  "model": "EfficientFormer-S2V1 (Modal)"
}
```

---

## 📊 Detection Result Mapping

### Modal → App Format

| Modal Field | App Field | Transformation |
|------------|-----------|----------------|
| `confidence` (0-1) | `confidence` (0-100) | Multiply by 100 and round |
| `top_prediction` | `isAI` | Check if contains "AI" or "FAKE" |
| `top_prediction` | `label` | Generate human-readable string |
| N/A | `model` | Set to `"EfficientFormer-S2V1 (Modal)"` |

### Label Generation Logic

```typescript
const isAI = topPrediction.includes('AI') || topPrediction.includes('FAKE')
const label = isAI 
  ? 'AI-Generated Content Detected' 
  : 'Authentic Human Content'
```

---

## 🔒 Security Considerations

### Current Setup (Development)
- Modal API is **publicly accessible**
- No authentication required
- Suitable for testing and development

### Production Recommendations

1. **Enable Modal API Authentication**
   - Generate an API key in Modal dashboard
   - Add to `.env.local`:
     ```env
     MODAL_API_KEY=your_secure_api_key
     ```
   - Backend automatically includes it if set

2. **Rate Limiting**
   - Add rate limiting to `/api/detect` route
   - Use Vercel's built-in rate limiting or a service like Upstash

3. **Input Validation**
   - Validate image size (already done via `fileValidation.ts`)
   - Validate base64 format in backend
   - Add timeout to Modal API calls (30s recommended)

4. **CORS Configuration**
   - Update Modal app's CORS settings to only allow your domain
   - Add your Vercel domain to Modal's `allow_origins`

---

## 🐛 Troubleshooting

### Error: "AI detection service is not configured"
- **Cause**: `MODAL_API_URL` not set in environment
- **Fix**: Add to `.env.local` and restart dev server

### Error: "Failed to process image with AI model"
- **Cause**: Modal API unreachable or returned error
- **Debug**: Check Modal dashboard logs
- **Check**: Modal app is running and not scaled to zero

### Cold Start Delays
- **Issue**: First request after idle takes 10-15 seconds
- **Cause**: Modal GPU container cold start
- **Solution**: Modal's keep-warm function (already configured)

### Image Not Uploading to Supabase
- **Cause**: Supabase storage bucket not created
- **Fix**: Follow `docs/SUPABASE_SETUP.md` to create buckets

### Mock Results Still Showing for Images
- **Cause**: Environment variable not loaded
- **Fix**: Restart Next.js dev server after adding `MODAL_API_URL`

---

## 📈 Monitoring & Logs

### View Modal Logs
```bash
modal app logs ai-vs-real-detector
```

### View Next.js Logs
Check your terminal where `npm run dev` is running

### View Supabase Logs
Visit your Supabase dashboard → Logs section

---

## 💰 Cost Considerations

### Modal Pricing (GPU)
- **T4 GPU**: ~$0.60/hour when running
- **Auto-scaling**: Scales to zero when idle (no cost)
- **Idle timeout**: 5 minutes (configurable)
- **Keep-warm**: Runs every 12 hours (minimal cost)

### Optimization Tips
1. **Reduce idle timeout** if you have low traffic
2. **Disable keep-warm** for development
3. **Use batch prediction** for multiple images
4. **Monitor usage** in Modal dashboard

---

## 🔄 Next Steps

### For Text Mode
1. Deploy text detection model to Modal
2. Update `UploadModal.tsx` to call `/api/detect` for text
3. Update model name mapping

### For Video Mode
1. Deploy video detection model to Modal
2. Create `/api/detect-video` endpoint (video may need different processing)
3. Update `UploadModal.tsx` for video mode

### Production Deployment
1. Add `MODAL_API_URL` to Vercel environment variables
2. (Optional) Add `MODAL_API_KEY` for security
3. Test in production environment
4. Monitor costs and performance

---

## 📚 Related Documentation

- **Environment Setup**: `docs/ENV_SETUP.md`
- **Supabase Integration**: `docs/SUPABASE_INTEGRATION.md`
- **Modal Deployment**: Check `TEMP_FOLDER/Inference/MODAL_DEPLOYMENT_GUIDE.md` (temporary reference)
- **API Client**: Check `TEMP_FOLDER/Inference/api_client.ts` (temporary reference)

---

## ✅ Verification Checklist

Before considering this complete, verify:

- [ ] `MODAL_API_URL` added to `.env.local`
- [ ] Dev server restarted after env changes
- [ ] Image upload works and saves to Supabase
- [ ] Modal API is called (check browser Network tab)
- [ ] Result shows real confidence (not random 70-99%)
- [ ] `detection_history` saved with correct `model_used`
- [ ] Dashboard displays detection correctly
- [ ] Text/video modes still work with mock detection

---

**Status**: ✅ Implementation Complete  
**Last Updated**: November 19, 2025  
**Next Action**: Test the integration and verify all flows work correctly

