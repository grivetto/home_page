import ftplib
from ftplib import FTP
import os

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_FILES = [
    "/www.grivetto.eu/hesk/inc/footer.inc.php",
    "/www.grivetto.eu/hesk/theme/hesk3/inc/footer.inc.php"
]
LOCAL_FILE = "hesk_temp/footer.inc.php"

def upload_fix():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        for remote_file in REMOTE_FILES:
            print(f"Uploading {LOCAL_FILE} to {remote_file}...")
            try:
                with open(LOCAL_FILE, "rb") as f:
                    ftp.storbinary(f"STOR {remote_file}", f)
                print(f"Upload to {remote_file} complete!")
            except Exception as e:
                print(f"Failed to upload to {remote_file}: {e}")
            
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    upload_fix()
