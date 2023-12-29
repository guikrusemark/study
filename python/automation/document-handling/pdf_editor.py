# Import the PyPDF2 library
import PyPDF2

# Open the PDF file
reader = PyPDF2.PdfReader("_Contrato Andreia Aparecida.pdf", "rb")

for page in reader.pages:
    print(page.extract_text())
