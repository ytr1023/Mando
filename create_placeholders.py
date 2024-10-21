from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, color, text):
    img = Image.new('RGB', (800, 600), color=color)
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    text_width = right - left
    text_height = bottom - top
    position = ((800 - text_width) / 2, (600 - text_height) / 2)
    draw.text(position, text, fill="white", font=font)
    
    os.makedirs("static/img/placeholders", exist_ok=True)
    img.save(f"static/img/placeholders/{filename}")

create_placeholder("feature1_placeholder.png", "blue", "Teaching Courses")
create_placeholder("feature2_placeholder.png", "green", "AI Digital Human Sparring")
create_placeholder("feature3_placeholder.png", "red", "5D Feedback Report")

print("Placeholder images created successfully.")
