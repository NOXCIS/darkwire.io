import beepFile from '@/audio/beep.mp3';



export const notify = (title, content = '') => {
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

if (isIOS) {
    console.log('Notifications not supported on iOS');
    return;
  }


  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return;
  } 
};

let theBeep;

export const beep = {
  async play() {
    if (window.Audio) {
      if (theBeep === undefined) {
        theBeep = new window.Audio(beepFile);
      }
      try {
        await theBeep.play();
      } catch (e) {
        console.log("Can't play sound.");
      }
    }
  },
};

export default { notify, beep };
