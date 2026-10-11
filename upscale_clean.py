from PIL import Image

src_path = r"C:\Users\Gaurav Sujikumar\.gemini\antigravity\brain\ca527ad2-a815-48c0-8b83-c56a9d34603b\.user_uploaded\media_1791562581273.png"
img = Image.open(src_path)
width, height = img.size

left = 37
right = width - 37
top = 68
bottom = height - 38

clean_screen = img.crop((left, top, right, bottom))

# Upscale by 2x using highest-quality Lanczos resampling so on retina screens it's ultra crisp
crisp_2x = clean_screen.resize((clean_screen.width * 2, clean_screen.height * 2), Image.Resampling.LANCZOS)
print(f"Upscaled size: {crisp_2x.size}")

crisp_2x.save(r"d:\projects\clausegaured ai\frontend\public\assets\mobile-screen-hd.png", quality=100)
crisp_2x.save(r"d:\projects\clausegaured ai\mobile\assets\mobile-screen-hd.png", quality=100)
print("Saved HD retina image successfully!")
