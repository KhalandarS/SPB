import pandas as pd
import json
import csv

def process_water_consumption_data(csv_path, json_path, norms_json_path):
    """
    Reads water consumption data from a CSV file, processes it,
    and saves it as JSON files. Also extracts NORM (target) values.
    """
    with open(csv_path, 'r') as f:
        lines = f.readlines()

    # Find the start of each table
    table_starts = [i for i, line in enumerate(lines) if 'Month,Intake well' in line or 'Month, Intake well' in line]

    all_data = []
    norms_data = {}
    
    for i, start_index in enumerate(table_starts):
        # Look for NORM row before this table
        norm_row = None
        for j in range(start_index - 1, max(0, start_index - 10), -1):
            if lines[j].startswith('NORM'):
                norm_row = lines[j]
                break
        
        header_line = lines[start_index]
        header = [h.strip() for h in header_line.split(',')]
        
        # Parse NORM values if found
        if norm_row:
            norm_values = [v.strip() for v in norm_row.split(',')]
            for j, col_name in enumerate(header):
                if col_name and j > 0 and j < len(norm_values):  # Skip 'NORM' column
                    try:
                        norms_data[col_name] = float(norm_values[j])
                    except (ValueError, TypeError):
                        pass
        
        # Find the end of the current table data
        end_index = start_index + 1
        while end_index < len(lines) and lines[end_index].strip() and 'AVERAGE' not in lines[end_index]:
            end_index += 1

        table_lines = lines[start_index+1:end_index]
        
        reader = csv.reader(table_lines)
        for row in reader:
            if not row or not row[0]:
                continue
            
            record = {}
            has_data = False
            for j, col_name in enumerate(header):
                if j < len(row):
                    value = row[j].strip() if isinstance(row[j], str) else row[j]
                    
                    if not col_name:
                        continue
                    
                    if value == '':
                        record[col_name] = None
                    elif col_name == 'Month':
                        try:
                            record[col_name] = pd.to_datetime(value, format='%b-%y').strftime('%Y-%m-%d')
                        except ValueError:
                            record[col_name] = value
                    else:
                        try:
                            num_value = float(value)
                            record[col_name] = num_value
                            has_data = True
                        except (ValueError, TypeError):
                            record[col_name] = value
                else:
                    record[col_name] = None
            
            if has_data and 'Month' in record and record['Month']:
                all_data.append(record)

    # Save consumption data to JSON
    with open(json_path, 'w') as f:
        json.dump(all_data, f, indent=4)
    
    # Save NORM targets to separate JSON
    with open(norms_json_path, 'w') as f:
        json.dump(norms_data, f, indent=4)

if __name__ == '__main__':
    csv_file = r'c:\Users\Khalandar\Desktop\water\watercon\data\water consumption From April 2023.csv'
    json_file = r'c:\Users\Khalandar\Desktop\water\watercon\frontend\public\data.json'
    norms_file = r'c:\Users\Khalandar\Desktop\water\watercon\frontend\public\norms.json'
    process_water_consumption_data(csv_file, json_file, norms_file)
    print(f"Data processed and saved to {json_file}")
    print(f"Norms saved to {norms_file}")




