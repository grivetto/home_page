import xmlrpc.client

# Configuration
WP_URL = "https://grivetto.eu/wordpress/xmlrpc.php"
USER = "admin"
PASS = "@Romeo_2030"

def test_xmlrpc():
    try:
        server = xmlrpc.client.ServerProxy(WP_URL)
        # Try to get users blogs to verify connection
        print("Attempting XML-RPC connection...")
        user_info = server.wp.getUsersBlogs(USER, PASS)
        print("XML-RPC Connection Successful!")
        print(user_info)
    except Exception as e:
        print(f"XML-RPC Failed: {e}")

if __name__ == "__main__":
    test_xmlrpc()
