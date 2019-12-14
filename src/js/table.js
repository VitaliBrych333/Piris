window.onload = function() {
  alert()
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

      document.write("<table border==\"1\"><tr>");

      head.forEach(item => {
        document.write('<td>' + item + '</td>');
      })
      
      document.write("</tr>");
      for (var i = 0; i < data.length; i++) {
        document.write('<tr>');
        for (key in data[i]) {
          if (key !== '__v') {
            document.write('<td>' + data[i][key] + '</td>');
          }          
        }
        document.write('<td>' + `<a id=${data[i]['_id']} href='/details'>Edit</a>` + '</td>');
        document.write('<td>' + `<a href=''>Delete</a>` + '</td>');
        document.write('</tr>');
      }
      document.write("</table>");
    }
  })  
};
