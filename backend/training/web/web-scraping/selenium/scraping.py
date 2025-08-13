from selenium import webdriver
from selenium.webdriver.common.by import By
import csv
import threading

# Start a webdriver instance
driver = webdriver.Chrome()

for i in range(1, 56):
    # Navigate to the website_name
    driver.get(f"https://www.vetsmart.com.br/cg/produto/lista/{i}")
    event = threading.Event()
    event.wait(1)

    # Find all elements with the class name "row-title"
    elements = driver.find_elements(By.CLASS_NAME, "row-title")

    # # Extract the text from each element and print it
    # for element in elements:
    #     print(element.text)

    # Write the titles to a CSV file
    with open("vetsmart_titles.csv", "a", newline="") as f:
        for title in elements:
            f.write("\n")
            f.write(" ".join([title.text]))
            print(title.text)

# Quit the webdriver
driver.quit()
