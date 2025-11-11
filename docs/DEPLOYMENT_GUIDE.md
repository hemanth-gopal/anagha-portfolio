# GitHub Pages Deployment Guide

Complete guide for deploying your portfolio to GitHub Pages and connecting your custom domain.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Domain name: `anagha.me` (already configured in CNAME file)
- EmailJS account set up (already done ✅)

---

## 🔒 Security Considerations

### ✅ Safe to Commit (Public):
- **EmailJS Public Key** - This is designed to be public and is safe to expose
- **EmailJS Service ID** - Safe to expose (public identifier)
- **EmailJS Template ID** - Safe to expose (public identifier)
- **Portfolio content** - All your HTML, CSS, JavaScript
- **CNAME file** - Your domain configuration

### ⚠️ Important Security Notes:
1. **EmailJS Public Keys are safe**: EmailJS public keys are meant to be used in client-side code. They have rate limiting and security built-in.
2. **No sensitive data**: Your portfolio doesn't contain passwords, API secrets, or private keys.
3. **EmailJS protection**: EmailJS has built-in spam protection and rate limiting (200 emails/month on free plan).
4. **Domain security**: Using HTTPS on GitHub Pages ensures encrypted connections.

### 🛡️ Best Practices:
- ✅ Your EmailJS credentials are already properly configured
- ✅ No private keys or secrets in the code
- ✅ All external links use `rel="noopener noreferrer"`
- ✅ Form validation prevents spam submissions

---

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project directory
cd "/Users/hemanthg/Downloads/Anagha Namasevi/anagha-portfolio/anagha-portfolio-bundle/anagha-portfolio"

# Initialize git (if not already initialized)
git init

# Check current status
git status
```

### Step 2: Create .gitignore File

Create a `.gitignore` file to exclude unnecessary files:

```bash
# Create .gitignore
cat > .gitignore << 'EOF'
# OS Files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor Files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*

# Temporary files
*.tmp
*.temp
EOF
```

### Step 3: Add All Files to Git

```bash
# Add all files
git add .

# Check what will be committed
git status
```

### Step 4: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: Portfolio website with EmailJS integration"
```

### Step 5: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `anagha-portfolio` (or your preferred name)
3. Description: "Professional portfolio website - Architect & Construction Management"
4. Visibility: **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (you already have files)
6. Click **"Create repository"**

### Step 6: Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/anagha-portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use SSH: `git@github.com:YOUR_USERNAME/anagha-portfolio.git`

### Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 8: Configure Custom Domain

1. Still in **Settings > Pages**
2. Under **Custom domain**, enter: `anagha.me`
3. Click **Save**
4. GitHub will create a commit adding/updating the CNAME file (you already have this file ✅)

### Step 9: Configure DNS Settings

You need to configure your domain's DNS records. Go to your domain registrar (where you bought `anagha.me`) and add:

#### Option A: Apex Domain (anagha.me) - Recommended
Add these **A records**:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

#### Option B: CNAME (www.anagha.me)
If you want `www.anagha.me`:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Note**: GitHub Pages IP addresses may change. Check current IPs at:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

### Step 10: Enable HTTPS (Automatic)

1. GitHub Pages automatically enables HTTPS for custom domains
2. It may take a few minutes to hours for SSL certificate to be issued
3. Check **"Enforce HTTPS"** checkbox in Settings > Pages once available

### Step 11: Verify Deployment

1. Wait 5-10 minutes for DNS propagation
2. Visit: `https://anagha.me`
3. Test the contact form
4. Check browser console (F12) for any errors

---

## 🔄 Updating Your Site

After making changes locally:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically rebuild your site (usually takes 1-2 minutes).

---

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Custom domain configured in GitHub
- [ ] DNS records added at domain registrar
- [ ] Site accessible at `https://anagha.me`
- [ ] HTTPS enabled and enforced
- [ ] Contact form working
- [ ] All links working
- [ ] Mobile responsive design tested

---

## 🐛 Troubleshooting

### Site Not Loading

1. **Check DNS Propagation**:
   - Use https://dnschecker.org to verify DNS records globally
   - May take up to 48 hours for full propagation

2. **Verify CNAME File**:
   - Ensure `CNAME` file contains only: `anagha.me` (no www, no trailing slash)

3. **Check GitHub Pages Build**:
   - Go to Settings > Pages
   - Check for any build errors
   - View Actions tab for build logs

### HTTPS Not Working

1. Wait 24 hours for SSL certificate generation
2. Ensure DNS is properly configured
3. Check "Enforce HTTPS" is enabled in Settings > Pages
4. Clear browser cache and try again

### Contact Form Not Working

1. Verify EmailJS credentials are correct in `script.js`
2. Check browser console (F12) for errors
3. Verify EmailJS service is active
4. Check EmailJS dashboard for email logs

### Domain Not Connecting

1. Verify DNS records are correct
2. Ensure CNAME file is in repository root
3. Wait for DNS propagation (can take up to 48 hours)
4. Check domain registrar settings

---

## 📝 Additional Recommendations

### 1. Add README.md
Create a professional README for your repository:

```markdown
# Anagha Shamsundar Namasevi - Portfolio

Professional portfolio website showcasing architecture and construction management expertise.

## Technologies
- HTML5
- CSS3
- JavaScript
- EmailJS

## Live Site
https://anagha.me
```

### 2. Add License (Optional)
Consider adding a LICENSE file if you want to specify usage rights.

### 3. Enable GitHub Actions (Optional)
You can add automated testing or deployment workflows.

### 4. Set Up Branch Protection (Optional)
Protect your `main` branch from accidental deletions.

---

## 🔐 Security Best Practices

1. ✅ **EmailJS Public Key**: Safe to expose (designed for client-side use)
2. ✅ **Rate Limiting**: EmailJS free plan limits to 200 emails/month
3. ✅ **HTTPS**: GitHub Pages automatically provides SSL certificates
4. ✅ **No Secrets**: No passwords or private keys in your code
5. ✅ **Form Validation**: Client-side validation prevents spam

### Additional Security Measures:

- **EmailJS Dashboard**: Monitor email activity regularly
- **Spam Protection**: EmailJS has built-in spam detection
- **Rate Limiting**: Consider upgrading EmailJS plan if you expect high traffic
- **Regular Updates**: Keep dependencies updated

---

## 📊 Monitoring & Analytics

Consider adding:

1. **Google Analytics**: Track website visitors
2. **EmailJS Dashboard**: Monitor contact form submissions
3. **GitHub Insights**: Track repository views

---

## 🎉 You're All Set!

Once deployed, your portfolio will be:
- ✅ Live at `https://anagha.me`
- ✅ Secure with HTTPS
- ✅ Fast with GitHub Pages CDN
- ✅ Professional and accessible

**Your site URL**: `https://anagha.me`

---

## 📞 Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- EmailJS Support: https://dashboard.emailjs.com/support
- DNS Issues: Contact your domain registrar

