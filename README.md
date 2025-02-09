# 📝 Task Management Application  

A full-stack task management application built with **Spring Boot** (backend) and **Angular with PrimeNG** (frontend).  

## 📌 Features  

### **Backend (Spring Boot)**
- Exposes **REST APIs** to manage tasks.
- **CRUD operations**: Create, Read, Update, and Delete tasks.
- Uses an **in-memory database (H2)** for persistence.
- **Input validation**: Ensures tasks have valid names.

### **Frontend (Angular + PrimeNG)**
- Displays all tasks in a **PrimeNG DataTable** with sorting & filtering.
![image](https://github.com/user-attachments/assets/ec608c2d-2cb1-44b7-a63c-5cce7349f5c9)

- **Task Form**: Allows users to create and edit tasks using a PrimeNG dialog.
![image](https://github.com/user-attachments/assets/29a48081-42b0-4d91-a279-1ffa94872a47)
![image](https://github.com/user-attachments/assets/64000325-d955-4607-a875-a08237dc3f9a)

- **Task Actions**:
  - Mark tasks as **completed** with a toggle switch.
![image](https://github.com/user-attachments/assets/2cd5465c-6674-49d7-a8bd-4f653cfc39b9)
  - **Delete** tasks with a confirmation popup.
![image](https://github.com/user-attachments/assets/c368aa91-bb5b-4ff1-9804-73781c2d0969)
  - **View task details** in a dialog.
![image](https://github.com/user-attachments/assets/6ee323a7-3fe4-4f4f-83e0-8d263612554b)

- **Responsive Design**: Works on both desktop and mobile.
---

## 🚀 How to Run the Application  

### **Backend Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/Mariem-Chebbi/fullstack-developer-internship-task.git
   cd fullstack-developer-internship-task/backend
2. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
3. The backend will start on http://localhost:8083.
### **Frontend Setup** 
1. Navigate to the frontend folder:
   ```sh
   cd frontend
2. Install dependencies:
   ```sh
   npm install
3. Start the Angular application:
   ```sh
   ng serve
4. The frontend will be available at http://localhost:4200.

