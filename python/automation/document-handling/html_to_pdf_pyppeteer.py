import asyncio
from pyppeteer import launch
import os

async def generate_pdf(url, pdf_path):
    browser = await launch()
    page = await browser.newPage()
    
    await page.goto(url)
    
    await page.pdf({'path': pdf_path, 'format': 'A4'})
    
    await browser.close()

# Run the function
asyncio.get_event_loop().run_until_complete(generate_pdf('https://stackoverflow.com/questions/76743643/multiple-middleware-in-nextjs-13-app-directory-not-working', os.getcwd() + '/output.pdf'))