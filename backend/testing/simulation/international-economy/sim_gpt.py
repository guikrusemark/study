from __future__ import annotations
from mesa import Agent, Model
from mesa.time import RandomActivation
from mesa.datacollection import DataCollector
from pydantic.dataclasses import dataclass
import numpy as np


@dataclass
class MacroParams:
    income_tax: float = 0.25
    subsidy_rate: float = 0.05
    natural_resource_stock: float = 1_000.0


class Person(Agent):
    def __init__(self, uid: int, model: "MacroModel") -> None:
        super().__init__(uid, model)
        self.wage: float = 0.0
        self.wealth: float = self.random.lognormvariate(10, 1)

    def step(self) -> None:
        self.consume()
        self.save()

    def consume(self) -> None:
        spend = 0.7 * self.wealth
        self.wealth -= spend
        self.model.gdp += spend

    def save(self) -> None:
        self.wealth *= 1.02  # naïve growth


class Firm(Agent):
    def __init__(self, uid: int, model: "MacroModel") -> None:
        super().__init__(uid, model)
        self.capital = 100.0

    def step(self) -> None:
        hire_cost = 10
        revenue = self.capital * 0.15
        self.capital += revenue - hire_cost
        self.model.tax_revenue += revenue * self.model.params.income_tax


class State(Agent):
    def step(self) -> None:
        self.model.gdp += 0  # placeholder


class MacroModel(Model):
    def __init__(self, n_persons=500, n_firms=50, *, params: MacroParams) -> None:
        self.params = params
        self.schedule = RandomActivation(self)
        self.gdp = 0.0
        self.tax_revenue = 0.0

        # create agents
        for i in range(n_persons):
            self.schedule.add(Person(i, self))
        for j in range(n_firms):
            self.schedule.add(Firm(10_000 + j, self))
        self.schedule.add(State(99_999, self))

        self.datacollector = DataCollector(
            model_reporters={"GDP": lambda m: m.gdp, "Tax": lambda m: m.tax_revenue}
        )

    def step(self) -> None:
        self.gdp = 0.0
        self.tax_revenue = 0.0
        self.schedule.step()
        self.datacollector.collect(self)


#!/usr/bin/env python3
# —————————————————————————————————————————————————————————————————————
# Add this to the end of sim_gpt.py
# —————————————————————————————————————————————————————————————————————


def main(
    steps: int = 120,
    persons: int = 500,
    firms: int = 50,
) -> None:
    """
    Run the MacroModel for `steps` ticks, then print
    the trailing 5 rows of the collected data.
    """
    params = MacroParams()  # use your default tax/subsidy/resource values
    model = MacroModel(n_persons=persons, n_firms=firms, params=params)

    for _ in range(steps):
        model.step()

    # retrieve and display the DataFrame
    df = model.datacollector.get_model_vars_dataframe()
    print(df)  # last 5 rows


if __name__ == "__main__":
    main()
