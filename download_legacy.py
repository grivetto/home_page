import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_FILE = "/www.grivetto.eu/index.php"
LOCAL_FILE = "index_alpha0.0.1.php"

def download_legacy():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        print(f"Downloading {REMOTE_FILE} to {LOCAL_FILE}...")
        with open(LOCAL_FILE, "wb") as f:
            ftp.retrbinary(f"RETR {REMOTE_FILE}", f.write)
            
        print("Download complete!")
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    download_legacy()
