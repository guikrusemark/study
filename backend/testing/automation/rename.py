import os
from unidecode import unidecode

file_names = []
new_names = []

# Load all .pdf files in the current directory cutting off the extension name part
def load_all_files(ext: str):
    for file in os.listdir():
        if file.endswith(f'.{ext}'):
            file_names.append(file.split('.')[0])
            
# Load a list of changed names to 'Name_name-RG_number'
def load_new_names():
    for file in file_names:
        
        new_name = file.lower()
        
        if new_name.startswith('_'):
            new_name = new_name[1:]
        
        # new_name = new_name.replace('contrato', 'contrato_')
        # new_name = new_name.replace('termo', 'termo_')
        # new_name = new_name.replace('adendo', 'adendo_')
        # new_name = new_name.replace('aditivo', 'aditivo_')
        # new_name = new_name.replace('compra', 'compra_')
        # new_name = new_name.replace('venda', 'venda_')
        
        # new_name = new_name.replace('(', ' ')
        # new_name = new_name.replace(')', ' ')
        # new_name = new_name.replace('-', ' ')
        # new_name = new_name.replace('__', ' ')
        # new_name = new_name.replace('_', ' ')
        
        new_name = new_name.replace(' ', '_')
        new_name = new_name.replace('-', '_')
        new_name = new_name.replace('__', '_')
        new_name = new_name.replace('(', '_')
        new_name = new_name.replace(')', '_')
        
        new_names.append(f'{unidecode(new_name)}')
        
# Rename all files in the current directory
def rename_all_files(ext: str):
    directory = os.getcwd()
    for idx, file in enumerate(file_names):
        old_file_pathname = os.path.join(directory, file + f'.{ext}')
        new_file_pathname = os.path.join(directory, new_names[idx] + f'.{ext.lower()}')
        try:
            os.rename(old_file_pathname, new_file_pathname)
        except FileExistsError:
            print(f'File {new_file_pathname} already exists.')
    file_names.clear()
    new_names.clear()
    

if __name__ == '__main__':
    exts = ['mwb', 'bak', 'sql', 'mwb.bak', 'docx', 'doc', 'pdf', 'jpeg', 'PDF', 'ai', 'jpg', 'png', 'JPG', 'JPEG', 'eps', 'svg', 'SVG', 'xlsx', 'xls', 'pptx', 'ppt', 'PPT', 'PPTX', 'csv', 'CSV', 'txt', 'TXT', 'mp4', 'MP4', 'mov', 'MOV', 'mp3', 'MP3', 'wav', 'WAV', 'zip', 'ZIP', 'rar', 'RAR', '7z', '7Z', 'psd', 'PSD', 'indd', 'INDD', 'ai', 'AI', 'tiff', 'TIFF', 'tif', 'TIF', 'gif', 'GIF', 'bmp', 'BMP', 'ico', 'ICO', 'webp', 'WEBP', 'heic', 'HEIC', 'heif', 'HEIF', 'jfif', 'JFIF', 'jfif-tbnl', 'JFIF-TBNL', 'jpe', 'JPE', 'jif', 'JIF', 'jfi', 'JFI', 'jfif-heic', 'JF']
    
    for ext in exts:
        load_all_files(ext)
        load_new_names()
        rename_all_files(ext)