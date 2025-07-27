import cv2
import os
import glob

# Define paths
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dataset_root = os.path.join(base_dir, "Dataset")
processed_dataset = os.path.join(base_dir,"DataPreprocessing", "processed_dataset")

# Define output folders structure
output_folders = {
    "train_sketch": os.path.join(processed_dataset, "train/sketch"),
    "train_real": os.path.join(processed_dataset, "train/real"),
    "test_sketch": os.path.join(processed_dataset, "test/sketch"),
    "test_real": os.path.join(processed_dataset, "test/real"),
}

# Create output directories
for folder in output_folders.values():
    os.makedirs(folder, exist_ok=True)

def process_images(input_folder, sketch_folder, real_folder):
    for img_path in glob.glob(os.path.join(input_folder, "*.jpg")):
        img = cv2.imread(img_path)
        
        if img is None:
            print(f"Failed to load {img_path}")
            continue

        img_name = os.path.basename(img_path)
        
        # Split image into two halves
        height, width, _ = img.shape
        mid = width // 2

        real_face = img[:, :mid]  # Left half is sketch
        sketch = img[:, mid:]  # Right half is real face

        # Save images
        cv2.imwrite(os.path.join(sketch_folder, img_name), sketch)
        cv2.imwrite(os.path.join(real_folder, img_name), real_face)
        print(f"Processed: {img_name}")

def main():
    # Process training data
    train_path = os.path.join(dataset_root, "train")
    process_images(train_path, 
                  output_folders["train_sketch"], 
                  output_folders["train_real"])

    # Process test data
    test_path = os.path.join(dataset_root, "test")
    process_images(test_path, 
                  output_folders["test_sketch"], 
                  output_folders["test_real"])

    print("Processing complete! Images saved in processed_dataset folder.")

if __name__ == "__main__":
    main()
