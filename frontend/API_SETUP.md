# API Setup Guide

This guide will help you set up all the external APIs for your Tourify app.

## 🔧 Required API Keys

### 1. Google Maps & Places API
**What it does:** Search for places, get location details, photos, and reviews
**Cost:** Free tier available (up to $300/month credit)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable APIs:
   - Maps JavaScript API
   - Places API
4. Create credentials (API key)
5. Restrict the key to your domain for security

### 2. Unsplash API  
**What it does:** High-quality travel and cultural images
**Cost:** Free tier (5,000 requests/hour)

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create an account and new app
3. Get your Access Key

### 3. OpenWeather API
**What it does:** Weather data for travel locations
**Cost:** Free tier (1,000 calls/day)

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 4. Cloudinary (Optional - for image hosting)
**What it does:** Image upload, optimization, and hosting
**Cost:** Free tier available

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Get your Cloud Name and create an Upload Preset

## 🛠️ Environment Setup

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Add your API keys to `.env.local`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# External APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your_google_key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
OPENWEATHER_API_KEY=your_openweather_key

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,text/csv,application/json,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

# Cloudinary (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 🧪 Testing the APIs

1. Start your development server:
```bash
npm run dev
```

2. Visit the integration demo page:
```
http://localhost:3000/dev/integrations
```

3. Test each integration:
   - **Places Search**: Search for "restaurants near me"
   - **Wikipedia**: Search for "Eiffel Tower" 
   - **Unsplash**: Search for "travel"
   - **File Upload**: Try uploading an image or CSV file

## 🚨 Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Restrict Google Maps API key to your domain
- Monitor API usage to avoid unexpected charges

## 📊 API Limits (Free Tiers)

| Service | Free Limit | After Limit |
|---------|------------|-------------|
| Google Places | $300/month credit | Pay per use |
| Unsplash | 5,000 requests/hour | Rate limited |
| OpenWeather | 1,000 calls/day | $40/month for more |
| Cloudinary | 25GB storage, 25GB bandwidth | Pay per use |

## 🔍 Troubleshooting

**API not working?**
1. Check if API key is correct in `.env.local`
2. Verify the API is enabled in the provider's console
3. Check browser console for CORS errors
4. Ensure you're not exceeding rate limits

**File upload failing?**
1. Check file size is under 10MB
2. Verify file type is supported
3. Test with different file formats

**Need help?**
Check the browser console for detailed error messages.
