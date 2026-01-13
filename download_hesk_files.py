import ftplib
from ftplib import FTP
import os

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/hesk"
LOCAL_DIR = "hesk_temp"

FILES_TO_TRY = [
    "header.txt",
    "footer.txt",
    "theme/hesk3/customer/header.php",
    "theme/hesk3/customer/footer.php",
    "inc/header.inc.php",
    "inc/footer.inc.php"
]

def download_files():
    if not os.path.exists(LOCAL_DIR):
        os.makedirs(LOCAL_DIR)

    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        for remote_file in FILES_TO_TRY:
            remote_path = f"{REMOTE_DIR}/{remote_file}"
            local_path = os.path.join(LOCAL_DIR, os.path.basename(remote_file))
            
            print(f"Trying to download {remote_path}...")
            try:
                with open(local_path, "wb") as f:
                    ftp.retrbinary(f"RETR {remote_path}", f.write)
                print(f"Successfully downloaded {remote_file}")
            except Exception as e:
                print(f"Failed to download {remote_file}: {e}")
                if os.path.exists(local_path):
                    os.remove(local_path)

        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    download_files()
