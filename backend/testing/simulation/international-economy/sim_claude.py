"""
MacroEconomic Simulation Framework

This framework simulates interactions between different economic agents:
- States (governments)
- Companies (firms)
- Individuals (workers/consumers)

Resources are modeled, along with production, consumption, and policy effects.
"""

import matplotlib.pyplot as plt
from typing import List, Dict
from collections import defaultdict


class Resource:
    """Represents a resource in the economy (natural or produced)"""

    def __init__(
        self,
        name: str,
        renewable: bool = False,
        renewal_rate: float = 0.0,
        initial_amount: float = 1000.0,
        scarcity_factor: float = 1.0,
    ):
        self.name = name
        self.renewable = renewable
        self.renewal_rate = renewal_rate
        self.amount = initial_amount
        self.initial_amount = initial_amount
        self.scarcity_factor = scarcity_factor  # Affects price determination
        self.price = 1.0  # Starting normalized price

    def extract(self, amount: float) -> float:
        """Extract resource, returning actual amount extracted"""
        if amount > self.amount:
            extracted = self.amount
            self.amount = 0
            return extracted
        else:
            self.amount -= amount
            return amount

    def renew(self):
        """Renew resource if renewable"""
        if self.renewable:
            self.amount += self.initial_amount * self.renewal_rate

    def update_price(self, demand: float):
        """Update price based on scarcity and demand"""
        supply_ratio = self.amount / max(
            0.1, self.initial_amount
        )  # Avoid division by zero
        self.price = (
            self.scarcity_factor * (1 / max(0.1, supply_ratio)) * (1 + 0.1 * demand)
        )
        return self.price


class Market:
    """Central market where agents exchange resources"""

    def __init__(self):
        self.resources = {}  # name -> Resource
        self.supply = defaultdict(float)  # name -> amount
        self.demand = defaultdict(float)  # name -> amount
        self.transactions = []  # List of transactions
        self.price_history = defaultdict(list)  # Resource name -> list of prices

    def add_resource(self, resource: Resource):
        """Add a resource to the market"""
        self.resources[resource.name] = resource

    def place_sell_order(
        self, agent_id: str, resource_name: str, amount: float, min_price: float
    ):
        """Agent offers to sell a resource"""
        if resource_name in self.resources:
            self.supply[resource_name] += amount
            # Track the order details for later matching
            return True
        return False

    def place_buy_order(
        self, agent_id: str, resource_name: str, amount: float, max_price: float
    ):
        """Agent offers to buy a resource"""
        if resource_name in self.resources:
            self.demand[resource_name] += amount
            # Track the order details for later matching
            return True
        return False

    def clear_market(self):
        """Match buy and sell orders, update prices"""
        for resource_name, resource in self.resources.items():
            # Update price based on supply and demand
            price = resource.update_price(self.demand[resource_name])
            self.price_history[resource_name].append(price)

            # Record the price for this round
            print(
                f"Resource {resource_name}: Price = {price:.2f}, Supply = {self.supply[resource_name]:.2f}, Demand = {self.demand[resource_name]:.2f}"
            )

            # Reset for next round
            self.supply[resource_name] = 0
            self.demand[resource_name] = 0

            # Natural resources renew
            resource.renew()


class ProductionRecipe:
    """Defines how resources are combined to produce new resources"""

    def __init__(
        self,
        name: str,
        inputs: Dict[str, float],
        outputs: Dict[str, float],
        efficiency: float = 1.0,
        labor_required: float = 1.0,
    ):
        self.name = name
        self.inputs = inputs  # Resource name -> amount needed
        self.outputs = outputs  # Resource name -> amount produced
        self.efficiency = efficiency  # Multiplier for output
        self.labor_required = labor_required  # Amount of labor needed

    def calculate_profit(self, market: Market, labor_cost: float = 1.0) -> float:
        """Calculate expected profit given current market prices"""
        cost = labor_cost * self.labor_required
        for resource_name, amount in self.inputs.items():
            if resource_name in market.resources:
                cost += amount * market.resources[resource_name].price

        revenue = 0
        for resource_name, amount in self.outputs.items():
            if resource_name in market.resources:
                revenue += (
                    amount * self.efficiency * market.resources[resource_name].price
                )

        return revenue - cost


class Agent:
    """Base class for all economic agents"""

    def __init__(self, agent_id: str):
        self.id = agent_id
        self.inventory = defaultdict(float)  # Resource name -> amount
        self.money = 100.0  # Starting capital
        self.history = {"money": [self.money], "inventory": []}

    def add_to_inventory(self, resource_name: str, amount: float):
        """Add resource to inventory"""
        self.inventory[resource_name] += amount

    def remove_from_inventory(self, resource_name: str, amount: float) -> float:
        """Remove resource from inventory, return actual amount removed"""
        if amount > self.inventory[resource_name]:
            removed = self.inventory[resource_name]
            self.inventory[resource_name] = 0
            return removed
        else:
            self.inventory[resource_name] -= amount
            return amount

    def update_history(self):
        """Record the current state to history"""
        self.history["money"].append(self.money)
        self.history["inventory"].append(self.inventory.copy())

    def step(self, world):
        """Take actions for this time step - to be implemented by subclasses"""
        raise NotImplementedError

    def pay(self, amount: float) -> bool:
        """Pay money if possible, return success"""
        if amount <= self.money:
            self.money -= amount
            return True
        return False

    def receive(self, amount: float):
        """Receive money"""
        self.money += amount


class Individual(Agent):
    """Represents a person who works and consumes"""

    def __init__(
        self,
        agent_id: str,
        labor_capacity: float = 1.0,
        consumption_needs: Dict[str, float] = None,
    ):
        super().__init__(agent_id)
        self.labor_capacity = labor_capacity
        self.labor_used = 0.0
        self.consumption_needs = consumption_needs or {"food": 1.0, "shelter": 0.5}
        self.employer = None
        self.happiness = 1.0
        self.history["happiness"] = [self.happiness]
        self.history["labor_used"] = [self.labor_used]

    def work_for(self, company, amount: float) -> float:
        """Provide labor to a company, return actual amount provided"""
        available = self.labor_capacity - self.labor_used
        work_amount = min(available, amount)
        if work_amount > 0:
            self.labor_used += work_amount
            self.employer = company
            return work_amount
        return 0

    def consume(self, market: Market):
        """Consume resources based on needs"""
        happiness_factor = 1.0

        for resource_name, amount_needed in self.consumption_needs.items():
            # Try to buy from market if we don't have enough
            if self.inventory[resource_name] < amount_needed:
                to_buy = amount_needed - self.inventory[resource_name]
                if resource_name in market.resources:
                    price = market.resources[resource_name].price
                    affordable = min(to_buy, self.money / price)
                    if affordable > 0:
                        market.place_buy_order(
                            self.id, resource_name, affordable, price
                        )
                        cost = affordable * price
                        self.pay(cost)
                        self.add_to_inventory(resource_name, affordable)

            # Consume what we have
            consumed = self.remove_from_inventory(resource_name, amount_needed)
            fulfillment_ratio = consumed / amount_needed
            happiness_factor *= (
                0.5 + 0.5 * fulfillment_ratio
            )  # Partial fulfillment gives partial happiness

        self.happiness = happiness_factor
        return happiness_factor

    def reset_labor(self):
        """Reset labor capacity for next cycle"""
        self.labor_used = 0
        self.employer = None

    def step(self, world):
        """Individual behavior: seek employment, consume resources"""
        self.reset_labor()

        # Seek employment with the highest paying company
        companies = [agent for agent in world.agents if isinstance(agent, Company)]
        if companies:
            companies.sort(key=lambda c: c.wage, reverse=True)
            for company in companies:
                if company.hire(self, self.labor_capacity):
                    break

        # Consume resources
        self.consume(world.market)

        # Update history
        self.history["happiness"].append(self.happiness)
        self.history["labor_used"].append(self.labor_used)
        self.update_history()


class Company(Agent):
    """Represents a business that produces goods using labor and resources"""

    def __init__(self, agent_id: str, recipes: List[ProductionRecipe] = None):
        super().__init__(agent_id)
        self.recipes = recipes or []
        self.employees = {}  # Individual -> labor amount
        self.wage = 10.0  # Base wage offered
        self.labor_available = 0.0
        self.profit_margin = 0.2  # Target profit margin
        self.history["profit"] = [0.0]
        self.history["production"] = []
        self.history["employees_count"] = [0]

    def hire(self, individual: Individual, amount: float) -> bool:
        """Hire an individual for labor"""
        if self.money < self.wage * amount:
            return False  # Not enough money to pay

        labor = individual.work_for(self, amount)
        if labor > 0:
            self.employees[individual] = labor
            self.labor_available += labor
            return True
        return False

    def pay_employees(self):
        """Pay all employees their wages"""
        total_paid = 0
        for individual, labor in self.employees.items():
            payment = self.wage * labor
            if self.pay(payment):
                individual.receive(payment)
                total_paid += payment
        return total_paid

    def produce(self, market: Market):
        """Produce goods based on recipes and available resources/labor"""
        production_results = {}

        # Find the most profitable recipe
        best_recipe = None
        best_profit = float("-inf")

        for recipe in self.recipes:
            profit = recipe.calculate_profit(market, self.wage)
            if profit > best_profit:
                best_recipe = recipe
                best_profit = profit

        if (
            best_recipe
            and best_profit > 0
            and self.labor_available >= best_recipe.labor_required
        ):
            # Check if we have necessary input resources
            can_produce = True
            for resource_name, amount_needed in best_recipe.inputs.items():
                if self.inventory[resource_name] < amount_needed:
                    # Try to buy from market
                    to_buy = amount_needed - self.inventory[resource_name]
                    if resource_name in market.resources:
                        price = market.resources[resource_name].price
                        affordable = min(to_buy, self.money / price)
                        if affordable < to_buy:
                            can_produce = False  # Can't afford all needed resources
                            break

                        market.place_buy_order(
                            self.id, resource_name, affordable, price
                        )
                        cost = affordable * price
                        self.pay(cost)
                        self.add_to_inventory(resource_name, affordable)

            if can_produce:
                # Consume inputs
                for resource_name, amount in best_recipe.inputs.items():
                    self.remove_from_inventory(resource_name, amount)

                # Generate outputs
                for resource_name, amount in best_recipe.outputs.items():
                    output_amount = amount * best_recipe.efficiency
                    self.add_to_inventory(resource_name, output_amount)
                    production_results[resource_name] = output_amount

                # Use labor
                self.labor_available -= best_recipe.labor_required

        # Sell products to market
        for resource_name, amount in self.inventory.items():
            if resource_name in market.resources:
                price = market.resources[resource_name].price
                # Keep some inventory for future production
                amount_to_sell = amount * 0.8
                if amount_to_sell > 0:
                    market.place_sell_order(
                        self.id, resource_name, amount_to_sell, price * 0.9
                    )
                    self.remove_from_inventory(resource_name, amount_to_sell)
                    self.receive(amount_to_sell * price)

        return production_results

    def adjust_wages(self, market_unemployment_rate: float):
        """Adjust wages based on market conditions"""
        if market_unemployment_rate < 0.05:  # Labor shortage
            self.wage *= 1.05
        elif market_unemployment_rate > 0.2:  # High unemployment
            self.wage *= 0.95

    def step(self, world):
        """Company behavior: hire workers, produce goods, sell to market"""
        # Reset for new cycle
        self.employees = {}
        self.labor_available = 0.0

        # Produce using available resources and sell products
        production = self.produce(world.market)

        # Calculate profit for this cycle
        current_profit = self.money - self.history["money"][-1]

        # Update history
        self.history["profit"].append(current_profit)
        self.history["production"].append(production)
        self.history["employees_count"].append(len(self.employees))
        self.update_history()


class State(Agent):
    """Represents a government that taxes and provides services"""

    def __init__(
        self,
        agent_id: str,
        tax_rate: float = 0.1,
        service_allocation: Dict[str, float] = None,
    ):
        super().__init__(agent_id)
        self.tax_rate = tax_rate  # Flat tax rate on income
        self.service_allocation = service_allocation or {
            "infrastructure": 0.4,
            "education": 0.3,
            "healthcare": 0.3,
        }
        self.public_goods = defaultdict(float)  # Service -> quality level
        self.tax_collected = 0.0
        self.history["tax_collected"] = [0.0]
        self.history["public_goods"] = []

    def collect_taxes(self, agents: List[Agent]) -> float:
        """Collect taxes from all agents based on their income change"""
        total_collected = 0

        for agent in agents:
            if isinstance(agent, State):
                continue  # Don't tax other states

            # Calculate income (money change since last step)
            if len(agent.history["money"]) >= 2:
                previous_money = agent.history["money"][-2]
                current_money = agent.history["money"][-1]
                income = max(0, current_money - previous_money)

                # Apply tax
                tax_amount = income * self.tax_rate
                if tax_amount > 0 and agent.pay(tax_amount):
                    self.receive(tax_amount)
                    total_collected += tax_amount

        self.tax_collected = total_collected
        return total_collected

    def provide_services(self):
        """Convert money into public goods/services"""
        total_spent = 0

        for service, allocation in self.service_allocation.items():
            budget = self.money * allocation
            self.public_goods[service] += budget * 0.1  # Conversion factor
            total_spent += budget

        if self.pay(total_spent):
            return self.public_goods
        return {}

    def apply_policies(self, world):
        """Apply economic policies to influence the economy"""
        # Example: Stimulus during recession
        unemployment_rate = self.calculate_unemployment(world.agents)
        if unemployment_rate > 0.2:  # High unemployment
            # Provide stimulus to individuals
            individuals = [
                agent for agent in world.agents if isinstance(agent, Individual)
            ]
            stimulus_per_person = min(10.0, self.money / max(1, len(individuals)))

            for individual in individuals:
                if self.pay(stimulus_per_person):
                    individual.receive(stimulus_per_person)

    def calculate_unemployment(self, agents: List[Agent]) -> float:
        """Calculate the unemployment rate"""
        individuals = [agent for agent in agents if isinstance(agent, Individual)]
        if not individuals:
            return 0.0

        unemployed = sum(1 for ind in individuals if ind.labor_used == 0)
        return unemployed / len(individuals)

    def step(self, world):
        """State behavior: collect taxes, provide services, implement policies"""
        # Collect taxes
        self.collect_taxes(world.agents)

        # Provide public services
        self.provide_services()

        # Apply economic policies
        self.apply_policies(world)

        # Update history
        self.history["tax_collected"].append(self.tax_collected)
        self.history["public_goods"].append(dict(self.public_goods))
        self.update_history()


class World:
    """Simulation world containing all agents, resources, and markets"""

    def __init__(self):
        self.agents = []
        self.market = Market()
        self.time = 0
        self.history = {
            "gdp": [],
            "unemployment": [],
            "inequality": [],
            "resource_depletion": [],
        }

    def add_agent(self, agent: Agent):
        """Add an agent to the world"""
        self.agents.append(agent)

    def add_resource(self, resource: Resource):
        """Add a resource to the world market"""
        self.market.add_resource(resource)

    def step(self):
        """Advance the simulation one time step"""
        print(f"\n--- Time Step {self.time} ---")

        # Each agent takes actions
        for agent in self.agents:
            agent.step(self)

        # Market processes all buy/sell orders
        self.market.clear_market()

        # Pay workers
        companies = [agent for agent in self.agents if isinstance(agent, Company)]
        for company in companies:
            company.pay_employees()

        # Calculate statistics
        self.calculate_statistics()

        self.time += 1

    def calculate_statistics(self):
        """Calculate economic statistics for this time step"""
        # GDP - sum of all production
        companies = [agent for agent in self.agents if isinstance(agent, Company)]
        gdp = sum(company.history["profit"][-1] for company in companies)

        # Unemployment rate
        individuals = [agent for agent in self.agents if isinstance(agent, Individual)]
        unemployed = sum(1 for ind in individuals if ind.labor_used == 0)
        unemployment_rate = unemployed / max(1, len(individuals))

        # Inequality - Gini coefficient based on money
        money_values = [agent.money for agent in self.agents]
        money_values.sort()
        n = len(money_values)
        if n > 0 and sum(money_values) > 0:
            cumulative = [sum(money_values[: i + 1]) for i in range(n)]
            cumulative_share = [c / cumulative[-1] for c in cumulative]
            gini = 1 - sum(
                (cumulative_share[i - 1] + cumulative_share[i]) / n for i in range(1, n)
            )
        else:
            gini = 0

        # Resource depletion
        resource_levels = {
            name: resource.amount / resource.initial_amount
            for name, resource in self.market.resources.items()
        }

        # Store statistics
        self.history["gdp"].append(gdp)
        self.history["unemployment"].append(unemployment_rate)
        self.history["inequality"].append(gini)
        self.history["resource_depletion"].append(resource_levels)

        print(
            f"GDP: {gdp:.2f}, Unemployment: {unemployment_rate:.2%}, Inequality: {gini:.2f}"
        )
        print(f"Resource Levels: {resource_levels}")

    def run_simulation(self, steps: int = 50):
        """Run the simulation for a specified number of steps"""
        for _ in range(steps):
            self.step()

        self.visualize_results()

    def visualize_results(self):
        """Create visualizations of simulation results"""
        plt.figure(figsize=(15, 15))

        # Plot GDP
        plt.subplot(3, 2, 1)
        plt.plot(self.history["gdp"])
        plt.title("GDP Over Time")
        plt.xlabel("Time Step")
        plt.ylabel("GDP")

        # Plot Unemployment
        plt.subplot(3, 2, 2)
        plt.plot(self.history["unemployment"])
        plt.title("Unemployment Rate")
        plt.xlabel("Time Step")
        plt.ylabel("Rate")

        # Plot Inequality
        plt.subplot(3, 2, 3)
        plt.plot(self.history["inequality"])
        plt.title("Inequality (Gini Coefficient)")
        plt.xlabel("Time Step")
        plt.ylabel("Gini")

        # Plot Resource Depletion
        plt.subplot(3, 2, 4)
        for resource_name in self.market.resources:
            values = [
                step.get(resource_name, 0)
                for step in self.history["resource_depletion"]
            ]
            plt.plot(values, label=resource_name)
        plt.title("Resource Levels")
        plt.xlabel("Time Step")
        plt.ylabel("Level (% of initial)")
        plt.legend()

        # Plot Prices
        plt.subplot(3, 2, 5)
        for resource_name, prices in self.market.price_history.items():
            plt.plot(prices, label=resource_name)
        plt.title("Resource Prices")
        plt.xlabel("Time Step")
        plt.ylabel("Price")
        plt.legend()

        # Plot Individual Happiness
        plt.subplot(3, 2, 6)
        individuals = [agent for agent in self.agents if isinstance(agent, Individual)]
        for individual in individuals[:5]:  # Show first 5 individuals
            plt.plot(
                individual.history["happiness"], label=f"Individual {individual.id}"
            )
        plt.title("Individual Happiness")
        plt.xlabel("Time Step")
        plt.ylabel("Happiness")
        plt.legend()

        plt.tight_layout()
        # plt.show()
        plt.savefig("sim_claude.png")


def create_sample_world():
    """Create a sample world with some agents and resources"""
    world = World()

    # Add resources
    resources = [
        Resource("food", renewable=True, renewal_rate=0.2, initial_amount=5000),
        Resource("metal", renewable=False, initial_amount=2000, scarcity_factor=2.0),
        Resource("energy", renewable=True, renewal_rate=0.3, initial_amount=3000),
        Resource("consumer_goods", renewable=False, initial_amount=100),
        Resource("labor", renewable=True, renewal_rate=1.0, initial_amount=1000),
    ]

    for resource in resources:
        world.add_resource(resource)

    # Add recipes
    food_production = ProductionRecipe(
        name="Food Production",
        inputs={"energy": 1.0, "labor": 2.0},
        outputs={"food": 5.0},
        efficiency=1.0,
        labor_required=2.0,
    )

    manufacturing = ProductionRecipe(
        name="Manufacturing",
        inputs={"metal": 2.0, "energy": 3.0, "labor": 5.0},
        outputs={"consumer_goods": 10.0},
        efficiency=1.0,
        labor_required=5.0,
    )

    # Add state
    government = State("gov1", tax_rate=0.15)
    world.add_agent(government)

    # Add companies
    farm = Company("farm1", recipes=[food_production])
    factory = Company("factory1", recipes=[manufacturing])
    world.add_agent(farm)
    world.add_agent(factory)

    # Give companies starting resources
    farm.add_to_inventory("energy", 50)
    factory.add_to_inventory("metal", 100)
    factory.add_to_inventory("energy", 100)

    # Add individuals with different consumption needs
    for i in range(20):
        if i < 10:
            # Basic needs
            individual = Individual(
                f"person{i}",
                labor_capacity=1.0,
                consumption_needs={"food": 1.0, "consumer_goods": 0.5},
            )
        else:
            # Luxury-oriented
            individual = Individual(
                f"person{i}",
                labor_capacity=1.2,
                consumption_needs={"food": 1.0, "consumer_goods": 1.5},
            )
        world.add_agent(individual)

    return world


def sample_run():
    """Run a sample simulation"""
    world = create_sample_world()
    world.run_simulation(steps=50)

    # Return world for further analysis
    return world


if __name__ == "__main__":
    # Run a sample simulation
    simulation = sample_run()
