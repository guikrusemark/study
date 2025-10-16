from weasyprint import HTML
import os

# htmldoc = HTML(string=str(soup.prettify()), base_url="")
HTML('https://doc.courtbouillon.org/weasyprint/stable/first_steps.html').write_pdf(os.getcwd() + '/output.pdf')