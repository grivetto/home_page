import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu"

def list_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        ftp.cwd(REMOTE_DIR)
        files = []
        ftp.dir(files.append)
        
        print(f"Files in {REMOTE_DIR}:")
        for f in files:
            print(f)
            
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_files()
