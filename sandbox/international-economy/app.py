from country import Country

countries = [Country('United States', 328_200_000, 9_833_520, 20_000.5, 31_106.5),
             Country('China', 1_420_000_000, 9_596_960, 13_000.4, 8_050.5),
             Country('Japan', 126_800_000, 364_555, 5_000.2, 9_236.2),
             Country('Germany', 82_800_000, 348_560, 3_880.9, 2_359.8),
             Country('United Kingdom', 66_000_000, 242_495, 2_770.3, 2_003.2),
             Country('France', 66_990_000, 547_557, 2_715.5, 2_420.2),
             Country('India', 1_380_000_000, 2_973_190, 2_700.2, 1_123.2),
             Country('Italy', 60_480_000, 294_140, 2_000.1, 2_450.2),
             Country('Brazil', 209_500_000, 8_358_140, 1_900.0, 1_800.1)]

if __name__ == '__main__':
    for country in countries:
        print(country)