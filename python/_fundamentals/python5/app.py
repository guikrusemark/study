from url_manip.url import Url

url: Url = Url("https://www.youtube.com/watch?v=30LWjhZzg50&ab_channel=freeCodeCamp.org")

print(url.get_domain())
print(url.get_params_dict())

print(len(url))
