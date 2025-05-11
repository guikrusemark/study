import random


# Define agent classes
class StateAgent:
    def __init__(self, tax_rate=0.2, public_service_budget=1000):
        self.tax_rate = tax_rate
        self.public_service_budget = public_service_budget
        self.tax_revenue = 0

    def collect_taxes(self, companies, people):
        self.tax_revenue = 0
        for company in companies:
            self.tax_revenue += company.profit * self.tax_rate
        for person in people:
            self.tax_revenue += person.income * self.tax_rate
        self.public_service_budget += self.tax_revenue

    def provide_services(self):
        # Simulate providing education/healthcare, increasing worker productivity
        return self.public_service_budget * 0.1  # 10% of budget improves resources


class CompanyAgent:
    def __init__(self, capital=1000, productivity=1.0):
        self.capital = capital
        self.productivity = productivity
        self.labor = 0
        self.profit = 0
        self.resource_usage = 0

    def hire_labor(self, people):
        self.labor = sum(1 for p in people if p.is_employed(self))
        self.resource_usage = self.labor * 10  # Natural resources used per worker

    def produce(self, social_resources):
        # Production depends on labor, capital, and social resources (e.g., education)
        output = (
            self.productivity
            * self.labor
            * self.capital
            * (1 + social_resources / 1000)
        )
        self.profit = output - (self.labor * 50)  # Pay $50 per worker
        return output


class PersonAgent:
    def __init__(self, skill_level=1.0, savings=100):
        self.skill_level = skill_level
        self.savings = savings
        self.income = 0
        self.employer = None

    def is_employed(self, company):
        if self.employer is None and random.random() < 0.8:  # 80% employment chance
            self.employer = company
        return self.employer == company

    def earn_income(self):
        if self.employer:
            self.income = 50 * self.skill_level  # Base wage adjusted by skill
            self.savings += self.income

    def consume(self, goods_produced):
        consumption = min(self.savings, goods_produced * 0.1)  # Consume 10% of goods
        self.savings -= consumption
        return consumption


# Simulation function
def run_simulation(steps=10):
    # Initialize agents
    state = StateAgent(tax_rate=0.25)
    companies = [CompanyAgent(capital=random.randint(500, 1500)) for _ in range(5)]
    people = [PersonAgent(skill_level=random.uniform(0.5, 1.5)) for _ in range(50)]

    # Track metrics
    history = {"production": [], "resource_usage": [], "tax_revenue": []}

    for step in range(steps):
        # State collects taxes and provides services
        state.collect_taxes(companies, people)
        social_resources = state.provide_services()

        # Companies hire labor and produce goods
        total_production = 0
        total_resource_usage = 0
        for company in companies:
            company.hire_labor(people)
            total_production += company.produce(social_resources)
            total_resource_usage += company.resource_usage

        # People earn income and consume
        for person in people:
            person.earn_income()
            total_production -= person.consume(total_production)

        # Record metrics
        history["production"].append(total_production)
        history["resource_usage"].append(total_resource_usage)
        history["tax_revenue"].append(state.tax_revenue)

        print(
            f"Step {step + 1}: Production = {total_production:.2f}, "
            f"Resource Usage = {total_resource_usage:.2f}, Tax Revenue = {state.tax_revenue:.2f}"
        )

    return history


# Run the simulation
if __name__ == "__main__":
    results = run_simulation(steps=10)
