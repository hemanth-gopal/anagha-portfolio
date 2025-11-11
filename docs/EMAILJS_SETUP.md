# EmailJS Quick Reference

**Status**: ✅ Already configured and working

## Current Configuration

**Location**: `script.js` (lines 321, 391-392)

- **Public Key**: `Rbu8KlNbu2aAb69b-`
- **Service ID**: `service_382hiu5`
- **Template ID**: `template_cbx78qh`
- **Recipient Email**: `namasevi.anagha@gmail.com`

## If You Need to Update Credentials

1. **Get new credentials**: https://dashboard.emailjs.com/admin/integration
2. **Update in code**: Edit `script.js` lines 321, 391-392
3. **Test**: Submit contact form and check email

## Quick Troubleshooting

- **Form not working?** Check browser console (F12) for errors
- **No emails received?** Check spam folder, verify EmailJS dashboard logs
- **Rate limit?** Free plan: 200 emails/month
- **Dashboard**: https://dashboard.emailjs.com/

## Template Variables Used

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{message}}` - Message content

---

**Full Documentation**: https://www.emailjs.com/docs/
