import requests
from bs4 import BeautifulSoup
from xhtml2pdf import pisa 

# Make a request to the website
r = requests.get("https://stackoverflow.com/questions/76743643/multiple-middleware-in-nextjs-13-app-directory-not-working")
r.content

# Use the 'html.parser' to parse the page
soup = BeautifulSoup(r.content, 'html.parser')

# Use prettify() to view a nicely formatted version of the string
# with open("output.html", "w") as file:
#     file.write(str(soup.prettify()))

# print(soup.prettify())

# Define your data
source_html = str(soup.prettify())
output_filename = "test.pdf"

# Utility function
def convert_html_to_pdf(source_html, output_filename):
    # open output file for writing (truncated binary)
    result_file = open(output_filename, "w+b")

    # convert HTML to PDF
    pisa_status = pisa.CreatePDF(
            source_html,                # the HTML to convert
            dest=result_file)           # file handle to recieve result

    # close output file
    result_file.close()                 # close output file

    # return False on success and True on errors
    return pisa_status.err

# Main program
if __name__ == "__main__":
    pisa.showLogging()
    convert_html_to_pdf(source_html, output_filename)