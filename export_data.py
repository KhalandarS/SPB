import pandas as pd
import json
import os

def export_data_to_json(excel_path='data/water consumption From April 2023.xlsx', json_path='frontend/public/data.json'):
    try:
        # Read the Excel file, skipping the first 4 rows to get the actual headers
        df = pd.read_excel(excel_path, engine='openpyxl', header=4)
        
        # Drop rows where 'Month' or the first column is null/NaN
        first_col = df.columns[0]
        df = df.dropna(subset=[first_col])
        
        # Clean up column names
        df.columns = df.columns.astype(str).str.strip().str.replace('\n', ' ')

        # Convert the month column to a proper formatted string (e.g., "Apr 2023")
        if pd.api.types.is_datetime64_any_dtype(df[first_col]):
            df[first_col] = df[first_col].dt.strftime('%b %Y')
        # Convert the dataframe to a list of dictionaries
        data_records = df.to_dict(orient='records')
        
        # Ensure the output directory exists
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        
        with open(json_path, 'w') as f:
            json.dump(data_records, f, indent=4, default=str)
            
        print(f"Data successfully exported to {json_path}")
    except Exception as e:
        print(f"Error exporting data: {e}")

if __name__ == "__main__":
    export_data_to_json()
