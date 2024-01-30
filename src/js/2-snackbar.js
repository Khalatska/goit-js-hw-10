
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconError from '../img/bi_x-octagon.png';
import iconCorrect from '../img/bi_check2-circle.png';
import iconX from '../img/bi_x-lg.png';


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
            message:`Fulfilled promise in ${delay}ms`,
            backgroundColor: '#59A10D',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
            titleLineHeight: '1.5',
            iconUrl: iconCorrect,
            close: false,
            buttons: [
              [
                `<button type="button" style="background-color:#59A10D"><img src=${iconX}></button>`,
                function (instance, toast) {
                  instance.hide({ transitionOut: 'fadeOut' }, toast);
                },
              ],
            ],
        });
    })
        .catch(err => {
        iziToast.show({
            message: `Rejected promise in ${delay}ms`,
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
            titleLineHeight: '1.5',
            iconUrl: iconError,
            close: false,
            buttons: [
              [
                `<button type="button" style="background-color:#EF4040"><img src=${iconX}></button>`,
                function (instance, toast) {
                  instance.hide({ transitionOut: 'fadeOut' }, toast);
                },
              ],
            ],
        });
    });
}  
    