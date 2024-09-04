// Your API key
const API_KEY = 'ab6fdf30a947c3e966b21f91946de1b1';

// Event listener for the Convert button
document.getElementById('convert-btn').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    // Validate input
    if (amount === '' || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    // Construct the API URL with the API key
    const apiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

    // Fetch exchange rates
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the API response for debugging
            
            if (data.success) {
                // Ensure fromCurrency and toCurrency are valid
                if (!data.rates[fromCurrency] || !data.rates[toCurrency]) {
                    throw new Error('Currency not supported.');
                }

                // Convert amount to EUR first
                const amountInEur = amount / data.rates[fromCurrency];

                // Convert EUR to target currency
                const rate = data.rates[toCurrency];
                const convertedAmount = (amountInEur * rate).toFixed(2);
                document.getElementById('result').textContent = 
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                throw new Error('API response was not successful.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch exchange rates. Please try again later.');
        });
});
