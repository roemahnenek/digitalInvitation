# Deployment Guide for Vercel

This guide will help you deploy your Digital Wedding Invitation to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
3. A [Cloudinary account](https://cloudinary.com/users/register/free)

## Environment Variables Setup

You need to configure the following environment variables in your Vercel project:

### MongoDB Configuration
- `MONGODB_URI`: Your MongoDB connection string from MongoDB Atlas

### Cloudinary Configuration
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import your repository in Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add each of the required environment variables:
     - `MONGODB_URI`
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
   - Make sure to add them for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a production URL like `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts to link your project
   - Add environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Setting up MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP addresses (or use `0.0.0.0/0` for all IPs in production)
4. Get your connection string from the "Connect" button
5. Replace `<username>` and `<password>` with your credentials
6. Add `/wedding_invitations` after the cluster URL to specify the database name

## Setting up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Find your credentials:
   - Cloud Name
   - API Key
   - API Secret
4. Copy these values to your Vercel environment variables

## Post-Deployment

### Custom Domain (Optional)
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### Monitoring
- Check the "Analytics" tab in Vercel for visitor insights
- Monitor logs in the "Functions" tab for API errors
- Set up alerts for failed deployments

### Automatic Deployments
- Every push to your `main` branch will trigger a production deployment
- Pull requests will create preview deployments automatically

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify your Node.js version matches your local development

### Database Connection Issues
- Verify your MongoDB URI is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure the database user has proper permissions

### Image Upload Issues
- Verify Cloudinary credentials
- Check API limits on your Cloudinary account
- Ensure `secure: true` is set in cloudinary config

### API Route Errors
- Check function logs in Vercel dashboard
- Verify API routes are working locally first
- Ensure proper error handling in API routes

## Performance Optimization

The application includes:
- Next.js automatic code splitting
- Image optimization via Next.js Image component
- Cloudinary CDN for image delivery
- MongoDB connection pooling
- Vercel Edge Network for global distribution

## Security Best Practices

✅ Environment variables are properly configured
✅ MongoDB credentials are not exposed
✅ Cloudinary uses secure connections
✅ API routes have proper error handling
✅ `.gitignore` prevents committing sensitive files

## Support

For Vercel-specific issues: [Vercel Documentation](https://vercel.com/docs)
For Next.js issues: [Next.js Documentation](https://nextjs.org/docs)

## Additional Resources

- [Vercel + Next.js Guide](https://vercel.com/docs/frameworks/nextjs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
