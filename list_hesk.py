import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/hesk"

def list_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        ftp.cwd(REMOTE_DIR)
        print(f"Listing {REMOTE_DIR}:")
        ftp.dir()
        
        # Check for theme folder
        print("\nChecking 'theme' directory if exists:")
        try:
            ftp.cwd("theme")
            ftp.dir()
        except:
            print("No 'theme' directory found or accessible.")

        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_files()
