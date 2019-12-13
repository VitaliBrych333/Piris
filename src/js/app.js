// import 'babel-polyfill';
function checkValid() {
  let arrayField = [];

  document.querySelectorAll('input').forEach(item => {          
    if (item.required && !item.value) {
      const nameValue = item.previousSibling.previousElementSibling.innerText;
      arrayField.push(nameValue)
    }
  });

  document.querySelectorAll('select').forEach(item => {          
    if (item.required && !item.value) {
      const nameValue = item.previousSibling.previousElementSibling.innerText;
      arrayField.push(nameValue)
    }
  });

  let retiree = document.querySelectorAll('#retiree');
  
  if (retiree[0].checked && retiree[1].checked) {
    alert('Выберете одно значение в поле Пенсионер');
    return false;
  } else if ((!retiree[0].checked && !retiree[1].checked)) {
    arrayField.push('Пенсионер');
  }  
  
  if (arrayField.length) {
    alert(`Заполните поля ${arrayField.join(', ')}`)
    return false
  }

  return true;
}

window.onload = function() {
  alert('Страница загружена'); 

  async function getRecords() {

    if (checkValid()) {

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
    
  }

  document.querySelector("button[type='submit']").addEventListener('click', getRecords);  
};
