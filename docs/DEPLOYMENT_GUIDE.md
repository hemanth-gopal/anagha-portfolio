# Deployment Guide

**Status**: ✅ Live at [anagha.me](https://anagha.me)

## Current Setup

- **Repo**: `hemanth-gopal/anagha-portfolio`
- **Hosting**: GitHub Pages
- **Domain**: `anagha.me` (via `CNAME`)
- **Branch**: `main` → `/ (root)`
- **HTTPS**: Auto-enabled

## Update Site

```bash
git add .
git commit -m "Your message"
git push origin main
```

Site rebuilds automatically (1-2 min).

## Troubleshooting

**Site not loading?**
- Check DNS: https://dnschecker.org
- Verify `CNAME` contains: `anagha.me` (no www, no `/`)
- Check: Settings → Pages

**HTTPS issues?**
- Wait 24h for SSL certificate
- Enable "Enforce HTTPS" in Settings → Pages

**DNS A Records** (if needed):
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

*Note: GitHub IPs may change. Check official docs.*

## Links

- **Pages Docs**: https://docs.github.com/pages
- **Repo**: https://github.com/hemanth-gopal/anagha-portfolio
- **DNS Checker**: https://dnschecker.org
