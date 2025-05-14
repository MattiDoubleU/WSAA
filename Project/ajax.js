function getAll(callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses",
        method: "GET",
        dataType: "json",
        success: function (result) {
            callback(result);
        },
        error: function (xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function createExpense(expense, callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses",
        method: "POST",
        data: JSON.stringify(expense),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            callback(result);
        },
        error: function (xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function updateExpense(expense, callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses/" + encodeURIComponent(expense.id),
        method: "PUT",
        data: JSON.stringify(expense),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            callback(result);
        },
        error: function (xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

function deleteExpense(id, callback) {
    $.ajax({
        url: "http://127.0.0.1:5000/api/expenses/" + encodeURIComponent(id),
        method: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            callback(result);
        },
        error: function (xhr, status, error) {
            console.log("error: " + status + " msg: " + error);
        }
    });
}

// UI Logic

function loadExpenses() {
    getAll(function (expenses) {
        const tbody = $("#expenses");
        tbody.empty();
        expenses.forEach(function (expense) {
            const row = `<tr>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>
                    <button onclick="showEditForm(${expense.id}, '${expense.category}', '${expense.date}', '${expense.description}', ${expense.amount})">Edit</button>
                    <button onclick="deleteExpenseUI(${expense.id})">Delete</button>
                </td>
            </tr>`;
            tbody.append(row);
        });
    });
}

function setupFormHandlers() {
    $("#add-expense-form").submit(function (e) {
        e.preventDefault();
        const expense = {
            category: $("#category").val(),
            date: $("#date").val(),
            description: $("#description").val(),
            amount: parseFloat($("#amount").val())
        };
        createExpense(expense, function () {
            $("#add-expense-form")[0].reset();
            loadExpenses();
        });
    });

    $("#edit-expense-form").submit(function (e) {
        e.preventDefault();
        const expense = {
            id: parseInt($("#edit-id").val()),
            category: $("#edit-category").val(),
            date: $("#edit-date").val(),
            description: $("#edit-description").val(),
            amount: parseFloat($("#edit-amount").val())
        };
        updateExpense(expense, function () {
            hideEditForm();
            loadExpenses();
        });
    });
}

function showEditForm(id, category, date, description, amount) {
    $("#edit-id").val(id);
    $("#edit-category").val(category);
    $("#edit-date").val(date);
    $("#edit-description").val(description);
    $("#edit-amount").val(amount);
    $("#edit-expense-container").show();
}

function hideEditForm() {
    $("#edit-expense-container").hide();
    $("#edit-expense-form")[0].reset();
}

function deleteExpenseUI(id) {
    if (confirm("Are you sure you want to delete this expense?")) {
        deleteExpense(id, function () {
            loadExpenses();
        });
    }
}

// Init

$(document).ready(function () {
    setupFormHandlers();
    loadExpenses();
});

