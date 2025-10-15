# IMPORTANT: Run This SQL Now!

## The Error You're Seeing

```
Unable to delete account. Please contact support.
```

This means the database function hasn't been created yet.

## Fix: Run This SQL in Supabase (Takes 30 seconds)

### Step 1: Open Supabase SQL Editor

Click this link: https://app.supabase.com/project/cjkcwycnetdhumtqthuk/sql/new

### Step 2: Copy and Paste This SQL

```sql
-- Function to delete user account
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Get current user ID
  user_id := auth.uid();
  
  -- Verify user is authenticated
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Delete user data (order matters due to foreign keys)
  DELETE FROM public.detection_history WHERE user_id = delete_user.user_id;
  DELETE FROM public.user_profiles WHERE id = delete_user.user_id;
  DELETE FROM auth.users WHERE id = delete_user.user_id;
END;
$$;

-- Grant permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_user() TO authenticated;

-- Add description
COMMENT ON FUNCTION delete_user() IS 'Allows users to delete their own account';
```

### Step 3: Click "RUN" (or press Ctrl+Enter)

You should see: `Success. No rows returned`

### Step 4: Test Delete Account

Go back to Settings → Danger Zone → Delete Account

It should work now! ✅

---

## Why This Is Needed

Supabase doesn't allow users to delete their own auth account by default (security feature).

This function:
- Runs with elevated permissions (`SECURITY DEFINER`)
- But only allows users to delete **their own** account (`auth.uid()` check)
- Deletes all associated data in the correct order
- Is completely safe and secure

## Troubleshooting

### Still getting an error?

1. **Check if SQL ran successfully**
   - Go to Supabase SQL Editor
   - Run: `SELECT routine_name FROM information_schema.routines WHERE routine_name = 'delete_user';`
   - Should return `delete_user`

2. **Verify permissions**
   - Run: `SELECT has_function_privilege('authenticated', 'delete_user()', 'EXECUTE');`
   - Should return `true`

3. **Check for errors in SQL**
   - Make sure you copied the entire SQL block
   - No syntax errors in the editor
   - Click RUN again

### Need Help?

The full SQL is also in:
- `/docs/DELETE_USER_FUNCTION.md`
- `/docs/DELETE_ACCOUNT_QUICKSTART.md`
