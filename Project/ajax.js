function getAll(callback) {
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses", 
        "data": "", 
        "dataType": "JSON",
        "success": function(result) {
           
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error fetching all expenses: " + status + " msg:" + error);
        }
    });
}

// Modified to match the database schema: Category, Date, Description, Amount
function createExpense(expenseData, callback) {
// Normalize keys to lowercase
    const formattedData = {
        category: expenseData.Category,
        date: expenseData.Date,
        description: expenseData.Description,
        amount: expenseData.Amount
    };

    console.log("Creating expense: " + JSON.stringify(expenseData));
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses", 
        "method": "POST",
        "data": JSON.stringify(expenseData),
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
          
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error creating expense: " + status + " msg:" + error);
        }
    });
}

// Modified to match the database schema: Transactionnumber (for ID), Category, Date, Description, Amount
function updateExpense(Expense, callback) {
// Normalize keys to lowercase
    const formattedData = {
        category: expenseData.Category,
        date: expenseData.Date,
        description: expenseData.Description,
        amount: expenseData.Amount
    };

    console.log("Updating expense: " + JSON.stringify(Expense));
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses/" + encodeURI(Expense.Transactionnumber), // Use Transactionnumber for ID in URL
        "method": "PUT",
        "data": JSON.stringify(Expense),
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
            console.log("Update successful:", result);
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error updating expense: " + status + " msg:" + error);
        }
    });
}

// Function to delete an expense by ID
function deleteExpense(id, callback) {
    console.log("Deleting expense with ID: " + id);
    $.ajax({
        "url": "http://127.0.0.1:5000/api/expenses/" + id, // 'id' here refers to Transactionnumber
        "method": "DELETE",
        "data": "", 
        "dataType": "JSON",
        contentType: "application/json; charset=utf-8", 
        "success": function(result) {
            console.log("Delete successful:", result);
            callback(result);
        },
        "error": function(xhr, status, error) {
            console.log("Error deleting expense: " + status + " msg:" + error);
        }
    });
}

// testing code

// Callback function for getAll
// Modified to match the database schema fields
function processGetAllResponse(result) {
// Normalize keys to lowercase
    const formattedData = {
        category: expenseData.Category,
        date: expenseData.Date,
        description: expenseData.Description,
        amount: expenseData.Amount
    };

    console.log("Processing all expenses response:");
    if (Array.isArray(result)) {
        for (let expense of result) { 
            let displayExpense = {}; 
            displayExpense.Transactionnumber = expense.Transactionnumber;
            displayExpense.Category = expense.Category;
            displayExpense.Date = expense.Date;
            displayExpense.Description = expense.Description;
            displayExpense.Amount = expense.Amount;

            console.log(displayExpense);
        }
    } else {
        console.log("Expected an array of expenses, but received:", result);
    }
}

// Callback function for createExpense
function processCreateResponse(result) {
    console.log("Processing create expense response:");
    console.log(result);
}

// Callback function for updateExpense
function processUpdateResponse(result) {
    console.log("Processing update expense response:");
    console.log(result);
}

// Callback function for deleteExpense
function processDeleteResponse(result) {
    console.log("Processing delete expense response:");
    console.log(result);
}

// The below section I added again to make the UI work. I used AI to enhance the code as previous version didn't work.
// When DOM is ready
$(document).ready(function () {
    // Fetch and display all existing expenses
    getAll(function (data) {
        for (let expense of data) {
            appendExpenseToTable(expense);
        }
    });

    // Handle add-expense form submission
    $("#add-expense-form").on("submit", function (e) {
        e.preventDefault();

        const newExpense = {
            Category: $("#category").val(),
            Date: $("#date").val(),
            Description: $("#description").val(),
            Amount: parseFloat($("#amount").val())
        };

        createExpense(newExpense, function (result) {
            if (result && result.Transactionnumber) {
                newExpense.Transactionnumber = result.Transactionnumber;
                appendExpenseToTable(newExpense);
                $("#add-expense-form")[0].reset();
            } else {
                alert("Failed to create expense.");
            }
        });
    });
});

// Helper to add a row to the table
function appendExpenseToTable(expense) {
    const row = `
        <tr id="row-${expense.Transactionnumber}">
            <td class="px-6 py-4 whitespace-nowrap">${expense.Transactionnumber}</td>
            <td class="px-6 py-4 whitespace-nowrap">${expense.Category}</td>
            <td class="px-6 py-4 whitespace-nowrap">${expense.Date}</td>
            <td class="px-6 py-4 whitespace-nowrap">${expense.Description}</td>
            <td class="px-6 py-4 whitespace-nowrap">${expense.Amount.toFixed(2)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="handleEdit(${expense.Transactionnumber})">Edit</button>
                <button onclick="handleDelete(${expense.Transactionnumber})">Delete</button>
            </td>
        </tr>
    `;
    $("#expenses").append(row);
}

function handleEdit(id) {
    const category = prompt("New category:");
    const date = prompt("New date (YYYY-MM-DD):");
    const description = prompt("New description:");
    const amount = parseFloat(prompt("New amount:"));

    const updatedExpense = {
        Transactionnumber: id,
        Category: category,
        Date: date,
        Description: description,
        Amount: amount
    };

    updateExpense(updatedExpense, function () {
        location.reload();
    });
}

function handleDelete(id) {
    if (confirm("Are you sure you want to delete this expense?")) {
        deleteExpense(id, function () {
            $(`#row-${id}`).remove(); 
        });
    }
}