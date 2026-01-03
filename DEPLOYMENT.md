# Deployment Guide - Cloudflare Pages

This guide explains how to deploy All Online Tools Hub to Cloudflare Pages.

## Prerequisites

- GitHub account with repository access
- Cloudflare account (free tier works)
- Repository: `smartusercoder/allonlinetoolshub`

## Cloudflare Pages Setup

### Step 1: Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** in the left sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select **GitHub** and authorize Cloudflare
6. Select repository: `smartusercoder/allonlinetoolshub`

### Step 2: Configure Build Settings

Use these exact settings in the Cloudflare Pages configuration:

```
Project name: allonlinetoolshub (or your preferred name)
Production branch: main (or your default branch)
Build command: npm run build
Build output directory: .
Root directory: (leave blank)
```

### Step 3: Environment Variables

**Node.js Version:**
- Variable: `NODE_VERSION`
- Value: `18`

No other environment variables are required.

### Step 4: Deploy

1. Click **Save and Deploy**
2. Cloudflare will automatically build and deploy your site
3. First deployment takes 1-2 minutes

## Build Configuration Explained

### package.json Build Script

```json
"build": "echo 'Site is pre-built and ready for deployment' && test -f index.html && test -d assets"
```

This script:
- Validates that `index.html` exists
- Validates that `assets/` directory exists
- Confirms the site is pre-built and ready

### wrangler.toml

The `wrangler.toml` file is minimal for Pages compatibility:

```toml
name = "allonlinetoolshub"
compatibility_date = "2025-01-03"
pages_build_output_dir = "."
```

**Why so minimal?**
- Cloudflare Pages uses different configuration than Workers
- Build settings are configured in the dashboard
- Headers and redirects use `_headers` and `_redirects` files

## Custom Configuration Files

### _headers (Security & Caching)

Contains:
- Security headers (CSP, X-Frame-Options, etc.)
- Cache-Control rules for different file types
- CORS policies

Cloudflare Pages automatically applies these headers.

### _redirects (URL Redirects)

Contains URL redirect rules (if needed).

### _routes.json (Advanced Routing)

Contains routing configuration for the application.

## Deployment Workflow

### Automatic Deployments

Cloudflare Pages automatically deploys when you:
1. Push to the production branch (main)
2. Merge a pull request to the production branch

### Preview Deployments

Cloudflare automatically creates preview deployments for:
- Pull requests
- Non-production branches

Preview URL format: `https://[commit-hash].allonlinetoolshub.pages.dev`

## Custom Domain Setup

### Add Custom Domain

1. In Cloudflare Pages, go to your project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `allonlinetoolshub.com`
5. Follow DNS configuration instructions

### DNS Configuration

If your domain is on Cloudflare:
1. Cloudflare automatically adds required DNS records
2. SSL/TLS certificate is auto-provisioned

If your domain is elsewhere:
1. Add CNAME record: `allonlinetoolshub.pages.dev`
2. Wait for DNS propagation (up to 24 hours)

### WWW Subdomain

To support `www.allonlinetoolshub.com`:
1. Add another custom domain: `www.allonlinetoolshub.com`
2. Or add redirect in `_redirects` file

## Troubleshooting

### Build Fails with "command not found: npm"

**Solution:** Add environment variable `NODE_VERSION = 18`

### Build Fails with "package.json not found"

**Solution:** Ensure `Root directory` is blank (empty field)

### Build Succeeds but Site Doesn't Work

**Solution:**
- Check that `Build output directory` is set to `.` (dot)
- Verify `index.html` is in the root directory
- Check browser console for errors

### Custom Domain Not Working

**Solution:**
- Wait up to 24 hours for DNS propagation
- Check DNS records are correct
- Ensure SSL/TLS is set to "Full" in Cloudflare

### Headers Not Applied

**Solution:**
- Verify `_headers` file is in root directory
- Check syntax in `_headers` file
- Wait a few minutes for cache to clear
- Test with `curl -I https://yoursite.com`

## Performance Optimization

### Cloudflare Features to Enable

1. **Auto Minify** (HTML, CSS, JS)
   - Dashboard → Speed → Optimization
   - Enable HTML, CSS, JavaScript minification

2. **Brotli Compression**
   - Enabled by default on Cloudflare
   - No configuration needed

3. **HTTP/3 (QUIC)**
   - Dashboard → Network
   - Enable HTTP/3

4. **Early Hints**
   - Dashboard → Speed → Optimization
   - Enable Early Hints

## Security Settings

### Recommended Cloudflare Settings

1. **SSL/TLS Mode**: Full (Strict)
2. **Always Use HTTPS**: Enabled
3. **Automatic HTTPS Rewrites**: Enabled
4. **Minimum TLS Version**: 1.2
5. **TLS 1.3**: Enabled
6. **HSTS**: Enable with preload

## Analytics

### Cloudflare Web Analytics

1. Go to **Analytics & Logs** → **Web Analytics**
2. Click **Add a site**
3. Enter site name: `All Online Tools Hub`
4. Copy the analytics script
5. Add to `index.html` (see ANALYTICS-SETUP.md)

### Built-in Analytics

Cloudflare Pages provides:
- Page views
- Unique visitors
- Geographic data
- Bandwidth usage
- Status code distribution

Access via: **Analytics & Logs** → **Web Analytics**

## Continuous Deployment

### Branch Deployments

Configure which branches trigger deployments:
1. Go to **Settings** → **Builds & deployments**
2. Configure **Production branch**
3. Configure **Preview branches**

### Deploy Hooks

Create webhook for manual deployments:
1. Go to **Settings** → **Builds & deployments**
2. Click **Add deploy hook**
3. Use webhook URL to trigger deployments

Example:
```bash
curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy/YOUR_HOOK
```

## Rollback

### Rollback to Previous Deployment

1. Go to **Deployments** tab
2. Find the working deployment
3. Click **⋯** menu
4. Select **Rollback to this deployment**

## Environment-Specific Configuration

### Production Environment

- Branch: `main` (or your default)
- URL: `https://allonlinetoolshub.com`
- Environment variables in dashboard

### Preview Environment

- Branch: Any non-production branch
- URL: `https://[commit-hash].allonlinetoolshub.pages.dev`
- Can have different environment variables

## Cost

Cloudflare Pages Free Tier includes:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Concurrent builds: 1

Upgrade to Pro ($20/month) for:
- 5,000 builds per month
- Concurrent builds: 5
- Advanced features

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages
- **Community**: https://community.cloudflare.com
- **Status**: https://www.cloudflarestatus.com

## Deployment Checklist

Before going live:

- [ ] Build succeeds locally (`npm run build`)
- [ ] All files committed to repository
- [ ] Cloudflare Pages project created
- [ ] Build settings configured correctly
- [ ] Environment variables set (NODE_VERSION = 18)
- [ ] First deployment successful
- [ ] Site loads correctly at Pages URL
- [ ] All tools function properly
- [ ] Custom domain configured (if applicable)
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Headers applied correctly (test with curl)
- [ ] Performance optimizations enabled
- [ ] Security settings configured
- [ ] Analytics installed (optional)
- [ ] Monitoring set up (optional)

---

**Need help?** Check the [README.md](README.md) or [open an issue](https://github.com/smartusercoder/allonlinetoolshub/issues).
