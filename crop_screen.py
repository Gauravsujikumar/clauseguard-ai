from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)
print(f"Original: {img.size}")

# The image is a phone mockup. Let's find the inner screen coordinates.
# Typical iPhone mockup frame: remove outer phone bezels (top speaker, outer black case)
# Let's inspect or crop the active screen inside the black phone border.
width, height = img.size
# Let's crop the actual screen inside the bezel
# Usually bezels are around 4-5% on left/right and ~3-4% on top/bottom
left = int(width * 0.058)
right = int(width * 0.942)
top = int(height * 0.045)
bottom = int(height * 0.975)

cropped = img.crop((left, top, right, bottom))
print(f"Cropped: {cropped.size}")

cropped.save(r"d:\projects\clausegaured ai\frontend\public\assets\mobile-login-bg.png")
cropped.save(r"d:\projects\clausegaured ai\mobile\assets\mobile-login-bg.png")
print("Saved cropped screen successfully!")
