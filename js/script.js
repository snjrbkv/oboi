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
  const phoneInput = document.querySelector(".hero-form__num-input").value;
  event.preventDefault();
  if (!phoneInput.trim() || phoneInput.length < 18) {
    alert("Введите корректный номер телефона!");
    return;
  }

  try {
    const response = await emailjs.send("service_87ptpxi", "template_2m0exo2", {
      to_name: "Команда",
      from_name: "Клиент",
      message: `Номер телефона: ${phoneInput}`,
    });
    alert("Сообщение успешно отправлено!");
    phoneInput.value = "";
  } catch (error) {
    alert("Ошибка при отправке сообщения: " + error.text);
  }
}

document.getElementById("contactForm").addEventListener("submit", sendForm);
function openModal() {
  document.body.classList.toggle("gallery-active");
}
