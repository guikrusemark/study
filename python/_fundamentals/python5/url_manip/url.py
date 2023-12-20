from typing import List, Dict, Pattern, AnyStr
import re


class Url(str):
    def __init__(self, url_name: str):
        self._url_name: str = url_name.replace(" ", "").strip()
        self._pattern: Pattern[AnyStr] = re.compile(r"(http(s)?://)?(www.)?[a-z0-9]+.com")
        if not self._pattern.match(self._url_name):
            raise Exception("Invalid URL")

    @property
    def url_name(self) -> str:
        return self._url_name

    @url_name.setter
    def url_name(self, url_name: str) -> None:
        self._url_name: str = url_name

    def get_domain(self) -> str:
        return self._url_name.split("?")[0]

    def get_params(self) -> str:
        if "?" in self._url_name:
            return self._url_name.split("?")[1]
        return ""

    def get_params_dict(self) -> Dict[str, str]:
        if "?" not in self._url_name:
            return {}
        params: str = self.get_params()
        params_list: List[str] = params.split("&")
        params_dict: Dict[str, str] = {}
        for param in params_list:
            params_dict[param.split("=")[0]] = param.split("=")[1]
        return params_dict
