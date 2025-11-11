# EmailJS Setup

**Status**: ✅ Configured and working

## Current Config

**File**: `script.js` (lines ~321, 391-392)

- **Public Key**: `Rbu8KlNbu2aAb69b-`
- **Service ID**: `service_382hiu5`
- **Template ID**: `template_cbx78qh`
- **Recipient**: `namasevi.anagha@gmail.com`

## Update Credentials

1. Get new keys: https://dashboard.emailjs.com/admin/integration
2. Update `script.js` lines 321, 391-392
3. Test via contact form

## Troubleshooting

- **Not working?** Check browser console (F12)
- **No emails?** Check spam, verify EmailJS dashboard
- **Rate limit?** Free plan: 200 emails/month
- **Dashboard**: https://dashboard.emailjs.com/

## Template Variables

- `{{from_name}}` - Sender name
- `{{from_email}}` - Sender email
- `{{message}}` - Message content

**Docs**: https://www.emailjs.com/docs/
