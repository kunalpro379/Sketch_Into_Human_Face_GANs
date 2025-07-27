import cv2
import numpy as np

# Read the sketch image
input_path = r"c:\Users\kunal\OneDrive\CODE FOR LIFE\HumanFace\backend\correct_sketch.jpg"
output_path = r"c:\Users\kunal\OneDrive\CODE FOR LIFE\HumanFace\backend\inverted_sketch.jpg"

# Read the image
sketch = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)  # Read as grayscale

# Invert the image (255 - pixel value)
inverted_sketch = 255 - sketch

# Save the inverted image
cv2.imwrite(output_path, inverted_sketch)

print(f"Inverted image saved to: {output_path}")

# Optional: Display the original and inverted images
cv2.imshow('Original Sketch', sketch)
cv2.imshow('Inverted Sketch', inverted_sketch)
cv2.waitKey(0)
cv2.destroyAllWindows()