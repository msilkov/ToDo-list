// Получаем искомую форму по id
var form = document.getElementById("addForm");
// получаем ul по id
var itemsList = document.getElementById("items");
// получаем поле ввода с поиском по id
var filter = document.getElementById("filter");

// прослушка по форме и вызов функции
form.addEventListener("submit", addItem);
// просшулка по списку и удаление задачи
itemsList.addEventListener("click", removeItem);
// прослушка поиска и фильтер
filter.addEventListener("keyup", filterItems);

// функция фильтра
function filterItems(e) {
  // получаем текст из поиска и переводим его в нижний регистр
  var searchedText = e.target.value.toLowerCase();
  // получаем все задачи
  var items = itemsList.querySelectorAll("li");
  // перебираем все задачи церез цикл
  items.forEach(function (item) {
    // получаем текст задачи из всего списка и переводим его в нижний регистр
    var itemText = item.firstChild.textContent.toLocaleLowerCase();
    // проверяем вхождение строки из поиска в задаче
    if (itemText.indexOf(searchedText) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
function addItem(e) {
  // отмена отправки формы по дефолту
  e.preventDefault();
  // получаем поле ввода задачи по id
  var newItemInput = document.getElementById("newItemText");
  // объявляем переменную со значением переданным в поле ввода задачи
  var newItemText = newItemInput.value;
  // задаем условие добавления новой задачи
  if (newItemText == "") {
    alert("Пустая строка");
    return;
  } else {
    var newElement = document.createElement("li");
  }
  // добавляем новому li имя класса как у всех
  newElement.className = "list-group-item";
  // создаем текстовую ноду в номом элементе li
  var newTextNode = document.createTextNode(newItemText);
  newElement.appendChild(newTextNode);
  // создаем и добавляем кнопку удалить в новый элемент li
  var deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  deleteBtn.className = "btn btn-light btn-sm float-right";
  deleteBtn.dataset.action = "delete";
  newElement.appendChild(deleteBtn);
  // добавление новой задачи li в начало списка со всеми задачами
  itemsList.prepend(newElement);
  // очищаем поле ввода новой задачи
  newItemInput.value = "";
}
function removeItem(e) {
  // проверяем есть ли значение и чему оно равно
  if (
    e.target.hasAttribute("data-action") &&
    e.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      // удаляем задачу через обращние к родителю
      e.target.parentNode.remove();
    }
  }
}
