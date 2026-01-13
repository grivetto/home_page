import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/assets"

def cleanup_assets():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")

        ftp.cwd(REMOTE_DIR)
        files = ftp.nlst()
        print(f"Found files: {files}")

        for file in files:
            if file not in [".", ".."]:
                print(f"Deleting file: {file}")
                try:
                    ftp.delete(file)
                except Exception as e:
                    print(f"Could not delete {file}: {e}")

        ftp.quit()
        print("Cleanup complete.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    cleanup_assets()
