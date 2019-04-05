document.addEventListener('DOMContentLoaded', function () {
    let name = 'Hello';
    let tabName = name.split('');


    for (let l in tabName) {
        let spanName = document.querySelector('.heading');
        let newSpan = document.createElement('span');
        newSpan.classList.add(`letter-${l}`);
        newSpan.innerText=tabName[l];
        spanName.appendChild(newSpan);
    }

});