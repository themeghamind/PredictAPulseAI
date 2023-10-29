import requests
import pytesseract
from PIL import Image
from io import BytesIO
import subprocess

def transcribe(url):
    
    # Use requests to download the image from the URL
    response = requests.get(url)
    
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content))
    
        text = pytesseract.image_to_string(img)
        
        with open("output.txt", "a") as f:
            f.write(text)
    
        subprocess.call(["cat", "output.txt"])
    else:
        print("Failed to download the image from the URL.")
        