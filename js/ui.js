const expenses = document.querySelector('.expenses');

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add expense form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

// render expense data
const renderExpense = (data, id) => {
  //this takes number object and converts to a string date to display.
  // But for ordering number(data.date) will be required
  const x = data.date;

  const date1 = new Date(x).toLocaleDateString('en-GB');

  const html = `
    <div class="card-panel expense white row" data-id="${id}">
     
      <div class="expense-details">
        <div class="expense-sum">$${data.sum}</div>
        <div class="expense-other">${data.shop} / ${data.category} / ${data.billable}/ ${data.account}</br>
           ${data.comment}</br>
          ${date1}</br>
      </div>
      <div class="expense-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  expenses.innerHTML += html;
  // <img src="/img/dish.png" alt="expense thumb">
};

// remove expense
const removeExpense = (id) => {
  const expense = document.querySelector(`.expense[data-id=${id}]`);
  expense.remove();

};

