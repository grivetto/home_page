import requests

url = "https://www.grivetto.eu/assets/index-BcgmwoZr.js"
search_term = "Icone Internazionali"

try:
    print(f"Downloading {url}...")
    response = requests.get(url)
    response.raise_for_status()
    
    content = response.text
    if search_term in content:
        print(f"SUCCESS: Found '{search_term}' in the file.")
        # Print a snippet around the term
        index = content.find(search_term)
        start = max(0, index - 50)
        end = min(len(content), index + 50)
        print(f"Snippet: ...{content[start:end]}...")
    else:
        print(f"FAILURE: Did NOT find '{search_term}' in the file.")
        print(f"File length: {len(content)}")
        print(f"First 100 chars: {content[:100]}")

except Exception as e:
    print(f"Error: {e}")
