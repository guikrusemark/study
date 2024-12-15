from selenium.webdriver import Chrome

url = 'https://curso-python-selenium.netlify.app/exercicio_01.html'

browser = Chrome()
browser.get(url)

browser.find_element_by_tag_name('a').click()