const slider = document.getElementById('shift-slider');
const numberInput = document.getElementById('shiftNumber');
const shiftDisplay = document.getElementById('shiftDisplay');

slider.addEventListener('input', (e)=>{
    numberInput.value = e.target.value;
    shiftDisplay.textContent = e.targe.value;
});
numberInput.addEventListener('input', (e)=>{
   let val = parseInt(e.target.value) || 1;
   if (val < 1) val = 1;
   if (val > 25) val = 25;
   numberInput.value = val;
   slider.value = val
   shiftDisplay.textContent = val;
});
function encrypt(){
    const text = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shiftNumber').value);
    const output = document.getElementById('output');
    if (!text.trim()){
        output.textContent = 'Please enter a message to encrypt';
        output.classList.add('empty');
        return;
    }
    let result = '';
    for (let i = 0; i < text.length; i ++) {
        let char = text[i]
        if (char.match(/[a-z]/i)){
            const code = text.charCodeAt(i);
            if (code >= 65 && code <= 90){
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        result += char
    }
    output.textContent = result;
    output.classList.remove('empty');
}
document.getElementById('inputText').addEventListener('keypress', (e)=>{
    if (e.key === 'Enter' && e.ctrlKey){
        encrypt();
    }
});