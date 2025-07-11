# Email Notification Setup Guide

This guide will help you set up email notifications for form submissions in the Unity Innovate project. When users fill out forms (Contact, Newsletter, Career, Consultation), a copy will be automatically sent to `unityinnovate895@gmail.com`.

## Prerequisites

- Gmail account (unityinnovate895@gmail.com)
- 2-Step Verification enabled on the Gmail account
- Strapi backend running

## Step 1: Enable 2-Step Verification

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "How you sign in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2-Step Verification if not already enabled

## Step 2: Generate Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "How you sign in to Google", click on "2-Step Verification"
4. Scroll down and click on "App passwords"
5. You might need to sign in again
6. Select "Mail" for the app and "Other (Custom name)" for the device
7. Enter "Unity Innovate Notifications" as the custom name
8. Click "Generate"
9. **Important**: Copy the 16-character app password immediately (it won't be shown again)

## Step 3: Configure Environment Variables

1. Navigate to the `backend` folder
2. Create a `.env` file based on `.env.example` if it doesn't exist
3. Add the following email configuration variables:

```env
# Email Configuration (Gmail)
GMAIL_USER=unityinnovate895@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
NOTIFICATION_EMAIL=unityinnovate895@gmail.com
```

Replace:
- `your-16-character-app-password` with the app password generated in Step 2

## Step 4: Test the Setup

1. Start the Strapi backend:
   ```bash
   cd backend
   npm run develop
   ```

2. Start the Next.js frontend:
   ```bash
   npm run dev
   ```

3. Go to the contact page: http://localhost:3001/contact
4. Fill out and submit the contact form
5. Check `unityinnovate895@gmail.com` inbox for the notification email

## Email Notification Features

- **Professional HTML Templates**: Emails are sent with beautifully formatted HTML templates matching Unity Innovate branding
- **Form Type Detection**: Emails automatically identify the type of form submitted (Contact, Newsletter, Career, Consultation)
- **Complete Form Data**: All form fields are included in a structured table format
- **Submission Metadata**: Includes timestamp, client email, and form type
- **Fallback Handling**: If email sending fails, form submission still succeeds
- **Security**: Uses secure Gmail SMTP with app passwords

## Email Template Features

- Unity Innovate branded header with gradient background
- Organized submission details section
- Structured form data table
- Professional footer with company branding
- Responsive design for all email clients
- Security note about automated notifications

## Troubleshooting

### Email Not Received
1. Check Gmail spam/junk folder
2. Verify Gmail credentials in `.env` file
3. Ensure 2-Step Verification is enabled
4. Generate a new app password if needed
5. Check Strapi console logs for error messages

### Authentication Errors
1. Verify the Gmail username is correct (unityinnovate895@gmail.com)
2. Ensure the app password is exactly 16 characters
3. Make sure 2-Step Verification is enabled
4. Try generating a new app password

### SMTP Connection Issues
1. Check internet connectivity
2. Verify Gmail SMTP settings (smtp.gmail.com:587)
3. Ensure firewall isn't blocking port 587
4. Try restarting the Strapi server

## Form Types Supported

- **Contact Forms**: Main contact page submissions
- **Newsletter Signups**: Email newsletter subscriptions
- **Career Applications**: Job application submissions
- **Consultation Requests**: Business consultation inquiries

## Security Notes

- App passwords are more secure than enabling "Less secure app access"
- Environment variables keep credentials secure
- Never commit `.env` files to version control
- App passwords can be revoked anytime from Google Account settings

## Customization

To change the notification email address:
1. Update `NOTIFICATION_EMAIL` in the `.env` file
2. Restart the Strapi server

To modify email templates:
1. Edit the `generateEmailTemplate` function in `backend/src/api/form-submission/controllers/form-submission.ts`
2. Restart the Strapi server to apply changes

## Gmail Limitations

- **Daily Limit**: Gmail accounts can send ~100-150 emails per day
- **Rate Limiting**: Don't send emails too rapidly
- **Attachment Size**: Max 25MB per email (not applicable for form notifications)

For high-volume email sending, consider upgrading to Google Workspace or using dedicated email services like SendGrid, Mailgun, or AWS SES. 