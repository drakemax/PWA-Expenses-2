// enable offline data
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener    where("date", ">", 1596766972959, 1596765700336,1596245186, 1596240000 )
db.collection('expenses').where("date", ">", 1596766972959).orderBy('date', 'desc').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      renderExpense(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removeExpense('change'.doc.id);

    }
  });
});

// add new expense
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const expense = {
    sum: form.sum.value,
    shop: form.shop.value,
    category: form.category.value,
    account: form.account.value,
    billable: form.billable.value,
    comment: form.comment.value,
    date: Date.now()



  };

  db.collection('expenses').add(expense)
    .catch(err => console.log(err));

  form.sum.value = '';
  form.shop.value = '';
  form.category.value = '';
  form.account.value = '';
  form.billable.value = '';
  form.comment.value = '';
  //form.date.value = '';

});

// remove a expense
const expenseContainer = document.querySelector('.expenses');
expenseContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('expenses').doc(id).delete();
  }

});