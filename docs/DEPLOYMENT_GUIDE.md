# Deployment Quick Reference

**Status**: ✅ Already deployed and live at [anagha.me](https://anagha.me)

## Current Configuration

- **Repository**: `hemanth-gopal/anagha-portfolio`
- **Hosting**: GitHub Pages
- **Domain**: `anagha.me` (configured in `CNAME` file)
- **Branch**: `main` → `/ (root)`
- **HTTPS**: Enabled automatically

## Updating Your Site

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Pages rebuilds automatically (1-2 minutes).

## Quick Troubleshooting

### Site Not Loading
- Check DNS: https://dnschecker.org
- Verify CNAME file contains: `anagha.me` (no www, no trailing slash)
- Check GitHub Pages status: Settings → Pages

### HTTPS Issues
- Wait 24 hours for SSL certificate
- Enable "Enforce HTTPS" in Settings → Pages

### Domain Issues
- Verify DNS A records point to GitHub Pages IPs
- Current IPs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## DNS Configuration (if needed)

**A Records** (for apex domain `anagha.me`):
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**Note**: GitHub Pages IPs may change. Check official docs for current IPs.

## Useful Links

- **GitHub Pages Docs**: https://docs.github.com/pages
- **Repository**: https://github.com/hemanth-gopal/anagha-portfolio
- **DNS Checker**: https://dnschecker.org

---

**Full Documentation**: https://docs.github.com/pages
