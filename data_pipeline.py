import pandas as pd
import warnings
warnings.filterwarnings('ignore')

def load_consumption_data(filepath='data/water consumption From April 2023.xlsx'):
    try:
        # The real header is on row 4 (0-indexed)
        df = pd.read_excel(filepath, engine='openpyxl', header=4)
        
        # Drop rows where 'Month' or the first column is null/NaN since that's not our data
        first_col = df.columns[0]
        df = df.dropna(subset=[first_col])
        
        # Clean up column names
        df.columns = df.columns.astype(str).str.strip().str.replace('\n', ' ')
        
        return df
    except Exception as e:
        print(f"Error loading Excel file: {e}")
        return pd.DataFrame()

if __name__ == "__main__":
    df = load_consumption_data()
    print(df.head())
    print(df.columns.tolist())
