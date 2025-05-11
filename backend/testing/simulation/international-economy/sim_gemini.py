# IMPORTANT: To run this code, you need to have the 'mesa' library installed.
# You can typically install it by running: pip install mesa

# Import necessary libraries from Mesa
from mesa import Agent, Model
from mesa.time import RandomActivation
from mesa.datacollection import DataCollector
import random

# --- Agent Definitions ---


class PersonAgent(Agent):
    """
    Represents an individual person in the economy.
    """

    def __init__(
        self, unique_id, model, initial_money=100, consumption_rate=0.7, productivity=1
    ):
        super().__init__(unique_id, model)
        self.money = initial_money
        self.consumption_rate = consumption_rate  # Propensity to consume
        self.is_employed = False
        self.employer_id = None
        self.wage = 0
        self.productivity = (
            productivity  # How much this person can produce per step if employed
        )

    def work(self):
        """If employed, contributes to production and earns a wage."""
        if self.is_employed and self.employer_id is not None:
            # In a more complex model, production would be handled by the company
            # For now, we'll just say the person receives a wage
            self.money += self.wage
            # print(f"Person {self.unique_id} worked and earned {self.wage}. New balance: {self.money}")

    def consume(self):
        """Consumes goods/services, spending a portion of their money."""
        if self.money > 0:
            amount_to_consume = (
                self.money * self.consumption_rate * random.uniform(0.5, 1.5)
            )  # Add some randomness
            amount_to_consume = min(
                self.money, amount_to_consume
            )  # Cannot spend more than they have

            # Find a company to buy from (simplistic: first available or random)
            # In a real model, this would be a market interaction
            available_companies = [
                a
                for a in self.model.schedule.agents
                if isinstance(a, CompanyAgent) and a.inventory > 0
            ]
            if available_companies:
                company_to_buy_from = random.choice(available_companies)
                # Assume 1 unit of good costs 1 unit of money for simplicity
                units_to_buy = int(amount_to_consume)
                actual_bought = min(units_to_buy, company_to_buy_from.inventory)

                if actual_bought > 0:
                    self.money -= actual_bought
                    company_to_buy_from.sell_goods(
                        actual_bought, actual_bought
                    )  # goods, price_per_good
                    # print(f"Person {self.unique_id} consumed {actual_bought} goods. New balance: {self.money}")

    def seek_employment(self):
        """Looks for a job if unemployed."""
        if not self.is_employed:
            # Ask companies if they are hiring
            for agent in self.model.schedule.agents:
                if isinstance(agent, CompanyAgent):
                    if agent.hire_employee(self):
                        # print(f"Person {self.unique_id} got hired by Company {agent.unique_id}")
                        break  # Stop looking once hired

    def pay_taxes(self, tax_rate):
        """Pays income tax to the state."""
        if self.wage > 0:  # Tax on income earned in this step (simplified)
            tax_amount = self.wage * tax_rate
            if self.money >= tax_amount:
                self.money -= tax_amount
                if (
                    self.model.state_agent
                ):  # Ensure state agent exists before calling its method
                    self.model.state_agent.collect_tax(tax_amount)
                # print(f"Person {self.unique_id} paid {tax_amount} in taxes.")
            else:
                # print(f"Person {self.unique_id} cannot afford to pay full taxes.")
                pass  # Handle insufficient funds if necessary

    def step(self):
        """Defines the agent's actions per simulation step."""
        # Order of actions can matter
        self.seek_employment()
        self.work()
        self.consume()
        if self.model.state_agent:  # Check if state agent exists
            self.pay_taxes(self.model.state_agent.income_tax_rate)


class CompanyAgent(Agent):
    """
    Represents a company that produces and sells goods, and employs people.
    """

    def __init__(
        self,
        unique_id,
        model,
        initial_capital=1000,
        hiring_capacity=5,
        production_cost_per_unit=0.5,
    ):
        super().__init__(unique_id, model)
        self.capital = initial_capital
        self.inventory = 0  # Goods produced but not yet sold
        self.employees = []  # List of employee PersonAgent objects
        self.hiring_capacity = hiring_capacity
        self.production_cost_per_unit = production_cost_per_unit
        self.profit = 0
        self.wage_per_employee = 20  # Fixed wage for simplicity

    def produce_goods(self):
        """Produces goods based on the number of employees and their productivity."""
        production_amount = 0
        for employee in self.employees:
            production_amount += (
                employee.productivity
            )  # Each employee produces 'productivity' units

        cost_of_production = production_amount * self.production_cost_per_unit
        if self.capital >= cost_of_production:
            self.capital -= cost_of_production
            self.inventory += production_amount
            # print(f"Company {self.unique_id} produced {production_amount} goods. Inventory: {self.inventory}, Capital: {self.capital}")
        else:
            # print(f"Company {self.unique_id} cannot afford to produce. Needs {cost_of_production}, has {self.capital}")
            pass  # Not enough capital to produce

    def pay_wages(self):
        """Pays wages to its employees."""
        total_wages_paid = 0
        for employee in self.employees:
            if self.capital >= self.wage_per_employee:
                self.capital -= self.wage_per_employee
                employee.wage = (
                    self.wage_per_employee
                )  # Set wage for person to "receive"
                total_wages_paid += self.wage_per_employee
            else:
                # print(f"Company {self.unique_id} cannot afford to pay full wages to {employee.unique_id}")
                employee.wage = 0  # Cannot pay
                # Potentially lay off employee or go bankrupt in a more complex model
        # print(f"Company {self.unique_id} paid {total_wages_paid} in total wages. Capital: {self.capital}")

    def hire_employee(self, person_agent):
        """Hires a person if capacity allows."""
        if len(self.employees) < self.hiring_capacity:
            self.employees.append(person_agent)
            person_agent.is_employed = True
            person_agent.employer_id = self.unique_id
            person_agent.wage = self.wage_per_employee  # Set initial wage expectation
            return True
        return False

    def sell_goods(self, quantity, price_per_unit):
        """Sells goods from inventory."""
        if self.inventory >= quantity:
            self.inventory -= quantity
            revenue = quantity * price_per_unit
            self.capital += revenue
            self.profit += revenue - (
                quantity * self.production_cost_per_unit
            )  # Simplified profit calculation
            # print(f"Company {self.unique_id} sold {quantity} goods. Inventory: {self.inventory}, Capital: {self.capital}")
            return True
        # print(f"Company {self.unique_id} does not have {quantity} goods to sell. Inventory: {self.inventory}")
        return False

    def pay_taxes(self, tax_rate):
        """Pays corporate tax to the state (e.g., on profits or revenue)."""
        # Simplified: tax on profits accumulated this step (or since last tax payment)
        # For this example, let's assume profit is reset each step after taxation.
        if self.profit > 0:
            tax_amount = self.profit * tax_rate
            if self.capital >= tax_amount:
                self.capital -= tax_amount
                if self.model.state_agent:  # Ensure state agent exists
                    self.model.state_agent.collect_tax(tax_amount)
                # print(f"Company {self.unique_id} paid {tax_amount} in corporate taxes on profit of {self.profit}.")
                self.profit = 0  # Reset profit after taxing
            else:
                # print(f"Company {self.unique_id} cannot afford to pay full corporate taxes.")
                pass

    def step(self):
        """Defines the company's actions per simulation step."""
        self.produce_goods()
        self.pay_wages()
        if self.model.state_agent:  # Check if state agent exists
            self.pay_taxes(self.model.state_agent.corporate_tax_rate)
        # Selling happens passively when Persons consume


class StateAgent(Agent):
    """
    Represents the government or state.
    Collects taxes, can distribute funds (e.g. social welfare, public goods - not implemented yet).
    """

    def __init__(
        self,
        unique_id,
        model,
        initial_treasury=10000,
        income_tax_rate=0.1,
        corporate_tax_rate=0.15,
    ):
        super().__init__(unique_id, model)
        self.treasury = initial_treasury
        self.income_tax_rate = income_tax_rate
        self.corporate_tax_rate = corporate_tax_rate

    def collect_tax(self, amount):
        """Collects tax revenue."""
        self.treasury += amount
        # print(f"State collected {amount} in taxes. Treasury: {self.treasury}")

    def spend_on_public_goods(self, amount):
        """Spends money on public goods (placeholder)."""
        if self.treasury >= amount:
            self.treasury -= amount
            # print(f"State spent {amount} on public goods. Treasury: {self.treasury}")
            # This could influence other agents' productivity or well-being in a more complex model
            return True
        return False

    def step(self):
        """Defines the state's actions per simulation step."""
        # For now, the state is mostly passive, collecting taxes initiated by others.
        # It could actively decide on spending or policy changes here.
        # Example: spend a fixed amount on public goods if treasury allows
        # self.spend_on_public_goods(self.treasury * 0.05) # Spend 5% of treasury
        pass


# --- Model Definition ---


class MacroModel(Model):
    """
    The main model that orchestrates the simulation.
    """

    def __init__(self, num_persons, num_companies, create_state=True):
        super().__init__()
        self.num_persons = num_persons
        self.num_companies = num_companies
        self.schedule = RandomActivation(
            self
        )  # Agents activate in random order each step
        self.running = True  # For server visualization

        # Create State Agent (only one)
        self.state_agent = None
        if create_state:
            self.state_agent = StateAgent("STATE_001", self)
            self.schedule.add(self.state_agent)

        # Create Person Agents
        for i in range(self.num_persons):
            # Give some variation in initial money and productivity
            initial_money = random.uniform(50, 150)
            productivity = random.uniform(0.8, 1.2)
            person = PersonAgent(
                f"PERSON_{i}", self, initial_money, productivity=productivity
            )
            self.schedule.add(person)

        # Create Company Agents
        for i in range(self.num_companies):
            initial_capital = random.uniform(800, 1200)
            hiring_capacity = random.randint(3, 10)
            company = CompanyAgent(
                f"COMPANY_{i}", self, initial_capital, hiring_capacity
            )
            self.schedule.add(company)

        # Data Collector: To track variables of interest
        self.datacollector = DataCollector(
            model_reporters={
                "TotalMoneyPersons": lambda m: sum(
                    a.money for a in m.schedule.agents if isinstance(a, PersonAgent)
                ),
                "TotalCapitalCompanies": lambda m: sum(
                    a.capital for a in m.schedule.agents if isinstance(a, CompanyAgent)
                ),
                "TotalInventory": lambda m: sum(
                    a.inventory
                    for a in m.schedule.agents
                    if isinstance(a, CompanyAgent)
                ),
                "UnemploymentRate": lambda m: sum(
                    1
                    for a in m.schedule.agents
                    if isinstance(a, PersonAgent) and not a.is_employed
                )
                / m.num_persons
                if m.num_persons > 0
                else 0,
                "StateTreasury": lambda m: m.state_agent.treasury
                if m.state_agent
                else 0,
            },
            agent_reporters={  # Agent-level data collection
                "Money": "money",
                "IsEmployed": "is_employed",
                "AgentType": lambda a: a.__class__.__name__,  # Record agent type
            },
        )

    def step(self):
        """Advances the model by one step."""
        self.datacollector.collect(self)  # Collect data at the beginning of the step
        self.schedule.step()
        # print(f"\n--- End of Step {self.schedule.steps} ---")
        # print(f"State Treasury: {self.state_agent.treasury if self.state_agent else 'N/A'}")
        # employed_count = sum(1 for a in self.schedule.agents if isinstance(a, PersonAgent) and a.is_employed)
        # print(f"Total Employed: {employed_count}/{self.num_persons}")


# --- Running the Simulation (Example) ---
if __name__ == "__main__":
    NUM_PERSONS = 50
    NUM_COMPANIES = 5
    SIMULATION_STEPS = 20

    print("Starting Macroeconomic Simulation...")
    # Ensure create_state is True if you expect state_agent to exist for tax collection
    model = MacroModel(NUM_PERSONS, NUM_COMPANIES, create_state=True)

    for i in range(SIMULATION_STEPS):
        print(f"\n--- Step {i + 1}/{SIMULATION_STEPS} ---")
        model.step()

        # Optional: Print some aggregated info each step
        total_money_persons = sum(
            a.money for a in model.schedule.agents if isinstance(a, PersonAgent)
        )
        total_capital_companies = sum(
            a.capital for a in model.schedule.agents if isinstance(a, CompanyAgent)
        )
        unemployed_count = sum(
            1
            for a in model.schedule.agents
            if isinstance(a, PersonAgent) and not a.is_employed
        )

        print(f"Persons' Total Money: {total_money_persons:.2f}")
        print(f"Companies' Total Capital: {total_capital_companies:.2f}")
        print(f"Unemployed Persons: {unemployed_count}/{NUM_PERSONS}")
        if (
            model.state_agent
        ):  # Check if state_agent exists before accessing its attributes
            print(f"State Treasury: {model.state_agent.treasury:.2f}")
        else:
            print("State Treasury: N/A (State agent not created)")

    print("\nSimulation Finished.")

    # Retrieve and print collected data
    model_data = model.datacollector.get_model_vars_dataframe()
    # agent_data = model.datacollector.get_agent_vars_dataframe() # Careful, can be very large

    print("\n--- Model Level Data ---")
    print(model_data.to_string())  # .to_string() helps print entire dataframe

    # print("\n--- Agent Level Data (Example) ---")
    # if agent_data is not None and not agent_data.empty:
    #     # Example: data for a specific agent or specific step
    #     # Filter for a specific agent type and ID if needed
    #     try:
    #         person_0_data = agent_data.xs("PERSON_0", level="AgentID")
    #         print("Data for PERSON_0 (last 5 steps):")
    #         print(person_0_data.tail().to_string())
    #     except KeyError:
    #         print("Agent PERSON_0 not found in agent_data or agent_data structure is unexpected.")
    # else:
    #     print("No agent-level data collected or an issue with collection.")

    # For more advanced analysis, you would typically save this data to a CSV or use plotting libraries.
    # Example (uncomment to use if matplotlib is installed):
    # import matplotlib.pyplot as plt
    # if not model_data.empty:
    #     model_data.plot(y=["TotalMoneyPersons", "TotalCapitalCompanies", "StateTreasury"])
    #     plt.title("Economic Indicators Over Time")
    #     plt.xlabel("Step")
    #     plt.ylabel("Value")
    #     plt.show()
    # else:
    #     print("No model data to plot.")
