
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formElem = document.querySelector('.form');

formElem.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
    e.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]')
    const stateInput = document.querySelector('input[name="state"]:checked');
     
    const delay = delayInput.value;
    const state = stateInput.value;

    
    const promise = new Promise((resolve, reject)  => {
        setTimeout (()=>{  
            if(state === 'fulfilled') {resolve (delay)
            } else { reject(delay)}
        }, delay)

    })

    promise.then(result => {
        iziToast.show({
            message:`✅ Fulfilled promise in ${delay}ms`,
            backgroundColor: '#59A10D',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
            maxWidth: '383px',
            titleLineHeight: '1.5',
        });
    })
        .catch(err => {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
            maxWidth: '302px',
            titleLineHeight: '1.5',
        });
    });
}  
    