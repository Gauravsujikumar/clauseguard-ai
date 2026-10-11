from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)

# Top must be y=462 to skip "with AI." completely!
# Left: 45, Right: 480
# Bottom: 742 (right above the blue button)
crop_box = (45, 462, 480, 742)
art = img.crop(crop_box)

art_2x = art.resize((art.width * 2, art.height * 2), Image.Resampling.LANCZOS)
art_2x.save(r"d:\projects\clausegaured ai\frontend\public\assets\contract-3d-clean.png", quality=100)
art_2x.save(r"d:\projects\clausegaured ai\mobile\assets\contract-3d-clean.png", quality=100)
print(f"Saved 100% clean art size: {art_2x.size}")
