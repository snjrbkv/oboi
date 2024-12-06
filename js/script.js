const images = [
  "images/portfolio/photo.jpeg",
  "images/portfolio/2024-11-13 11.47.27.jpg",
  "images/portfolio/2024-11-13 11.47.49.jpg",
  "images/portfolio/2024-11-13 11.48.17.jpg",
  "images/portfolio/2024-11-13 11.48.21.jpg",
  "images/portfolio/2024-11-13 11.48.27.jpg",
  "images/portfolio/2024-11-13 11.48.31.jpg",
  "images/portfolio/2024-11-13 11.48.38.jpg",
  "images/portfolio/2024-11-13 11.48.46.jpg",
  "images/portfolio/2024-11-13 11.49.04.jpg",
  "images/portfolio/2024-11-13 11.49.17.jpg",
  "images/portfolio/2024-11-13 11.49.42.jpg",
  "images/portfolio/photo_2024-11-30 16.12.19.jpeg",
  "images/portfolio/photo_2024-11-30 16.12.50.jpeg",
  "images/portfolio/photo_2024-11-30 16.12.55.jpeg",
  "images/portfolio/photo_2024-11-30 16.13.03.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.33.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.38.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.42.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.44.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.45.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.46.jpeg",
  "images/portfolio/photo_2024-12-04 09.53.54.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.06.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.11.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.16.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.18.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.21.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.24.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.27.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.29.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.31.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.33.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.35.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.37.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.39.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.44.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.48.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.50.jpeg",
  "images/portfolio/photo_2024-12-04 09.54.53.jpeg",
];

function formatPhone(input) {
  let value = input.value.replace(/\D/g, "");
  let formatted = "+7 (";
  if (value.length > 1) formatted += value.slice(1, 4);
  if (value.length > 4) formatted += ") " + value.slice(4, 7);
  if (value.length > 7) formatted += "-" + value.slice(7, 9);
  if (value.length > 9) formatted += "-" + value.slice(9, 11);
  input.value = formatted;
}
(function () {
  emailjs.init("0-4Y8Yo73zzKWb15U");
})();

async function sendForm(event) {
  event.preventDefault();

  const form = event.target;
  const phoneInput = form.querySelector(".hero-form__num-input");

  if (!phoneInput.value.trim() || phoneInput.value.length < 18) {
    alert("Введите корректный номер телефона!");
    return;
  }

  try {
    const response = await emailjs.send("service_87ptpxi", "template_2m0exo2", {
      to_name: "Команда",
      from_name: "Клиент",
      message: `Номер телефона: ${phoneInput.value}`,
    });
    alert("Сообщение успешно отправлено!");
    phoneInput.value = "";
  } catch (error) {
    alert("Ошибка при отправке сообщения: " + error.text);
  }
}

// Привязка обработчика события ко всем формам
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", sendForm);
});

let currentIndex = 0;

const currentImage = document.getElementById("current-image");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateImage(index) {
  // Убираем класс active, чтобы начать исчезновение
  currentImage.classList.remove("active");

  // Делаем паузу перед сменой src для завершения анимации
  setTimeout(() => {
    // Меняем src на новое изображение
    currentImage.src = images[index];

    // Ждем загрузки нового изображения
    currentImage.onload = () => {
      // Добавляем класс active для появления изображения
      currentImage.classList.add("active");
    };
  }, 200); // Время должно совпадать с transition в CSS

  // Обновляем состояние кнопок
  prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
  nextBtn.style.visibility = index === images.length - 1 ? "hidden" : "visible";
}

// Инициализация первого изображения
currentImage.src = images[currentIndex];
currentImage.onload = () => currentImage.classList.add("active");
prevBtn.style.visibility = "hidden"; // Скрываем кнопку "Назад" при загрузке первого изображения

// Обработчики для кнопок
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImage(currentIndex);
  }
});
