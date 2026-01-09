import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"

def check_index():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print("Downloading www.grivetto.eu/index.html...")
        with open("downloaded_index.html", "wb") as f:
            ftp.retrbinary("RETR /www.grivetto.eu/index.html", f.write)
        
        print("Download complete.")
        
        with open("downloaded_index.html", "r", encoding="utf-8") as f:
            content = f.read()
            print("Content start:")
            print(content[:200])
            
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_index()
