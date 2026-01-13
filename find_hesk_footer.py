import ftplib
from ftplib import FTP

FTP_HOST = "ftp.grivetto.eu"
FTP_USER = "6539170@aruba.it"
FTP_PASS = "@Freedom_2024!!"
REMOTE_DIR = "/www.grivetto.eu/hesk"

def find_file(ftp, current_dir, target_name):
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
                find_file(ftp, f"{current_dir}/{name}", target_name)
            elif name == target_name:
                print(f"FOUND: {current_dir}/{name}")
    except:
        pass

def main():
    try:
        ftp = FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        find_file(ftp, REMOTE_DIR, "footer.inc.php")
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
