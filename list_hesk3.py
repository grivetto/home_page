import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/hesk/theme/hesk3"

def list_recursive(ftp, current_dir):
    try:
        ftp.cwd(current_dir)
        items = []
        ftp.retrlines('LIST', items.append)
        
        for item in items:
            parts = item.split()
            name = parts[-1]
            if name in ['.', '..']:
                continue
            if item.startswith('d'):
                print(f"DIR: {current_dir}/{name}")
                list_recursive(ftp, f"{current_dir}/{name}")
            else:
                print(f"FILE: {current_dir}/{name}")
    except Exception as e:
        print(f"Error in {current_dir}: {e}")

def main():
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        list_recursive(ftp, REMOTE_DIR)
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
