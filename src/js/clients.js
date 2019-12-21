window.onload = function() {
  async function getRecords() {
      const request = await fetch('/records');
      return await request.json();
  }

  getRecords().then(data => {
    if (data.length) {
     
      data = data.sort(function (a, b) {
        if (a.family > b.family) {
          return 1;
        }
        if (a.family < b.family) {
          return -1;
        }
        return 0;
      });

      const head = ['id', 'Фамилия', 'Имя', 'Отчество', 'Редактирование', 'Удаление'];

      document.write("<table border==\"2\" style='border: 2px solid black; border-collapse: collapse; background: aqua'><tr>");

      head.forEach((item, index) => {
        if (index < 6) {
          document.write('<td style="font-size: 20px;">' + item + '</td>');
        }        
      })
      
      document.write("</tr>");
      for (var i = 0; i < data.length; i++) {
        document.write('<tr>');
        for (key in data[i]) {
          if ((key === '_id') || (key === 'family') || (key === 'name') || (key === 'secondName')) {
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
              </div>
              <button type="submit">Save</button>
            </form>          
          `

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

            if (arrayField.length) {
              alert(`Заполните поля ${arrayField.join(', ')}`)
              return false
            }
            return true;
          }
    
          function update(e) {

            if (checkValid()) {
              const userData = {
                family: `${document.querySelector('#family').value}`,
                name: `${document.querySelector('#name').value}`,
                secondName: `${document.querySelector('#secondName').value}`,
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
