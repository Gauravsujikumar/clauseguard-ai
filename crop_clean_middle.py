from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)

# Let's crop clean middle art without any top-left text ("with AI.")
# In previous crop, y=435 captured the bottom tip of "with AI."
# So top should be y=452, bottom=740, left=50, right=476 (so we avoid black phone border at right)
crop_box = (50, 452, 474, 742)
middle_art = img.crop(crop_box)
print(f"Refined Middle Art Size: {middle_art.size}")
middle_art.save(r"d:\projects\clausegaured ai\frontend\public\assets\middle-contract-shield.png")
middle_art.save(r"d:\projects\clausegaured ai\mobile\assets\middle-contract-shield.png")
print("Saved clean middle-contract-shield.png!")
