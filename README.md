# Take-Home Assignment

## Full-Stack Developer Intern (Angular & Spring Boot)

### Objective

Build a simplified Task Management Application where users can:

1. Create, Update, and Delete tasks.
2. Mark tasks as Completed.
3. View a list of tasks with filtering and sorting options.

---

### Requirements

#### Backend

- **Framework**: Spring Boot
- **Features**:
  - Expose REST APIs to manage tasks:
    - `POST /tasks`: Create a new task.
    - `GET /tasks`: Retrieve all tasks, with support for filtering (e.g., by completion status) and sorting (e.g., by creation date).
    - `PUT /tasks/{id}`: Update a specific task.
    - `DELETE /tasks/{id}`: Delete a specific task.
  - Use an in-memory database (e.g., H2) for persistence.
  - Implement basic input validation (e.g., task name cannot be empty).

#### Frontend

- **Framework**: Angular with PrimeNG
- **Features**:
  - **Task List**:
    - Display all tasks in a PrimeNG DataTable with columns for task name, status, and creation date.
    - Add sorting and filtering options.
  - **Task Form**:
    - Create and edit tasks using a PrimeNG dialog.
  - **Task Actions**:
    - Allow marking a task as completed using a toggle switch or checkbox.
    - Enable deletion of tasks with a confirmation dialog.
  - **Responsive Design**:
    - Ensure the UI looks good on both desktop and mobile.

---

### Version Control

- Use Git for version control.
- Fork the provided GitHub repository to begin your work.
- Include a well-organized commit history that reflects the development process.

---

### Guidelines

1. Fork the GitHub repository provided as part of the assignment.\
   **Important**: Please make sure your fork is set to public so we can review your progress and submissions. Private forks will not be considered.
2. Document your solution in a `README.md` file:
   - How to run the application (both backend and frontend).
   - APIs implemented in the backend.
   - Features implemented in the frontend.
   - Any assumptions or trade-offs made.
3. Submit your forked GitHub repository link by replying to the technical interview invitation email.

**Note:** Only public forks are eligible for review. If your fork is set to private, please make it public by adjusting the repository's visibility in your GitHub settings. Here's how:

1. Go to your forked repository's settings.
2. Under "General" settings, scroll to "Danger Zone."
3. Click "Change repository visibility" and select "Public."

---

### Evaluation Criteria

1. **Code Quality**:
   - Clean, readable, and maintainable code.
   - Proper use of Git for version control (e.g., meaningful commit messages).
2. **Functionality**:
   - Completeness of the required features.
   - Proper working of the application as per the requirements.
3. **Best Practices**:
   - Proper project structure.
   - Adherence to conventions in Spring Boot and Angular.
   - Usage of PrimeNG components effectively.
4. **Documentation**:
   - Clear and concise `README.md` file.
   - Adequate inline comments in code.

---

### Bonus Points (Optional)

1. Implement JWT-based authentication.
2. Add unit tests for backend (e.g., using JUnit) and frontend (e.g., using Jasmine/Karma).
3. Containerize with Docker: Provide a `docker-compose.yml` file to set up and run the backend and frontend in separate Docker containers.
4. Deploy the application (e.g., using Heroku for the backend and Netlify for the frontend).

---

### Time Limit

Candidates are expected to submit their solution within **3 calendar days** (including weekends) from the time they receive the assignment details.
