import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"

def list_files():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        target_dir = '/www.grivetto.eu/mail/data/settings/modules'
        print(f"Listing {target_dir}:")
        try:
            ftp.cwd(target_dir)
            files = ftp.nlst()
            for f in files:
                print(f)
        except Exception as e:
            print(f"Error listing {target_dir}: {e}")
        
        ftp.quit()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_files()
