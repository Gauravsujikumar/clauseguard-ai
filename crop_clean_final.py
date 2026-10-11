from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)

# y=462 skips the letters completely
crop_box = (50, 462, 474, 742)
middle_art = img.crop(crop_box)
print(f"Final Middle Art Size: {middle_art.size}")
middle_art.save(r"d:\projects\clausegaured ai\frontend\public\assets\middle-contract-shield.png")
middle_art.save(r"d:\projects\clausegaured ai\mobile\assets\middle-contract-shield.png")
print("Saved 100% clean middle-contract-shield.png!")
