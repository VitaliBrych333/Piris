window.onload = function() {
  async function getRecords() {
      const request = await fetch('/records');
      return await request.json();
  }

  getRecords().then(data => {
    if (data.length) {
      data.forEach(element => {
        element.dateBorn = element.dateBorn.slice(0, 10);
        element.dateDone = element.dateDone.slice(0, 10);
      });
      
      const head = ['id', 'Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Серия паспорта','№ паспорта',
      'Кем выдан', 'Дата выдачи', 'Идентификационный номер', 'Место рождения',
      'Город фактического проживания', 'Адрес фактического проживания', 'Телефон домашний',
      'Телефон мобильный', 'Email', 'Mecто работы', 'Должность', 'Город прописки',
      'Семейное положение', 'Гражданство', 'Инвалидность', 'Пенсионер', 'Ежемесячный доход','Редактирование', 'Удаление'];

      document.write("<table border==\"2\" style='border: 2px solid black; border-collapse: collapse; background: aqua'><tr>");

      head.forEach(item => {
        document.write('<td style="font-size: 20px;">' + item + '</td>');
      })
      
      document.write("</tr>");
      for (var i = 0; i < data.length; i++) {
        document.write('<tr>');
        for (key in data[i]) {
          if (key !== '__v') {
            document.write('<td style="color: blue;">' + data[i][key] + '</td>');
          }          
        }
        document.write('<td>' + `<a id=${data[i]['_id']} class="edit">Edit</a>` + '</td>');
        document.write('<td>' + `<a id=${data[i]['_id']} class="delete">Delete</a>` + '</td>');
        document.write('</tr>');
      }
      document.write("</table>");
      document.head.innerHTML = '<link href="../style/table.css" rel="stylesheet">'

      async function deleteRecord(id) {
        return await fetch(`/records/${id}`, {
          method: 'delete',
              headers: {
                    'content-type': 'application/json',
              },
        }).then(function (response) {  
          return response.json();
        })
      }

      function del(e) {
        const elem = e.currentTarget.id;
        deleteRecord(elem).then((res) => {
          document.location.reload(true);
        }).catch((err) => {
          document.location.reload(true);
        })
      }

      document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', del)
      })

      async function editRecord(id) {
        return await fetch(`/records/${id}`, {
          method: 'get',
              headers: {
                    'content-type': 'application/json',
              },
        }).then(function (response) {  
          return response.json();
        })
      }

      function edit(e) {
        const elem = e.currentTarget.id;
        editRecord(elem).then((data) => {

          document.body.innerHTML = `
            <h1>Форма для банка</h1>
            <form>
              <div>
                  <p>Фамилия</p>:
                  <input type="text" id="family" value="${data.family}" required>
                  <p>Имя</p>:
                  <input type="text" id="name" value="${data.name}" required>
                  <p>Отчество</p>:
                  <input type="text" id="secondName" value="${data.secondName}" required>
                  <p>Дата рождения</p>:
                  <input type="date" id="dateBorn" value="${data.dateBorn.slice(0, 10)}" required>
              </div>
              <div>
                  <p>Серия паспорта</p>:
                  <input type="text" id="seriaPasp" value="${data.seriaPasp}" required>
                  <p>№ паспорта</p>:
                  <input type="number" id="numPasp" value="${data.numPasp}" required>
                  <p>Кем выдан</p>:
                  <input type="text" id="whoDone" value="${data.whoDone}" required>
                  <p>Дата выдачи</p>:
                  <input type="date" id="dateDone" value="${data.dateDone.slice(0, 10)}" required>
                  <p>Идентификационный номер</p>:
                  <input type="text" id="idPasp" value="${data.idPasp}" required>
              </div>
              <div>
                  <p>Место рождения</p>:
                  <input type="text" id="placeBorn" value="${data.placeBorn}" required>
                  <p>Город фактического проживания</p>:
                  <select id="city" value="${data.city}" required>
                    <option></option>
                    <option>Минск</option>
                    <option>Брест</option>
                    <option>Гродно</option>
                    <option>Гомель</option>
                    <option>Витебск</option>
                  </select>      
                  <p>Адрес фактического проживания</p>:
                  <input type="text" id="adress" value="${data.adress}" required>
                  <p>Телефон домашний</p>:
                  <input type="tel" value="${data.telHouse}" id="telHouse">
                  <p>Телефон мобильный</p>:
                  <input type="tel" value="${data.telMob}" id="telMob">
                  <p>Email</p>:
                  <input type="email" value="${data.email}" id="email">
              </div>
              <div>
                  <p>Mecто работы</p>:
                  <input type="text" value="${data.placeWork}" id="placeWork">
                  <p>Должность</p>:
                  <input type="text" value="${data.position}" id="position">
                  <p>Город прописки</p>:
                  <select id="cityReg" value="${data.cityReg}" required>
                    <option></option>
                    <option>Минск</option>
                    <option>Брест</option>
                    <option>Гродно</option>
                    <option>Гомель</option>
                    <option>Витебск</option>
                  </select>

                  <p>Семейное положение</p>:
                  <select id="statusFam" value="${data.statusFam}" required>
                    <option></option>
                    <option>Холост(Не замужем)</option>
                    <option>Женат(Замужем)</option>
                    <option>Разведен(а)</option>
                  </select>

                  <p>Гражданство</p>:
                  <select id="national" value="${data.national}" required>
                    <option></option>
                    <option>Беларусь</option>
                    <option>Польша</option>
                    <option>Украина</option>
                  </select>

                  <p>Инвалидность</p>:
                  <select id="inval" value="${data.inval}" required>
                    <option></option>
                    <option>Нет</option>
                    <option>Да</option>
                  </select>

                  <p>Пенсионер</p>:
                  <div>
                    <input id="retiree" type="checkbox" value="Нет" name="">Нет<br>
                    <input id="retiree" type="checkbox" value="Да" name="">Да<br>
                  </div>

                  <p>Ежемесячный доход</p>:
                  <input type="number" id="sum" min="0.00" max="any" value="${data.sum}" step="0.01">
              </div>
              <button type="submit">Save</button>
            </form>          
          `
          document.querySelectorAll('#city > option').forEach(item => {
            if(item.value === data.city) {
              item.selected = true;
            }
          })

          document.querySelectorAll('#cityReg > option').forEach(item => {
            if(item.value === data.cityReg) {
              item.selected = true;
            }
          })

          document.querySelectorAll('#statusFam > option').forEach(item => {
            if(item.value === data.statusFam) {
              item.selected = true;
            }
          })

          document.querySelectorAll('#national > option').forEach(item => {
            if(item.value === data.national) {
              item.selected = true;
            }
          })

          document.querySelectorAll('#inval > option').forEach(item => {
            if(item.value === data.inval) {
              item.selected = true;
            }
          })

          document.querySelectorAll('#retiree').forEach(item => {
            if (item.value === data.retiree) {
              item.checked = true;
            }
          })

          document.head.innerHTML = '<link href="../style/style.css" rel="stylesheet">';

          async function updateRecord(id, body) {
            return await fetch(`/records/${id}/update`, {
              method: 'put',
                  headers: {
                        'content-type': 'application/json',
                  },
                  body
            }).then(function (response) {  
              return response.json();
            })
          }

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
    
          function update(e) {

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
        
              const body = JSON.stringify(userData);
              updateRecord(data._id, body).then(() => {
                document.location.reload(true);
              })
            } else {
              e.preventDefault();
            }
          }


          document.querySelector('button').addEventListener('click', update);
        })
      }

      document.querySelectorAll('.edit').forEach(item => {
        item.addEventListener('click', edit)
      })
    }
  })
};
