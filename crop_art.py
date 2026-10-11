from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)
width, height = img.size

# In media_1791562581273.png (512 x 1024):
# The middle artwork (the contract paper + glowing blue AI shield + light ring):
# Top: around y = 430
# Bottom: around y = 745
# Left: around x = 70
# Right: around x = 480

crop_box = (65, 435, 485, 745)
middle_art = img.crop(crop_box)
print(f"Middle art size: {middle_art.size}")
middle_art.save(r"d:\projects\clausegaured ai\frontend\public\assets\middle-contract-shield.png")
middle_art.save(r"d:\projects\clausegaured ai\mobile\assets\middle-contract-shield.png")
print("Saved middle-contract-shield.png successfully!")
