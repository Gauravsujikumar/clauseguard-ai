
from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)
width, height = img.size

# Let's crop right inside the black screen bezels:
# Left/right: 36px to width - 36px
# Top: cut below dynamic island / status bar so it's pure clean app header (approx y=65px)
# Bottom: cut above home indicator (approx y=height - 35px)
left = 37
right = width - 37
top = 68
bottom = height - 38

clean_screen = img.crop((left, top, right, bottom))
print(f"Clean Screen Size: {clean_screen.size}")
clean_screen.save(r"d:\projects\clausegaured ai\frontend\public\assets\mobile-screen-clean.png")
clean_screen.save(r"d:\projects\clausegaured ai\mobile\assets\mobile-screen-clean.png")
print("Saved clean screen successfully!")
