document.getElementById('loan-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  
  setTimeout(calculateResults, 2000);
  
  e.preventDefault();
});

function calculateResults(){
  
  //getting elements
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12; //interest rate
  const calculatedPayment = parseFloat(years.value)*12;
  
  const x = Math.pow(1+calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2) // 2 is the number of decimals we want
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayment)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your input');
  }
};

function showError(error){
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  //clear error
  setTimeout(clearError, 3000);
};

function clearError(e){
  document.querySelector('.alert').remove();
}