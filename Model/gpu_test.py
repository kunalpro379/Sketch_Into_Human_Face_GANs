import tensorflow as tf
import os

# Enable GPU memory growth to avoid taking all GPU memory at once
physical_devices = tf.config.list_physical_devices('GPU')
try:
    for device in physical_devices:
        tf.config.experimental.set_memory_growth(device, True)
        print(f'Memory growth enabled on {device}')
except:
    print("Invalid device or cannot modify virtual devices once initialized")

# Print GPU information
print("\nGPU Information:")
print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))
print("TensorFlow version:", tf.__version__)
print("Is GPU available:", tf.test.is_built_with_cuda())
print("Is GPU being used:", tf.test.is_built_with_gpu_support())

# Run a simple test to verify GPU usage
def test_gpu():
    # Create some random tensors
    with tf.device('/GPU:0'):
        a = tf.random.normal([10000, 10000])
        b = tf.random.normal([10000, 10000])
        c = tf.matmul(a, b)
    
    print("\nMatrix multiplication result shape:", c.shape)
    print("Device used:", c.device)

if __name__ == "__main__":
    test_gpu() 