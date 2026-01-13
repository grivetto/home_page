import requests
import base64
import json

# Configuration
WP_URL = "https://grivetto.eu/wordpress/wp-json/wp/v2"
USER = "gravity"
PASS = "y8L2 AMbw sinv NwOz OMRp WHzK"

def test_connection():
    # Try to get posts to verify public access
    try:
        response = requests.get(f"{WP_URL}/posts")
        print(f"Public API Access: {response.status_code}")
    except Exception as e:
        print(f"Public API Failed: {e}")
        return

    # Try to authenticate (create a dummy draft post)
    # Try with spaces removed
    clean_pass = PASS.replace(" ", "")
    credentials = f"{USER}:{clean_pass}"
    token = base64.b64encode(credentials.encode())
    headers = {
        'Authorization': f'Basic {token.decode("utf-8")}',
        'Content-Type': 'application/json'
    }

    post_data = {
        'title': 'Connection Test',
        'content': 'This is a test post from the automation agent.',
        'status': 'draft' 
    }

    try:
        # Note: Basic Auth might not work if not enabled. 
        # Application Passwords are preferred but we only have the main password.
        # We will try to see if we can get the current user info first.
        response = requests.get(f"{WP_URL}/users/me", headers=headers)
        print(f"Auth Check Status: {response.status_code}")
        if response.status_code == 200:
            print("Authentication Successful!")
            print(f"User: {response.json()['name']}")
        else:
            print("Authentication Failed. Basic Auth might be disabled or credentials wrong.")
            print(response.text)
    except Exception as e:
        print(f"Auth Check Failed: {e}")

if __name__ == "__main__":
    test_connection()
