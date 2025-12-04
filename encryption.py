from cryptography.fernet import Fernet
import os

# Generate a key and save it into a file
def write_key():
    key = Fernet.generate_key()
    with open("key.key", "wb") as key_file:
        key_file.write(key)

# Load the key from the current directory named `key.key`
def load_key():
    if not os.path.exists("key.key"):
        write_key()
    return open("key.key", "rb").read()

def encrypt_file(file_path):
    key = load_key()
    f = Fernet(key)
    
    with open(file_path, "rb") as file:
        file_data = file.read()
        
    encrypted_data = f.encrypt(file_data)
    
    encrypted_filename = f"{os.path.basename(file_path)}_encrypted.txt"
    encrypted_path = os.path.join(os.path.dirname(file_path), encrypted_filename)
    
    with open(encrypted_path, "wb") as file:
        file.write(encrypted_data)
        
    return encrypted_path

def decrypt_file(input_path):
    key = load_key()
    f = Fernet(key)
    
    with open(input_path, "rb") as file:
        encrypted_data = file.read()
        
    try:
        decrypted_data = f.decrypt(encrypted_data)
    except Exception as e:
        raise ValueError(f"Failed to decrypt the file: {e}")

    # Create a base name for the decrypted file
    # Input: test.pdf_encrypted.txt
    # Splitext: test.pdf_encrypted
    base_name = os.path.splitext(os.path.basename(input_path))[0]
    
    if base_name.endswith("_encrypted"):
        original_name = base_name.replace("_encrypted", "") # test.pdf
    else:
        original_name = base_name # Fallback

    # Save decrypted content with original extension
    decrypted_filename = f"decrypted_{original_name}"
    decrypted_path = os.path.join(os.path.dirname(input_path), decrypted_filename)
    
    with open(decrypted_path, "wb") as decrypted_file:
        decrypted_file.write(decrypted_data)
        
    return decrypted_path
