import ftplib
from ftplib import FTP
import os

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu"
LOCAL_FILE = "dist/index.html"

def upload_index():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        ftp.cwd(REMOTE_DIR)
        
        if os.path.exists(LOCAL_FILE):
            print(f"Uploading {LOCAL_FILE}...")
            with open(LOCAL_FILE, "rb") as f:
                ftp.storbinary("STOR index.html", f)
            print("Upload complete.")
        else:
            print(f"Error: {LOCAL_FILE} not found.")
            
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    upload_index()
