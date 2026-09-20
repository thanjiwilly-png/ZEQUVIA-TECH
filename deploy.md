# ZEQUVIA TECH Deployment Guide

## Option 1: Netlify (recommended)
1. Push this folder to GitHub.
2. Sign in to Netlify.
3. Click Add new project > Import an existing project.
4. Select the repository.
5. Set publish directory to `.`
6. Deploy.
7. Add a custom domain such as `www.zequiatech.com`.

## Option 2: GitHub Pages
1. Push the project to a GitHub repository.
2. Enable GitHub Pages in the repository settings.
3. Set the source to the root branch.
4. Use the site URL provided by GitHub.

## Important production tasks
- Replace placeholder domain in `robots.txt` and `sitemap.xml` with the final live domain.
- Connect the contact form to Formspree, Netlify Forms, or an email API.
- Add Google Analytics if needed.
- Review the site on mobile and across browsers before making it public.
