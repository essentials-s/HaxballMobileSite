// === Инициализация canvas ===
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

// === Состояния ===
let screen = "main_menu"; // main_menu, room_list, create_room, game
let playerName = "";
let inputActive = false;

// === Интерфейсные кнопки ===
const buttons = {
  joinRoom: { x: 200, y: 160, w: 200, h: 40, text: "Список комнат" },
  exit:     { x: 200, y: 220, w: 200, h: 40, text: "Выход" }
};

// === Обработка мыши ===
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (screen === "main_menu") {
    // Нажатие по полю ввода имени
    if (mx >= 200 && mx <= 400 && my >= 100 && my <= 130) {
      inputActive = true;
    } else {
      inputActive = false;
    }

    // Кнопка "Список комнат"
    if (inButton(mx, my, buttons.joinRoom)) {
      if (playerName.trim() !== "") {
        screen = "room_list";
      } else {
        alert("Введите имя");
      }
    }

    // Кнопка "Выход"
    if (inButton(mx, my, buttons.exit)) {
      alert("Выход из игры");
    }
  }
});

// === Обработка клавиш ===
document.addEventListener("keydown", (e) => {
  if (inputActive) {
    if (e.key.length === 1 && playerName.length < 16) {
      playerName += e.key;
    } else if (e.key === "Backspace") {
      playerName = playerName.slice(0, -1);
    }
  }
});

// === Проверка попадания в кнопку ===
function inButton(mx, my, btn) {
  return mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h;
}

// === Отрисовка ===
function draw() {
  ctx.fillStyle = "#777";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (screen === "main_menu") drawMainMenu();
  if (screen === "room_list") drawRoomList();
}

function drawMainMenu() {
  ctx.fillStyle = "#fff";
  ctx.font = "24px sans-serif";
  ctx.fillText("Введите имя:", 200, 90);

  // Поле ввода
  ctx.fillStyle = inputActive ? "#fff" : "#ccc";
  ctx.fillRect(200, 100, 200, 30);
  ctx.fillStyle = "#000";
  ctx.font = "18px sans-serif";
  ctx.fillText(playerName || "Игрок", 205, 122);

  // Кнопки
  drawButton(buttons.joinRoom);
  drawButton(buttons.exit);
}

function drawRoomList() {
  ctx.fillStyle = "#fff";
  ctx.font = "22px sans-serif";
  ctx.fillText("Список комнат (заглушка)", 180, 50);

  // TODO: добавить кнопки "Поиск", "Обновить", "Запись экрана", "Создать комнату"
}

// Рисование кнопки
function drawButton(btn) {
  ctx.fillStyle = "#333";
  ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
  ctx.fillStyle = "#fff";
  ctx.font = "18px sans-serif";
  ctx.fillText(btn.text, btn.x + 20, btn.y + 26);
}

// === Игровой цикл ===
function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();// === Обновление экрана ===
let rooms = ["Room 1", "Room 2", "Room 3"]; // Пример списка комнат
let newRoomName = "";

const roomButtons = {
  refresh: { x: 20, y: 320, w: 120, h: 40, text: "Обновить" },
  create: { x: 460, y: 320, w: 120, h: 40, text: "Создать комнату" },
  record: { x: 20, y: 370, w: 120, h: 40, text: "Записать экран" },
  search: { x: 200, y: 370, w: 200, h: 40, text: "Поиск комнаты" }
};

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (screen === "room_list") {
    // Кнопка "Обновить"
    if (inButton(mx, my, roomButtons.refresh)) {
      // Симуляция обновления списка комнат
      rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];
      console.log("Обновление списка комнат");
    }

    // Кнопка "Создать комнату"
    if (inButton(mx, my, roomButtons.create)) {
      screen = "create_room";
    }

    // Кнопка "Записать экран"
    if (inButton(mx, my, roomButtons.record)) {
      alert("Запись экрана");
    }

    // Кнопка "Поиск комнаты"
    if (inButton(mx, my, roomButtons.search)) {
      alert("Поиск комнаты");
    }
  }

  // Вход в комнату
  if (screen === "room_list") {
    for (let i = 0; i < rooms.length; i++) {
      if (my >= 80 + i * 40 && my <= 120 + i * 40) {
        alert("Вошли в " + rooms[i]);
      }
    }
  }
});

// === Отрисовка ===
function drawRoomList() {
  ctx.fillStyle = "#fff";
  ctx.font = "22px sans-serif";
  ctx.fillText("Список комнат", 230, 50);

  // Отображаем список комнат
  for (let i = 0; i < rooms.length; i++) {
    ctx.fillText(rooms[i], 200, 80 + i * 40);
  }

  // Рисуем кнопки
  drawButton(roomButtons.refresh);
  drawButton(roomButtons.create);
  drawButton(roomButtons.record);
  drawButton(roomButtons.search);
}

// === Экран создания комнаты ===
const createRoomButtons = {
  back: { x: 20, y: 320, w: 120, h: 40, text: "Назад" },
  create: { x: 460, y: 320, w: 120, h: 40, text: "Создать" }
};

function drawCreateRoom() {
  ctx.fillStyle = "#fff";
  ctx.font = "22px sans-serif";
  ctx.fillText("Создание комнаты", 200, 50);

  // Ввод названия комнаты
  ctx.fillText("Название:", 200, 100);
  ctx.fillStyle = "#ccc";
  ctx.fillRect(200, 110, 200, 30);
  ctx.fillStyle = "#000";
  ctx.fillText(newRoomName, 205, 130);

  // Кнопки
  drawButton(createRoomButtons.back);
  drawButton(createRoomButtons.create);
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (screen === "create_room") {
    if (inButton(mx, my, createRoomButtons.back)) {
      screen = "room_list";
      newRoomName = ""; // Очистить название комнаты
    }

    if (inButton(mx, my, createRoomButtons.create)) {
      if (newRoomName.trim() !== "") {
        rooms.push(newRoomName);
        screen = "room_list";
        newRoomName = "";
        console.log("Комната создана: " + newRoomName);
      } else {
        alert("Введите название комнаты");
      }
    }
  }
});

// === Обработка клавиш ===
document.addEventListener("keydown", (e) => {
  if (screen === "create_room") {
    if (e.key.length === 1 && newRoomName.length < 16) {
      newRoomName += e.key;
    } else if (e.key === "Backspace") {
      newRoomName = newRoomName.slice(0, -1);
    }
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (screen === "main_menu") {
    drawMainMenu();
  }
  if (screen === "room_list") {
    drawRoomList();
  }
  if (screen === "create_room") {
    drawCreateRoom();
  }
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
