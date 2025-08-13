import os
from unidecode import unidecode

def capitalize_first(string):
    words = string.split(" ")
    capitalized_words = [word.capitalize() for word in words]
    capitalized_string = " ".join(capitalized_words)
    return capitalized_string

def rename_files_and_directories(root_dir):
    """Renames all files and directories within a directory recursively,
       converting names to lowercase and replacing spaces with underscores.
    """

    for root, dirs, files in os.walk(root_dir, topdown=False):  # Bottom-up traversal
        for filename in files:
            old_path = os.path.join(root, filename)
            new_filename = capitalize_first(unidecode(filename).lstrip().lower().replace("_", " ").replace("  ", " ").replace("  ", " ")).replace("Eng ", "ENG ").replace(" .", ".")
            new_path = os.path.join(root, new_filename)
                
            try:
                os.rename(old_path, new_path)
            except:
                print(f"Failed to rename {old_path} to {new_path}")
                pass

        for dir_name in dirs:
            old_path = os.path.join(root, dir_name)
            new_dir_name = unidecode(dir_name.lower())
            new_path = os.path.join(root, new_dir_name)
            
            try:
                os.rename(old_path, new_path)
            except:
                print(f"Failed to rename {old_path} to {new_path}")
                pass

# Specify the directory you want to process
directory_to_rename = os.getcwd()  # Replace with the actual path
rename_files_and_directories(directory_to_rename)

# clean_sequence(directory_to_rename)

# trim_final(directory_to_rename)

print("Files and directories renamed successfully!")