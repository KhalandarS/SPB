# Build Walkthrough: Industrial Water Management & Optimization System

This guide will walk you through the step-by-step process of building the Water Management Dashboard based on the `WATER_MANAGEMENT_PROJECT_PLAN.md` and the provided data files in this directory.

## Prerequisite Setup
First, ensure you have Python installed, then set up your working environment.

1. **Create and Activate a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/macOS
   ```
2. **Install Required Libraries:**
   ```bash
   pip install pandas openpyxl python-docx streamlit plotly
   ```

---

## Phase 1: Data Extraction & Cleaning (Data Engineering)

We need to ingest the data from `water consumption From April 2023.xlsx`. Create a python script named `data_pipeline.py`.

```python
import pandas as pd
from docx import Document

def load_consumption_data(filepath):
    """Loads and basic cleaning of the Excel data."""
    # Ensure you are skipping any title rows if the Excel file is formatting-heavy
    df = pd.read_excel(filepath, engine='openpyxl')
    
    # Standardize column names
    df.columns = df.columns.astype(str).str.strip().str.lower()
    
    # Fill missing values if necessary
    df = df.fillna(0) 
    return df

def extract_text_from_word(filepath):
    """Extracts text for context or rule extraction."""
    doc = Document(filepath)
    return "\n".join([para.text for para in doc.paragraphs])

if __name__ == "__main__":
    df = load_consumption_data('water consumption From April 2023.xlsx')
    print(df.head())
```

## Phase 2: Building the Dashboard (Analytics & Visualization)

We will use **Streamlit** to build an interactive dashboard. Create a file named `app.py`.

```python
import streamlit as st
import pandas as pd
import plotly.express as px
from data_pipeline import load_consumption_data

# 1. Page Configuration
st.set_page_config(page_title="SPB Erode Water Dashboard", layout="wide", page_icon="💧")
st.title("💧 Industrial Water Management & Optimization")
st.markdown("Monitoring water usage against regional norms to improve sustainability.")

# 2. Load Data
@st.cache_data
def get_data():
    return load_consumption_data('water consumption From April 2023.xlsx')

df = get_data()

# 3. Sidebar Filters
st.sidebar.header("Filters")
# Example: Filter by specific columns or ranges if your data has them
# selected_month = st.sidebar.selectbox("Select Month", df['month'].unique())

# 4. Display Key Metrics
st.subheader("Data Overview")
st.dataframe(df.head(10))

# 5. Visualizations
st.subheader("Consumption Trends")
# NOTE: Replace 'x_column' and 'y_column' with actual column names from your Excel file
try:
    fig = px.line(df, x=df.columns[0], y=df.columns[1], title="Total Consumption Over Time")
    st.plotly_chart(fig, use_container_width=True)
except Exception as e:
    st.warning("Update the X and Y columns in the code to match your Excel headers!")
```

## Phase 3: Run the Dashboard

To see your work in action, run the following command in your terminal:

```bash
streamlit run app.py
```
This will open a local web server (usually at `http://localhost:8501`) displaying your dashboard. 

## Phase 4: Next Steps & Optimization

Once the basic dashboard is running, you can iterate on it with features mentioned in the plan:
1. **Variance Alerts:** Add conditional formatting to your Streamlit dataframe to highlight cells red if they exceed the "NORM" target.
2. **Specific Water Consumption (SWC):** Add a calculated column `df['SWC'] = df['Total Water'] / df['Total Paper Produced']` and plot it.
3. **Incorporate Word Docs:** Display summarized action items from the `SPB Erode Water Consumption...docx` directly in the Streamlit app sidebar for quick reference.
