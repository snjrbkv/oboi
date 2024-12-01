function formatPhone(input) {
  let value = input.value.replace(/\D/g, ""); // Убираем всё, кроме цифр
  let formatted = "+7 (";
  if (value.length > 1) formatted += value.slice(1, 4);
  if (value.length > 4) formatted += ") " + value.slice(4, 7);
  if (value.length > 7) formatted += "-" + value.slice(7, 9);
  if (value.length > 9) formatted += "-" + value.slice(9, 11);
  input.value = formatted;
}
// Инициализация EmailJS с вашим Public Key
(function () {
  emailjs.init("91aW48iwi13jG7p45"); // Замените на ваш Public Key
})();

// Функция для отправки данных формы
async function sendForm(event) {
  event.preventDefault(); // Остановить стандартное поведение формы

  const phoneInput = document.querySelector(".hero-form__num-input").value;

  if (!phoneInput.trim()) {
    alert("Пожалуйста, введите номер телефона!");
    return;
  }

  try {
    // Отправка данных через EmailJS
    const response = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      user_phone: phoneInput,
    });
    alert("Ваше сообщение успешно отправлено!");
  } catch (error) {
    alert("Ошибка при отправке сообщения: " + error.text);
  }
}

// Подключение функции отправки к форме
document.getElementById("contactForm").addEventListener("submit", sendForm);
