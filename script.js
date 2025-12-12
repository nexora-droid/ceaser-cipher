let isDecryptMode = false;

const slider = document.getElementById('shiftSlider');
const numberInput = document.getElementById('shiftNumber');
const shiftDisplay = document.getElementById('shiftDisplay');
const modeToggle = document.getElementById('modeToggle');
const actionButton = document.getElementById('actionButton');
const outputLabel = document.getElementById('outputLabel');
const output = document.getElementById('output');

function toggleMode() {
    isDecryptMode = !isDecryptMode;
    modeToggle.classList.toggle('active');

    if (isDecryptMode) {
        actionButton.textContent = 'Decrypt Message';
        outputLabel.textContent = 'Decrypted Output: ';
        output.textContent = "Your decrypted message will show here";
        output.classList.add('empty');
    } else {
        actionButton.textContent = 'Encrypt Message';
        outputLabel.textContent = 'Encrypted Output: ';
        output.textContent = "Your encrypted message will show here";
        output.classList.add('empty');
    }
}
slider.addEventListener('input', (e)=>{
    numberInput.value = e.target.value;
    shiftDisplay.textContent = e.target.value;
});
numberInput.addEventListener('input', (e)=>{
    let val = parseInt(e.target.value) || 1;
    if (val < 1) val = 1;
    if (val > 25) val = 25;
    numberInput.value = val;
    slider.value = val;
    shiftDisplay.textContent = val;
});
function processText(){
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shiftNumber').value);
    if (!text.trim()){
        output.textContent = 'Please enter a mesage to ' + (isDecryptMode ? 'decrypt' : 'encrypt') + '.';
        output.classList.add('empty');
        return;
    }
    const effectiveShift = isDecryptMode ? -shift : shift;
    let result = '';
    for (let i = 0; i < text.length; i++){
        let char = text[i];
        if (char.match(/[a-z]/i)){
            const code = text.charCodeAt(i);
            if (code >= 65 && code <= 90){
                char = String.fromCharCode(((code - 65 + effectiveShift + 26) % 26)+ 65);
            } else if (code >= 97 && code <= 122){
                char = String.fromCharCode(((code - 97 + effectiveShift + 26) % 26)+ 97);
            }
        }
        result += char;
    }
    output.textContent = result;
    output.classList.remove('empty');
}
document.getElementById('inputText').addEventListener('keypress', (e)=>{
    if (e.key === 'Enter' && e.ctrlKey) {
        processText()
    }
});