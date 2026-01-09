import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/hesk"

def find_footers(ftp, current_dir):
    try:
        ftp.cwd(current_dir)
        items = []
        ftp.retrlines('LIST', items.append)
        
        for item in items:
            parts = item.split()
            name = parts[-1]
            if item.startswith('d'):
                find_footers(ftp, f"{current_dir}/{name}")
            elif name == "footer.inc.php":
                print(f"Found: {current_dir}/{name}")
    except Exception as e:
        pass

def main():
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Connected.")
        
        find_footers(ftp, REMOTE_DIR)
        
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
