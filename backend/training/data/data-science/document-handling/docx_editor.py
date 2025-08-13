# Import the python-docx library
import docx

# Open the .docx file
doc: any = docx.Document("_Contrato Andreia Aparecida.docx")

with open("document.html", "w") as html_file:
    # Write the HTML header
    html_file.write('<!DOCTYPE html>\n'
                    '<html lang="pt-br">\n'
                    '\t<head>\n'
                    '\t\t<meta charset="UTF-8">\n'
                    '\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n'
                    '\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
                    '\t\t<title>CONTRATO</title>\n'
                    '\t\t<link rel="stylesheet" href="./styles/style.css">\n'
                    '\t</head>\n'
                    '\t<body>\n')

    # Iterate over each paragraph in the document
    for paragraph in doc.paragraphs:
        if paragraph.text == "":
            # Skip empty paragraphs
            continue
        # Write the text of the paragraph as an HTML paragraph
        html_file.write(f"\t\t<p>{paragraph.text}</p>\n")

    # Write the HTML footer
    html_file.write("\t</body>\n</html>")

# Save the changes to the .docx file
doc.save("_Contrato Andreia Aparecida.docx")