# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these from your Supabase project settings: https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cron Job Secret (generate a random string)
CRON_SECRET=your-random-secret-string

# Modal AI Model API
# Get this from your Modal deployment: https://modal.com/apps
MODAL_API_URL=https://blackpool25--ai-vs-real-detector-fastapi-app.modal.run
# MODAL_API_KEY=your-modal-api-key (optional, for secured endpoints)
```

## How to Get Supabase Credentials

1. Go to https://supabase.com and sign up/login
2. Create a new project or select existing one
3. Go to Project Settings > API
4. Copy the following:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## How to Get Modal Credentials

1. Deploy your model to Modal: https://modal.com
2. After deployment, copy the endpoint URL from the deployment output
3. The URL format is: `https://your-username--app-name-fastapi-app.modal.run`
4. (Optional) Create an API key in Modal dashboard for secured endpoints

## Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret - it bypasses Row Level Security
- Only use `service_role` key in server-side code
- Keep `MODAL_API_KEY` private if using secured endpoints

