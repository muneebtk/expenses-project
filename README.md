# Expense Management System

A full-stack expense management application built with Django REST Framework (DRF) backend and React frontend. Users can track their expenses with comprehensive CRUD operations and visualize spending patterns through interactive charts.

## 🚀 Features

- **User Authentication**: Secure login and signup functionality
- **Expense Management**: Create, read, update, and delete expenses
- **Data Visualization**: Interactive pie chart for expense summary
- **RESTful API**: Well-structured API endpoints

## 🛠️ Tech Stack

### Backend
- **Django REST Framework (DRF)**: API development
- **Django**: Web framework
- **SQLite**: Database
- **Django CORS Headers**: Cross-origin resource sharing
- **JWT Authentication**: Token-based authentication

### Frontend
- **React**: Frontend framework
- **Axios**: HTTP client for API requests
- **Chart.js**: Data visualization
- **React Router**: Client-side routing

## 🔧 Installation & Setup

### Backend Setup (Django REST Framework)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expenses-project
   cd expense_track_api
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Run the backend server**
   ```bash
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to frontend directory**
   ```bash
   cd expenses-project
   cd expense-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register/
Content-Type: application/json

{
  "first_name": "test",
  "last_name": "user",
  "email": "test@example.com",
  "password": "securepassword123",
  "password_confirm": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "securepassword123"
}
```

#### Response
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "first_name": "test",
    "email": "test@example.com"
  }
}
```

### Expense Endpoints

#### Get All Expenses
```http
GET /api/expenses/
Authorization: Bearer <access_token>
```

#### Create Expense
```http
POST /api/expenses/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "notes": "Weekly grocery shopping",
  "date": "2024-01-15"
}
```

#### Get Single Expense
```http
GET /api/expenses/{id}/
Authorization: Bearer <access_token>
```

#### Update Expense
```http
PUT /api/expenses/{id}/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Grocery Shopping",
  "amount": 85.00,
  "category": "Food",
  "notes": "Updated description",
  "date": "2024-01-15"
}
```

#### Delete Expense
```http
DELETE /api/expenses/{id}/
Authorization: Bearer <access_token>
```

## 💡 Usage

1. **Sign Up**: Create a new account or log in with existing credentials
2. **Add Expenses**: Click "Add Expense" to create new expense entries
3. **View Expenses**: Browse through your expense list with search and filter options
4. **Edit/Delete**: Modify or remove expenses as needed
5. **Analytics**: View pie chart visualization of expenses by category
6. **Summary**: Check total spending and category breakdowns

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Access tokens expire in 1.5 hour
- Refresh tokens expire in 1 days
- Tokens are stored in localStorage (frontend)
- All expense endpoints require authentication

## 📊 Features in Detail

### Expense Management
- Add expenses with title, amount, category, notes, and date
- Edit existing expenses
- Delete unwanted expenses
- Search and filter functionality
- Pagination for large datasets

### Data Visualization
- Interactive pie chart showing expense distribution by category
- Monthly spending trends
- Category-wise breakdown
- Total expense summary

### User Experience
- Loading states and error handling
- Form validation
- Success/error notifications
---
