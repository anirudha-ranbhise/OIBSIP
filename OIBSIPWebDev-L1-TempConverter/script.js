function convertTemperature() {
    const inputVal = parseFloat(document.getElementById('tempInput').value);
    const unit = document.getElementById('unitSelect').value;
    
    const resultsArea = document.getElementById('resultsArea');
    const errorMsg = document.getElementById('errorMsg');
    
    const cResult = document.getElementById('celsiusResult');
    const fResult = document.getElementById('fahrenheitResult');
    const kResult = document.getElementById('kelvinResult');

    // Reset displays
    resultsArea.style.display = 'none';
    errorMsg.textContent = '';

    // Validation
    if (isNaN(inputVal)) {
        errorMsg.textContent = 'Please enter a valid number.';
        return;
    }

    let c, f, k;

    // Conversion Logic
    if (unit === 'celsius') {
        if (inputVal < -273.15) {
            errorMsg.textContent = 'Temperature cannot be below Absolute Zero (-273.15°C)';
            return;
        }
        c = inputVal;
        f = (c * 9/5) + 32;
        k = c + 273.15;
    } else if (unit === 'fahrenheit') {
        if (inputVal < -459.67) {
            errorMsg.textContent = 'Temperature cannot be below Absolute Zero (-459.67°F)';
            return;
        }
        f = inputVal;
        c = (f - 32) * 5/9;
        k = c + 273.15;
    } else if (unit === 'kelvin') {
        if (inputVal < 0) {
            errorMsg.textContent = 'Temperature cannot be below Absolute Zero (0 K)';
            return;
        }
        k = inputVal;
        c = k - 273.15;
        f = (c * 9/5) + 32;
    }

    // Display Results
    cResult.textContent = `Celsius: ${c.toFixed(2)} °C`;
    fResult.textContent = `Fahrenheit: ${f.toFixed(2)} °F`;
    kResult.textContent = `Kelvin: ${k.toFixed(2)} K`;
    
    resultsArea.style.display = 'block';
}