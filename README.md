# ZEQUVIA TECH Company Website

A modern multi-page company website for ZEQUVIA TECH, built with plain HTML, CSS, and JavaScript.

## Run locally

From this folder, start a local web server:

```bash
python -m http.server 3000
```

Then open http://localhost:3000 in a browser.

## Production deployment

This project is configured for static hosting on GitHub Pages.

- Live site: https://thanjiwilly-png.github.io/ZEQUVIA-TECH/
- Contact form: FormSubmit using hello@zequviatech.com
- Custom domain ready: create a CNAME record pointing to the GitHub Pages URL

## Custom domain setup

1. Add a CNAME file in the repository with the domain name, for example:
   ```text
   zequviatech.com
   ```
2. In your DNS provider, configure:
   - A record for the apex domain to GitHub Pages IPs
   - CNAME record for www to the GitHub Pages hostname
3. Enable the custom domain in GitHub Pages settings.

## Business email

Update the form email and any mailto links to the real business inbox when the custom domain is active.
