# 🩺 Patient Monitoring System

A real-time patient vitals monitoring system using **Node.js**, **React**, **PostgreSQL**, **WebSockets**, and **Chart.js**.

---

## 📁 Project Structure

/project-root
├── backend/ # Node.js + Express + Sequelize API
├── frontend/ # React + Chart.js + WebSocket client


---

## ⚙️ Backend Setup (`/backend`)

### 1. Install dependencies

cd backend
npm install


### 2. Create .env file

Create a .env file in the /backend directory:

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=PatientMonitoring
DB_PORT=54351

JWT_SECRET=secret

🛑 Ensure PostgreSQL is running and a database named PatientMonitoring exists (or will be created via Sequelize).


### 3. Run migrations or sync models

Depending on your setup:

# If using migrations
npx sequelize-cli db:migrate

# OR if using sync()
npm run sync-db



### 4. Start backend server

4. Start backend server

The server will start on: http://localhost:4000
WebSocket is available at: ws://localhost:4000



## 💻 Frontend Setup (/frontend)

### 1. Install dependencies

cd frontend
npm install


### 2. Create .env file

In the /frontend directory:

VITE_API_URL=http://localhost:4000/api
VITE_WS_URL=ws://localhost:4000


### 3. Start React app

npm run dev

Open your browser at: http://localhost:5173 (or whatever Vite prints)


🔍 Features:

📡 Live WebSocket vitals stream
📊 Real-time charting per patient
📋 Vitals table with latest values
🚨 Toasts for abnormal vitals detection
🔐 JWT-based auth


---


🧪 Testing the Setup

* Backend should print Server running on http://localhost:4000

* Remote-Office - Healthcare Monitoring API.postman_collection.json can be imported in Postman, where all routes with sample data is provided as examples.