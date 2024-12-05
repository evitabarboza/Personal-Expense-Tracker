# Personal Expense Tracker API

## Overview

The **Personal Expense Tracker API** helps users log, view, and analyze their expenses efficiently. It allows users to manage their spending by adding new expenses, retrieving expense summaries, and analyzing spending patterns. With features like automated daily summary reports and real-time insights into spending habits, this API helps users take control of their finances.

## Features
- **Add Expense**: Log new expenses with details such as category, amount, and date.
- **Get Expenses**: Retrieve a summary of expenses filtered by category or date range.
- **Analyze Spending**: Get insights into total spending by category or time.
- **Generate Summary**: Automated daily, weekly, or monthly expense summaries using cron jobs.
- **Data Validation**: Ensures valid categories and positive amounts for expense entries.
- **Real-Time Reporting**: Access a summary of expenses anytime with automated reports.

## Tech Stack
- **Node.js**: JavaScript runtime for building the backend API.
- **Express**: Web framework for handling HTTP requests.
- **node-cron**: Task scheduling library to generate automated reports.
- **In-memory Array Storage**: Stores expense data temporarily in memory.

## Installation

To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/evitabarboza/personal-expense-tracker.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd personal-expense-tracker
   ```

3. **Install dependencies**:
   ```bash
   npm install express node-cron
   ```

4. **Start the application**:
   ```bash
   node app.js
   ```

The app will run locally on `http://localhost:3000`.

## Usage

### Adding an Expense

Send a `POST` request to `/expenses` with the following JSON body:

```json
{
    "category": "Food",
    "amount": 250,
    "date": "2024-12-05"
}
```

### Retrieving Expenses

Send a `GET` request to `/expenses?category=Food&startDate=2024-12-01&endDate=2024-12-05` to get filtered expenses.

### Analyzing Spending

Send a `GET` request to `/expenses/analysis` to view insights on spending by category or time.

### Automated Summary Reports

The API uses a **cron job** to generate automated daily summary reports. You will see the logs in the console every day.

## Project Structure

```
/src
  /app.js          // Main file handling server routes and logic
  /expense.js      // Logic for managing expenses (add, retrieve, analyze)
```

## Dependencies
- **express**: Web framework for building APIs.
- **node-cron**: Scheduling library for cron jobs.
- **uuid** (optional): For unique expense IDs (if implemented).

## License

This project is licensed under the MIT License. You can find a copy of the license [here](LICENSE).

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-branch`.
3. **Make your changes** and commit them: `git commit -m 'Add some feature'`.
4. **Push to the branch**: `git push origin feature-branch`.
5. **Open a pull request**.

Please make sure to update tests as appropriate.

## Contact

For any inquiries, suggestions, or feedback, please contact me at:

- **Email**: evitabarboza195@gmail.com
- **GitHub**: [Evita Barboza](https://github.com/evitabarboza)
