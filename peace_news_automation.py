import requests
import base64
import datetime
import xml.etree.ElementTree as ET
import time

# ==========================================
# CONFIGURATION
# ==========================================
WP_URL = "https://grivetto.eu/wordpress/wp-json/wp/v2"
# IMPORTANT: For this script to work, you MUST generate an Application Password
# Go to Users -> Profile -> Application Passwords in WordPress Admin.
WP_USER = "admin" 
WP_APP_PASSWORD = "l00F u52d 387B 125B 3217 0000"  # Replace with the generated password

# RSS Feeds for Sourcing
RSS_FEEDS = [
    "https://news.google.com/rss/search?q=manifestazioni+pace&hl=it&gl=IT&ceid=IT:it",
    "https://news.google.com/rss/search?q=peace+protests&hl=en-US&gl=US&ceid=US:en"
]

# Keywords to filter for high relevance
KEYWORDS = ["pace", "peace", "manifestazione", "protest", "corteo", "march", "sit-in"]

def fetch_news():
    """Fetches news from RSS feeds and filters them."""
    articles = []
    print("Searching for peace news...")
    
    for feed_url in RSS_FEEDS:
        try:
            response = requests.get(feed_url)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                for item in root.findall('.//item'):
                    title = item.find('title').text
                    link = item.find('link').text
                    pub_date = item.find('pubDate').text
                    description = item.find('description').text
                    
                    # Simple keyword filter
                    if any(keyword in title.lower() for keyword in KEYWORDS):
                        articles.append({
                            'title': title,
                            'link': link,
                            'pub_date': pub_date,
                            'description': description
                        })
        except Exception as e:
            print(f"Error fetching feed {feed_url}: {e}")
            
    print(f"Found {len(articles)} potential articles.")
    return articles[:5] # Return top 5 for now

def format_content(article):
    """Formats the article content for WordPress."""
    # In a real scenario, you might use an LLM here to summarize 300 words.
    # For this script, we'll structure the available data.
    
    html_content = f"""
    <!-- wp:paragraph -->
    <p><strong>Fonte:</strong> <a href="{article['link']}">Google News / Original Source</a></p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>Dettagli Evento</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><strong>Data Rilevamento:</strong> {datetime.datetime.now().strftime("%d/%m/%Y")}</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>{article['description']}</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:paragraph -->
    <p><em>Questa notizia è stata aggregata automaticamente dal sistema di monitoraggio Grivetto Peace Monitor.</em></p>
    <!-- /wp:paragraph -->
    """
    return html_content

def post_to_wordpress(article):
    """Posts the article to WordPress as a Draft."""
    
    credentials = f"{WP_USER}:{WP_APP_PASSWORD}"
    token = base64.b64encode(credentials.encode())
    headers = {
        'Authorization': f'Basic {token.decode("utf-8")}',
        'Content-Type': 'application/json'
    }

    post_data = {
        'title': article['title'],
        'content': format_content(article),
        'status': 'draft', # Always draft for review
        'categories': [1], # Default to Uncategorized or change ID if 'Eventi' exists
        'meta': {
            '_ai_generated': 'true'
        }
    }

    try:
        # Check for duplicates (simple check by title)
        search_url = f"{WP_URL}/posts?search={article['title']}"
        search_res = requests.get(search_url, headers=headers)
        if search_res.status_code == 200 and len(search_res.json()) > 0:
            print(f"Skipping duplicate: {article['title']}")
            return

        response = requests.post(f"{WP_URL}/posts", headers=headers, json=post_data)
        if response.status_code == 201:
            print(f"Successfully created draft: {article['title']}")
        else:
            print(f"Failed to create post: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"Error posting to WordPress: {e}")

def main():
    print("Starting Grivetto Peace Monitor...")
    articles = fetch_news()
    
    if not articles:
        print("No relevant news found today.")
        return

    for article in articles:
        post_to_wordpress(article)
        
    print("Automation cycle complete.")

if __name__ == "__main__":
    main()
