import random
import matplotlib.pyplot as plt


class Person:
    def __init__(self):
        self.money = 0
        self.employed = False


class Company:
    def __init__(self, productivity=2, wage=1, price=1):
        self.money = 100  # Initial capital
        self.wage = wage
        self.price = price
        self.productivity = productivity
        self.employees = []
        self.produced = 0
        self.profit = 0

    def hire_workers(self, people):
        available_people = [p for p in people if not p.employed]
        max_hires = min(len(available_people), self.money // self.wage)
        hired = random.sample(available_people, max_hires)
        for person in hired:
            person.employed = True
            person.money += self.wage
            self.money -= self.wage
        self.employees = hired

    def produce(self):
        self.produced = len(self.employees) * self.productivity

    def sell(self, people):
        # Simulate total demand (all individuals spend all money)
        total_spent = 0
        for person in people:
            can_buy = person.money // self.price
            if can_buy > 0:
                bought = min(can_buy, self.produced)
                self.produced -= bought
                revenue = bought * self.price
                self.money += revenue
                person.money -= revenue
                total_spent += revenue
        self.profit = self.money - (len(self.employees) * self.wage)


# Simulation Setup
num_people = 100
num_companies = 5
steps = 20

people = [Person() for _ in range(num_people)]
companies = [Company(productivity=2) for _ in range(num_companies)]

# Data Logging
employment_history = []
gdp_history = []

# Run Simulation
for step in range(steps):
    for company in companies:
        company.hire_workers(people)

    for company in companies:
        company.produce()

    for company in companies:
        company.sell(people)

    # Log metrics
    employed = sum(p.employed for p in people)
    employment_history.append(employed)
    gdp = sum(c.produced for c in companies)  # GDP = total production
    gdp_history.append(gdp)

    # Reset employment for next round
    for person in people:
        person.employed = False

# Visualization
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(employment_history, label="Employment")
plt.title("Employment Over Time")
plt.xlabel("Step")
plt.ylabel("Number Employed")

plt.subplot(1, 2, 2)
plt.plot(gdp_history, label="GDP", color="green")
plt.title("GDP Over Time")
plt.xlabel("Step")
plt.ylabel("Total Production")
plt.tight_layout()
plt.show()
plt.savefig("sim_qwen.png")
