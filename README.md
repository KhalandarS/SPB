# Industrial Water Management & Optimization System

A comprehensive dual-platform solution for monitoring and optimizing water consumption in industrial settings, specifically tailored for paper plants like SPB Erode. This project combines a high-level **Streamlit dashboard** for executive insights and a modern **React + Vite frontend** for detailed operational data visualization.

---

## 🚀 Key Features

- **Real-time Consumption Monitoring:** Track water usage across various plant sections.
- **Trend Analysis:** visualize historical data to identify patterns and anomalies.
- **Sustainability Insights:** Actionable intelligence for closed-loop systems and cooling tower efficiency.
- **Norm Tracking:** Monitor usage against regional and internal sustainability norms.
- **Interactive Dashboards:** Built with Streamlit (Python) and React (JavaScript/Recharts).

---

## 🛠️ Technology Stack

### Backend & Analytics (Core)
- **Language:** Python 3.x
- **Framework:** [Streamlit](https://streamlit.io/)
- **Data Handling:** Pandas, Openpyxl
- **Visualization:** Plotly Express

### Frontend (Operational View)
- **Language:** JavaScript (React 19)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Icons:** Lucide-React

---

## 📂 Project Structure

```text
.
├── app.py                  # Main Streamlit Dashboard entry point
├── data_pipeline.py        # Data ingestion and cleaning logic
├── export_data.py          # Data export utility script
├── data/                   # Raw data files (Excel, Word, Project Plans)
│   ├── BUILD_GUIDE.md      # Detailed step-by-step build instructions
│   └── ...                 
└── frontend/               # React + Vite web application
    ├── src/                # React components and hooks
    ├── vite.config.js      # Vite configuration
    └── package.json        
```

---

## ⚙️ Setup & Installation

### 1. Streamlit Dashboard (Python)

1. **Navigate to the root directory:**
   ```bash
   cd water
   ```
2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. **Install dependencies:**
   ```bash
   pip install streamlit pandas plotly openpyxl python-docx
   ```
4. **Run the dashboard:**
   ```bash
   streamlit run app.py
   ```

### 2. React Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install node dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📘 Documentation

For a detailed walkthrough on how the system was built and how to extend it, refer to:
- [BUILD_GUIDE.md](file:///home/khalandar/Desktop/water/data/BUILD_GUIDE.md)
- [WATER_MANAGEMENT_PROJECT_PLAN.md](file:///home/khalandar/Desktop/water/data/WATER_MANAGEMENT_PROJECT_PLAN.md)

---

## 🤝 Project Background
This system was developed to address water stress challenges in the Indian industrial sector, focusing on specific water consumption (SWC) reduction and closed-loop optimization targets.
