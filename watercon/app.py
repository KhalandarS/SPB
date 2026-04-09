import streamlit as st
import pandas as pd
import plotly.express as px
from data_pipeline import load_consumption_data

st.set_page_config(page_title="SPB Erode Water Dashboard", layout="wide", page_icon="💧")

def main():
    st.title("💧 Industrial Water Management Dashboard")
    st.markdown("Monitoring water usage against regional norms to improve sustainability.")
    
    # Load Data
    try:
        df = load_consumption_data()
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return
    
    if df.empty:
        st.warning("No data found in the Excel file.")
        return

    st.sidebar.header("Navigation")
    st.sidebar.markdown("Use this dashboard to monitor and optimize water usage.")
    
    # Create Tabs
    tab1, tab2, tab3 = st.tabs(["Overview", "Trend Analysis", "Insights"])
    
    with tab1:
        st.subheader("Data Overview")
        st.dataframe(df.head(20), use_container_width=True)
        
        # Determine the columns indicating "Time" vs "Metrics"
        # We will assume the first column is Date/Month if typical.
        time_col = df.columns[0]
        st.write(f"**Assuming time/category column:** {time_col}")
        
    with tab2:
        st.subheader("Total Consumption Over Time")
        if len(df.columns) >= 2:
            # Let the user pick which metric to plot
            metrics = st.multiselect("Select Metrics to Plot", df.columns[1:], default=[df.columns[1]])
            if metrics:
                fig = px.line(df, x=time_col, y=metrics, title="Water Consumption Trends", markers=True)
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.info("Select at least one metric to visualize.")
        else:
            st.info("Not enough columns to generate a trend chart.")
            
    with tab3:
        st.subheader("Sustainability Insights")
        st.markdown('''
        * **Closed-Loop Systems:** Focus on recycling PM (Paper Machine) water.
        * **Cooling Tower Efficiency:** Optimize the cooling tower blowdown based on the consumption trends noted in the data.
        * **Variance Alerts:** Departments exceeding the specific internal norms should be monitored.
        ''')
        st.info("Additional insights will be formulated once detailed norm values are configured.")

if __name__ == "__main__":
    main()
