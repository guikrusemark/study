import os
import pandas as pd

current_directory = os.getcwd()
sheet_location = '/mnt/c/Users/guilh/OneDrive/Documents/_workspace/canil_krusemark/main.xlsx'

# Read the Excel file
# Read all sheets from the Excel file
dfs = pd.read_excel(  # type: ignore
    sheet_location, sheet_name=None)

# dfs is a dictionary where the key is the sheet name and the value is the DataFrame
# You can access each sheet's DataFrame like this: dfs['Sheet1']

# To convert each sheet to JSON and save it
for sheet_name, df in dfs.items():
    json_data = df.to_json(orient='records', date_format='iso')  # type: ignore
    # Construct a filename for each sheet's JSON
    json_filename = f'{current_directory}/{
        sheet_name}.json'
    with open(json_filename, 'w') as file:
        file.write(json_data)
