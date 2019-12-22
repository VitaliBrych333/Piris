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

window.onload = async function() {
  // alert('Страница загружена'); 
  async function records() {
    const request = await fetch('/records');
    return await request.json();
  }

  let data = await records()
  console.log('dddd', `${data[1].family}`.toLowerCase());
   
  async function getRecords(e) {

    if (checkValid()) {
      let valueRet;
      document.querySelectorAll('#retiree').forEach(item => {
        if (item.checked) {
          valueRet = item.value;
        }
      })
      
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
        retiree: valueRet,
        sum: `${document.querySelector('#sum').value}`,
      };

      function checkData(data, userData) {
        let count = 0;
        data.forEach((item, index) => {
          console.log('fff', `${data[index].name}`.toLowerCase() === userData.name.toLowerCase())
          if ((`${data[index].name}`.toLowerCase() === userData.name.toLowerCase())
                && (`${data[index].family}`.toLowerCase() === userData.family.toLowerCase())
                && (`${data[index].secondName}`.toLowerCase() === userData.secondName.toLowerCase())
              ) {
                  count = 1;

                } else if (`${data[index].seriaPasp}`.toLowerCase() === userData.seriaPasp.toLowerCase()) {
                  count = 2;
            
                } else if(`${data[index].idPasp}`.toLowerCase() === userData.idPasp.toLowerCase()) {
                  count = 3;
            
                } else if(/[0-9]/.test(userData.family)) {
                  count = 4;
            
                } else if (!userData.family.trim()) {
                  console.log('ddddddddd', userData.family.trim(), !userData.family.trim())
                  count = 5
                } 
        })
       
        if (count) {
          switch(count) {
            case 1:
              alert('Пользователь уже существует!!!');
              break;
            case 2:
              alert('Серия паспорта уже существует!!!');
              break;
            case 3:
              alert('Идентификационный номер уже существует!!!');
              break;
            case 4:
              alert('Фамилия не должна быть с цифрами!!!');
              break;
            case 5:
              alert('Фамилия не должна быть пустой или содержать только пробел!!!');
              break;
            default:
              break;
          }
          return false
        } else {
          return true;
        }
      }

      if (checkData(data, userData)) {
          const body = JSON.stringify(userData);

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

      } else {
        e.preventDefault();
      }

      
    } else {
      e.preventDefault();
    }
  }

  document.querySelector("button[type='submit']").addEventListener('click', getRecords);
}
  




// return getRecords().then(dataDB => {
//   console.log('fffffffffffffffff')
//   dataDB.forEach(item => {
//     if ((item.name.toUpperCase() === userData.name.toUppercase())
//          && (item.family.toUpperCase() === userData.family.toUppercase())
//          && (item.secondName.toUpperCase() === user.secondName.toUppercase())
//        ) {
//          alert('Пользователь уже существует!!!')
//          e.preventDefault();
//          return false

//        } else if (item.seriaPasp.toUppercase() === userData.seriaPasp.toUpperCase()) {
//           alert('Серия паспорта уже существует!!!')
//           e.preventDefault();
//           return false;

//        } else if(item.idPasp.toUppercase() === userData.idPasp.toUpperCase()) {
//           alert('Идентификационный номер уже существует!!!')
//           e.preventDefault();
//           return false;

//        } else if(/[0-9]/.test(userData.family)) {
//           alert('Фамилия не должна быть с цифрами!!!')
//           e.preventDefault();
//           return false;

//        } else if (userData.family.trim()) {
//           alert('Фамилия не должна быть пустой или содержать только пробел!!!');
//           e.preventDefault();
//           return false;
//        } 
        
//        return true
//   })
