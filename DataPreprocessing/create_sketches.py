import cv2
import os
import glob

# Define paths
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
processed_dataset = os.path.join(base_dir, "Dataset", "HumanFaces")
final_dataset = os.path.join(base_dir, "DataPreprocessing", "finaldataset")

def create_directories():
    dirs = [
        os.path.join(final_dataset, "real"),
        os.path.join(final_dataset, "sketches")
    ]
    for dir in dirs:
        os.makedirs(dir, exist_ok=True)
    print("Directories created:", dirs)

def create_sketch(img):
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply Bilateral Filter for edge-preserving smoothing
    smooth_gray = cv2.bilateralFilter(gray, 5, 60, 60)
    
    # Use Canny edge detection for thinner edges
    edges = cv2.Canny(smooth_gray, 50, 150)
    
    # Invert colors for a sketch effect
    sketch = cv2.bitwise_not(edges)
    
    # Apply a slight Gaussian Blur to soften pixelation
    sketch = cv2.GaussianBlur(sketch, (3, 3), 0)
    
    return sketch

def process_images(source_dir, real_target_dir, sketch_target_dir):
    image_paths = sorted(glob.glob(os.path.join(source_dir, "*.jpg")))
    
    if not image_paths:
        print(f"No images found in {source_dir}")
        return
    
    for idx, img_path in enumerate(image_paths, start=1):
        # Read image
        img = cv2.imread(img_path)
        if img is None:
            print(f"Failed to load {img_path}")
            continue
            
        # Create sketch
        sketch = create_sketch(img)
        
        # Rename images with numbers
        filename = f"{idx}.jpg"
        real_output_path = os.path.join(real_target_dir, filename)
        sketch_output_path = os.path.join(sketch_target_dir, filename)

        # Save original real image and sketch
        cv2.imwrite(real_output_path, img)
        cv2.imwrite(sketch_output_path, sketch)

        print(f"Processed: {filename}")

def main():
    create_directories()
    
    # Define your source directory containing images to process.
    # For example, if your images are in the "real" subfolder of processed_dataset:
    source_dir = os.path.join(processed_dataset, )
    
    # Target directories for the output
    real_target = os.path.join(final_dataset, "real")
    sketch_target = os.path.join(final_dataset, "sketches")
    
    process_images(source_dir, real_target, sketch_target)
    
    print("Sketch creation complete! Check the finaldataset folder.")

if __name__ == "__main__":
    main()
