 
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/bi_x-octagon.png';
import iconX from '../img/bi_x-lg.png';


let userSelectedDate;
const startBtn = document.querySelector('button[data-start]');
const timePicker = document.querySelector('#datetime-picker');

startBtn.disabled = true;
timePicker.disabled = false;
 
flatpickr("#datetime-picker", { 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);
      if (userSelectedDate < new Date()){
        startBtn.setAttribute('disabled', true);
        iziToast.show({
            message:`Please choose a date in the future`,
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
    } else { startBtn.removeAttribute('disabled');
    }
    },
});


class Timer {
    constructor(tick){
        this.tick = tick;
        this.isActive = false;
    }
  start() { 
    if(this.isActive)return;
    this.isActive = true;
    this.intervalId = setInterval(()=>{
        const current = new Date ();
        const diff = userSelectedDate - current;
        if (diff <= 0) {
            this.stop();
            return;
        }
        const timeObj = this.#convertMs(diff);
        this.tick(timeObj)
    }, 1000);

  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
}
  
  #convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

}


const timer = new Timer(tick);

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  timePicker.disabled = true;
});

 

function tick({ days, hours, minutes, seconds }){
        updateElementValue('days', days);
        updateElementValue('hours', hours);
        updateElementValue('minutes', minutes);
        updateElementValue('seconds', seconds);
      }

function updateElementValue(dataAttribute, value) {
        const element = document.querySelector(`[data-${dataAttribute}]`);
        element.textContent = addLeadingZero(value);
      }
      
function addLeadingZero(value) {
    return value.toString().padStart(2,'0');
}
 
 
 


 