
class Country():
    def __init__(self, name: str, population: int, area: int, gdp: float, national_debt: float):
        self._name = name
        self._population = population
        self._area = area
        self._gdp = gdp
        self._national_debt = national_debt
        
    def get_name(self):
        return self._name
    
    def add_reserve(self, amount: float):
        self._national_debt -= amount
        
    def pay_liabilities(self, amount: float):
        pass
    
    def debt_over_gdp(self):
        return self._national_debt / self._gdp
    
    def lend_for(self, borrower: Country, amount: float):
        
        
    def __str__(self):
        return f'{self._name} - Debt of {(self.debt_over_gdp() * 100):.2f}%'
        
        