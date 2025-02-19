import os
from unidecode import unidecode

def rename_files_and_directories(root_dir):
    """Renames all files and directories within a directory recursively,
       converting names to lowercase and replacing spaces with underscores.
    """

    for root, dirs, files in os.walk(root_dir, topdown=False):  # Bottom-up traversal
        for filename in files:
            old_path = os.path.join(root, filename)
            new_filename = unidecode(filename.lower().replace(" ", "_").replace("(", "_").replace(")", "_").replace("__", "_").replace("_-_", "-").replace("_1.", ".").rstrip("_1"))
            new_path = os.path.join(root, new_filename)
            # counter = 1
            # while os.path.exists(new_path):
            #     new_filename = f"{new_filename}_{counter}"
            #     new_path = os.path.join(root, new_filename)
            #     counter += 1
            if old_path != new_path:
                try:
                    os.rename(old_path, new_path)
                except:
                    print(f"Failed to rename {old_path} to {new_path}")
                    pass

        for dir_name in dirs:
            old_path = os.path.join(root, dir_name)
            new_dir_name = unidecode(dir_name.lower().replace(" ", "_").replace("(", "_").replace(")", "_").replace("__", "_").replace("_-_", "-"))
            new_path = os.path.join(root, new_dir_name)
            if old_path != new_path:
                os.rename(old_path, new_path)

def trim_final(root_dir):
    for root, dirs, files in os.walk(root_dir, topdown=False):  # Bottom-up traversal
        for filename in files:
            old_path = os.path.join(root, filename)
            new_filename = filename.rstrip("_1_1_1_1")
            new_path = os.path.join(root, new_filename)
            if old_path != new_path:
                os.rename(old_path, new_path)

        for dir_name in dirs:
            old_path = os.path.join(root, dir_name)
            new_dir_name = dir_name.rstrip("_1_1_1_1")
            new_path = os.path.join(root, new_dir_name)
            if old_path != new_path:
                os.rename(old_path, new_path)
                
def clean_sequence(root_dir):
    for root, dirs, files in os.walk(root_dir, topdown=False):  # Bottom-up traversal
        for filename in files:
            old_path = os.path.join(root, filename)
            new_filename = filename.rstrip("_1")
            new_path = os.path.join(root, new_filename)
            if old_path != new_path:
                os.rename(old_path, new_path)

        for dir_name in dirs:
            old_path = os.path.join(root, dir_name)
            new_dir_name = dir_name.rstrip("_1")
            new_path = os.path.join(root, new_dir_name)
            if old_path != new_path:
                os.rename(old_path, new_path)

# Specify the directory you want to process
directory_to_rename = os.getcwd()  # Replace with the actual path
rename_files_and_directories(directory_to_rename)

# clean_sequence(directory_to_rename)

# trim_final(directory_to_rename)

print("Files and directories renamed successfully!")