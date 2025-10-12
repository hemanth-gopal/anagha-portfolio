# Anagha Shamsundar Namasevi - Portfolio Website

A professional portfolio website showcasing academic and professional experience in architecture and construction management.

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file (landing page)
├── styles.css          # All CSS styles
├── script.js           # All JavaScript functionality
├── portrait.jpg        # Profile photo
└── README.md          # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **5 Main Sections**:
  - Home: Professional introduction with photo and bio
  - Skills: Technical tools, management skills, soft skills, and languages
  - Experience: Timeline of professional experience
  - Projects: Academic and professional project showcase
  - Contact: Contact form with validation and contact details

## Hosting Instructions for anagha.me

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Name it `anagha-portfolio` or similar
   - Make it public

2. **Upload Your Files**:
   - Upload all 4 files (index.html, styles.css, script.js, portrait.jpg) to the repository
   - You can drag and drop them directly on GitHub

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch" → "main" branch
   - Click "Save"

4. **Connect Your Domain**:
   - In your repository, create a file called `CNAME` (no extension)
   - Add this content: `anagha.me`
   - Save the file

5. **Update DNS Settings**:
   - In your Namecheap account, go to Domain List → Manage → Advanced DNS
   - Add these records:
     - Type: A, Host: @, Value: 185.199.108.153
     - Type: A, Host: @, Value: 185.199.109.153
     - Type: A, Host: @, Value: 185.199.110.153
     - Type: A, Host: @, Value: 185.199.111.153
     - Type: CNAME, Host: www, Value: yourusername.github.io

### Option 2: Netlify (Free)

1. **Go to [Netlify.com](https://netlify.com)**
2. **Sign up/Login**
3. **Drag and drop your project folder** to deploy
4. **Add custom domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `anagha.me`
5. **Update DNS** in Namecheap with Netlify's DNS settings

### Option 3: Vercel (Free)

1. **Go to [Vercel.com](https://vercel.com)**
2. **Import your project** (upload files)
3. **Add custom domain** in project settings
4. **Update DNS** in Namecheap

## DNS Configuration for Namecheap

1. **Login to Namecheap**
2. **Go to Domain List → anagha.me → Manage → Advanced DNS**
3. **Delete existing records** (if any)
4. **Add these records** (choose based on your hosting provider):

### For GitHub Pages:
```
Type: A, Host: @, Value: 185.199.108.153
Type: A, Host: @, Value: 185.199.109.153
Type: A, Host: @, Value: 185.199.110.153
Type: A, Host: @, Value: 185.199.111.153
Type: CNAME, Host: www, Value: yourusername.github.io
```

### For Netlify:
```
Type: A, Host: @, Value: 75.2.60.5
Type: A, Host: @, Value: 99.83.190.102
Type: CNAME, Host: www, Value: your-site-name.netlify.app
```

## Testing Your Website

1. **Local Testing**: Open `index.html` in your browser
2. **After Deployment**: Visit `anagha.me` (may take 24-48 hours for DNS propagation)

## Customization

- **Update Contact Info**: Edit the contact section in `index.html`
- **Change Colors**: Modify CSS variables in `styles.css`
- **Add Projects**: Update the projects section in `index.html`
- **Update Photo**: Replace `portrait.jpg` with your photo (keep same filename)

## Support

If you need help with hosting or customization, the files are well-documented and easy to modify.

---

**Your portfolio website is ready to go live! 🚀**
