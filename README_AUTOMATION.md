# Peace News Automation (Browser Mode)

Since the WordPress API is blocked on your server, this script uses **Browser Automation** to log in and post news exactly like a human would.

## Prerequisites

1.  **Python 3.x** installed.
2.  **Install Dependencies**:
    ```bash
    pip install requests playwright
    python -m playwright install chromium
    ```

## Configuration

The script is pre-configured with:
-   **User**: `admin`
-   **Password**: `@Romeo_2030` (Your real login password)

## Running the Automation

Run the script from your terminal:

```bash
python peace_news_browser.py
```

**What you will see:**
1.  A Chromium browser window will open.
2.  It will log in to your WordPress.
3.  It will type the news title and content.
4.  It will save the post as a **Draft**.
5.  The browser will close.

This method bypasses the "401 Unauthorized" errors because it uses the standard web interface.
