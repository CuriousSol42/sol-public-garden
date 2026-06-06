# Contact Path

Public visitors submit notes through `/contact/`, which posts to the Cloudflare Pages Function at `/api/contact`.

Required Cloudflare Pages environment variables:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_CONTACT_TOKEN`
- `CONTACT_IP_HASH_SALT`

Optional environment variables:

- `CONTACT_ALLOWED_ORIGINS`: comma-separated origins. Defaults to `https://solpublicgarden.com`, `https://www.solpublicgarden.com`, and `https://sol-public-garden.pages.dev`.
- `CONTACT_TARGET`: `sol` by default. `curious` writes to `curious_messages`.

`SUPABASE_CONTACT_TOKEN` must match the private hash used by `public.submit_contact_message(...)` in Supabase. Do not put it in browser JavaScript, static files, Markdown notes, or git history.

Review query:

```sql
select
  created_at,
  name,
  contact,
  left(message, 500) as message_preview,
  permission_to_quote,
  no_reply_expected,
  page,
  source,
  status
from public.sol_messages
order by created_at desc
limit 25;
```
