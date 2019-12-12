import 'babel-polyfill';
window.onload = function() {
  alert('Страница загружена');
  
 

  async function getRecords() {

    const userData = {
      family: `${document.querySelector('#family').value}`,
      name: `${document.querySelector('#name').value}`,
      secondName: `${document.querySelector('#secondName').value}`,
      dateBorn: `${document.querySelector('#dateBorn').value}`,
  
      seriaPasp: `${document.querySelector('#seriaPasp').value}`,
      numPasp: `${document.querySelector('#numPasp').value}`,
      whoDone: `${document.querySelector('#whoDone').value}`,
      dateDone: `${document.querySelector('#dateDone').value}`,
      idPasp: `${document.querySelector('#idPasp').value}`,
  
      placeBorn: `${document.querySelector('#placeBorn').value}`,
      city: `${document.querySelector('#city').value}`,
      adress: `${document.querySelector('#adress').value}`,
      telHouse: `${document.querySelector('#telHouse').value}`,
      telMob: `${document.querySelector('#telMob').value}`,
      email: `${document.querySelector('#email').value}`,
  
      placeWork: `${document.querySelector('#placeWork').value}`,
      position: `${document.querySelector('#position').value}`,
      cityReg: `${document.querySelector('#cityReg').value}`,
      statusFam: `${document.querySelector('#statusFam').value}`,
      national: `${document.querySelector('#national').value}`,
      inval: `${document.querySelector('#inval').value}`,
      retiree: `${document.querySelector('#retiree').value}`,
      sum: `${document.querySelector('#sum').value}`,
    };

    const body = JSON.stringify(userData);
  
    console.log('dddddddddddddd', body)

    return await fetch('/records', {
      method: 'post',
            headers: {
                'content-type': 'application/json',
            },
          body,

    }).then(function (response) {
      alert(response.status); 

      return response.json();
  })
  }
  document.querySelector("button[type='submit']").addEventListener('click', getRecords)

  
};
