# EmailJS Setup Instructions

The contact form is configured to use EmailJS for sending emails. Follow these steps to set it up:

## Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Add Email Service
1. Go to https://dashboard.emailjs.com/admin/integration
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to https://dashboard.emailjs.com/admin/template-engine
2. Click "Create New Template"
3. You'll see several tabs at the top: **Content**, **Auto-Reply**, **Attachments**, **Contacts**, and **Settings**

### Configure the Content Tab:
4. **Subject Field** (Required):
   - Enter: `Contact Form Message from {{from_name}}`
   - Or use: `New Portfolio Contact: {{from_name}}`
   - The `{{from_name}}` will be replaced with the sender's name

5. **Content Section** (Required):
   - You'll see two sub-tabs: **Desktop** and **Mobile** (both should have the same content)
   - Click "Edit Content" button (pencil icon) to customize the email body
   - Recommended email template:
   ```
   A new message has been received from your portfolio contact form.
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   This message was sent from your portfolio website contact form.
   ```
   - Or use a more formatted version:
   ```
   <h2>New Contact Form Submission</h2>
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   ```

### Configure Email Recipients (Right Column):
6. **To Email** (Required):
   - Enter: `namasevi.anagha@gmail.com`
   - This is where you'll receive the contact form submissions

7. **From Name**:
   - Enter: `{{from_name}}`
   - This will show the sender's name in the "From" field

8. **From Email** (Required):
   - Check "Use Default Email Address" if you want to use your EmailJS default
   - OR enter: `{{from_email}}` to show the sender's email
   - Note: Some email providers may reject emails with custom "From" addresses

9. **Reply To**:
   - Enter: `{{from_email}}`
   - This allows you to reply directly to the sender's email address

10. **Cc** and **Bcc** (Optional):
    - Leave empty unless you want to copy other email addresses

### Available Template Variables:
Your contact form sends these variables that you can use in the template:
- `{{from_name}}` - The sender's name (from the form)
- `{{from_email}}` - The sender's email address (from the form)
- `{{message}}` - The message content (from the form)
- `{{to_name}}` - Your name (hardcoded as "Anagha Namasevi")

11. Click **"Save"** at the bottom of the page
12. Copy your **Template ID** (e.g., `template_xxxxxxx`) - you'll see it in the URL or template list

## Step 4: Get Public Key
1. Go to https://dashboard.emailjs.com/admin/integration
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Update script.js
Open `script.js` and replace these values:

1. **Line 323**: Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   ```javascript
   emailjs.init('your-actual-public-key-here');
   ```

2. **Line 395**: Replace `YOUR_SERVICE_ID` with your Service ID
   ```javascript
   'service_xxxxxxx',  // Replace with your actual Service ID
   ```

3. **Line 396**: Replace `YOUR_TEMPLATE_ID` with your Template ID
   ```javascript
   'template_xxxxxxx', // Replace with your actual Template ID
   ```

Example:
```javascript
emailjs.init('abc123xyz789'); // Your Public Key

const response = await emailjs.send(
  'service_abc123',  // Your Service ID
  'template_xyz789', // Your Template ID
  {
    from_name: name,
    from_email: email,
    message: message,
    to_name: 'Anagha Namasevi'
  }
);
```

## Step 6: Testing
1. Open your portfolio website in a browser
2. Navigate to the Contact section
3. Fill out the contact form with test data:
   - Name: Test User
   - Email: your-test-email@example.com
   - Message: This is a test message
4. Click "Send Message"
5. Check your email inbox (`namasevi.anagha@gmail.com`)
6. The form should show a success message: "Thank you! Your message has been sent successfully..."
7. Verify the email was received with correct formatting

### Testing Tips:
- Check browser console (F12) for any JavaScript errors
- Make sure you haven't exceeded the 200 emails/month free limit
- Verify all three IDs (Public Key, Service ID, Template ID) are correctly entered

## Troubleshooting

### Common Issues:

1. **"Invalid Public Key" Error**
   - Double-check the Public Key in `script.js` line 323
   - Make sure there are no extra spaces or quotes
   - Get the key from: https://dashboard.emailjs.com/admin/integration

2. **"Service ID not found" Error**
   - Verify the Service ID is correct (starts with `service_`)
   - Make sure the email service is active in EmailJS dashboard
   - Check: https://dashboard.emailjs.com/admin/integration

3. **"Template ID not found" Error**
   - Verify the Template ID is correct (starts with `template_`)
   - Make sure the template is saved and published
   - Check: https://dashboard.emailjs.com/admin/template-engine

4. **Emails Not Received**
   - Check spam/junk folder
   - Verify "To Email" field in template is set to `namasevi.anagha@gmail.com`
   - Check EmailJS dashboard for email logs/activity
   - Verify you haven't exceeded the 200 emails/month limit

5. **Template Variables Not Working**
   - Make sure variable names match exactly: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Variable names are case-sensitive
   - Check that variables are wrapped in double curly braces `{{ }}`

6. **Form Shows Success But No Email**
   - Check browser console (F12) for errors
   - Verify EmailJS service is connected properly
   - Check EmailJS dashboard for failed email attempts
   - Try testing with a different email address

### Getting Help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://dashboard.emailjs.com/support
- Check EmailJS dashboard activity logs for detailed error messages

## Alternative: Use Formspree
If you prefer not to use EmailJS, you can use Formspree instead:
1. Sign up at https://formspree.io/
2. Create a new form
3. Replace the form action with your Formspree endpoint
4. Update the form submission handler accordingly

