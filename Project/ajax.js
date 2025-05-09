<script>
const addExpenseForm = document.getElementById('add-expense-form');
const expensesTableBody = document.getElementById('expenses');
const editExpenseContainer = document.getElementById('edit-expense-container');
const editExpenseForm = document.getElementById('edit-expense-form');

let currentExpenseId = null; // To store the ID of the expense being edited

function loadExpenses() {
    fetch('http://127.0.0.1:5000/api/expenses')
        .then(response => response.json())
        .then(data => {
            expensesTableBody.innerHTML = '';
            data.forEach(expense => {
                const row = `<tr>
                    <td>${expense.category}</td>
                    <td>${expense.date}</td>
                    <td>${expense.description}</td>
                    <td>${expense.amount}</td>
                    <td>
                        <button onclick="showEditForm('${expense.id}', '${expense.category}', '${expense.date}', '${expense.description}', '${expense.amount}')">Edit</button>
                        <button onclick="deleteExpense('${expense.id}')">Delete</button>
                    </td>
                </tr>`;
                expensesTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching expenses:', error));
}

addExpenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    fetch('http://127.0.0.1:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, date, description, amount }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Expense added:', data);
        addExpenseForm.reset();
        loadExpenses(); // Reload the expense list
    })
    .catch(error => console.error('Error adding expense:', error));
});

function showEditForm(id, category, date, description, amount) {
    currentExpenseId = id;
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-category').value = category;
    document.getElementById('edit-date').value = date;
    document.getElementById('edit-description').value = description;
    document.getElementById('edit-amount').value = amount;
    editExpenseContainer.style.display = 'block';
}

function hideEditForm() {
    editExpenseContainer.style.display = 'none';
    currentExpenseId = null;
}

editExpenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!currentExpenseId) return;

    const category = document.getElementById('edit-category').value;
    const date = document.getElementById('edit-date').value;
    const description = document.getElementById('edit-description').value;
    const amount = document.getElementById('edit-amount').value;

    fetch(`http://127.0.0.1:5000/api/expenses/${currentExpenseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, date, description, amount }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Expense updated:', data);
        hideEditForm();
        loadExpenses(); // Reload the expense list
    })
    .catch(error => console.error('Error updating expense:', error));
});

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Expense deleted:', data);
            loadExpenses(); // Reload the expense list
        })
        .catch(error => console.error('Error deleting expense:', error));
    }
}

// Load expenses when the page loads
loadExpenses();
</script>