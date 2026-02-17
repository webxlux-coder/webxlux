# How to Deploy to Hostinger

I have prepared a deployment file for you: `hostinger_deploy.zip`.

### Follow these steps to put your site online:

1.  **Log in to Hostinger hPanel**: Go to [hPanel](https://hpanel.hostinger.com/).
2.  **Access File Manager**: Navigate to your website's **File Manager**.
3.  **Go to `public_html`**: Open the `public_html` folder. (Delete any default `index.php` or `default.php` files if they exist).
4.  **Upload the Zip**: Upload the `hostinger_deploy.zip` file located in your project directory.
5.  **Extract**: Right-click the uploaded `hostinger_deploy.zip` and select **Extract**.
    - *Make sure the files (index.html, assets folder, etc.) are placed directly inside `public_html`, not inside a subfolder.*
6.  **Done!**: Your website should now be live at your domain.

### Technical Details include:
- **Optimization**: The files are minified and compressed for fast loading.
- **Routing Support**: I've included an `.htaccess` file so that your sub-pages and sections work perfectly on Hostinger's servers.
- **Supabase Integration**: Your database connection is already configured within the built files.
