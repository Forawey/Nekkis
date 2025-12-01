// Функция переключения вкладок
function switchTab(tabName) {
	// Убираем активный класс у всех кнопок
	const tabBtns = document.querySelectorAll(".tab-btn");
	tabBtns.forEach((btn) => {
		btn.classList.remove("active");
	});

	// Добавляем активный класс текущей кнопке
	event.target.classList.add("active");

	// Скрываем все формы
	const forms = document.querySelectorAll(".form-box");
	forms.forEach((form) => {
		form.classList.remove("active");
	});

	// Показываем выбранную форму
	document.getElementById(`${tabName}-form`).classList.add("active");

	// Очищаем ошибки
	clearAllErrors();
}

// Функция показа/скрытия пароля
function togglePassword(inputId) {
	const input = document.getElementById(inputId);
	const button = input.nextElementSibling;

	if (input.type === "password") {
		input.type = "text";
		button.textContent = "👁️‍🗨️";
	} else {
		input.type = "password";
		button.textContent = "👁️";
	}
}

// Простая валидация формы входа
function validateLogin(event) {
	event.preventDefault();
	clearAllErrors();

	let isValid = true;
	const email = document.getElementById("login-email").value.trim();
	const password = document.getElementById("login-password").value;

	// Проверка логина/email
	if (!email) {
		showError("login-email-error", "Введите логин или email");
		markInputError("login-email");
		isValid = false;
	}

	// Проверка пароля
	if (!password) {
		showError("login-password-error", "Введите пароль");
		markInputError("login-password");
		isValid = false;
	}

	if (isValid) {
		alert("Вход выполнен успешно! Добро пожаловать в Nekkis!");
		window.location.href = "index.html";
	}

	return false;
}

// Простая валидация формы регистрации
function validateRegister(event) {
	event.preventDefault();
	clearAllErrors();

	let isValid = true;

	// Получаем значения полей
	const username = document.getElementById("reg-username").value.trim();
	const email = document.getElementById("reg-email").value.trim();
	const password = document.getElementById("reg-password").value;
	const confirmPassword = document.getElementById(
		"reg-confirm-password"
	).value;
	const city = document.getElementById("reg-city").value;
	const gender = document.querySelector('input[name="gender"]:checked');

	// Проверка имени пользователя
	if (!username) {
		showError("reg-username-error", "Введите имя пользователя");
		markInputError("reg-username");
		isValid = false;
	}

	// Проверка email
	if (!email) {
		showError("reg-email-error", "Введите email");
		markInputError("reg-email");
		isValid = false;
	} else if (!email.includes("@")) {
		showError("reg-email-error", "Введите корректный email");
		markInputError("reg-email");
		isValid = false;
	}

	// Проверка пароля
	if (!password) {
		showError("reg-password-error", "Введите пароль");
		markInputError("reg-password");
		isValid = false;
	} else if (password.length < 4) {
		showError("reg-password-error", "Пароль слишком короткий");
		markInputError("reg-password");
		isValid = false;
	}

	// Подтверждение пароля
	if (password !== confirmPassword) {
		showError("reg-confirm-password-error", "Пароли не совпадают");
		markInputError("reg-confirm-password");
		isValid = false;
	}

	// Проверка города
	if (!city) {
		showError("reg-city-error", "Выберите город");
		markInputError("reg-city");
		isValid = false;
	}

	// Проверка пола
	if (!gender) {
		showError("gender-error", "Выберите пол");
		isValid = false;
	}

	if (isValid) {
		alert("Регистрация успешно завершена! Теперь вы можете войти.");
		switchTab("login");
		clearRegisterForm();
	}

	return false;
}

// Очистка формы регистрации после успешной регистрации
function clearRegisterForm() {
	document.getElementById("reg-username").value = "";
	document.getElementById("reg-email").value = "";
	document.getElementById("reg-password").value = "";
	document.getElementById("reg-confirm-password").value = "";
	document.getElementById("reg-city").value = "";
	document.querySelectorAll('input[name="gender"]').forEach((radio) => {
		radio.checked = false;
	});
}

// Функции для работы с ошибками
function showError(elementId, message) {
	const errorElement = document.getElementById(elementId);
	if (errorElement) {
		errorElement.textContent = message;
	}
}

function markInputError(inputId) {
	const input = document.getElementById(inputId);
	if (input) {
		input.classList.add("input-error");
	}
}

function clearAllErrors() {
	// Очищаем сообщения об ошибках
	const errorMessages = document.querySelectorAll(".error-message");
	errorMessages.forEach((error) => {
		error.textContent = "";
	});

	// Убираем классы ошибок у полей ввода
	const errorInputs = document.querySelectorAll(".input-error");
	errorInputs.forEach((input) => {
		input.classList.remove("input-error");
	});
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
	// Проверяем хеш в URL для автоматического переключения вкладок
	if (window.location.hash === "#register") {
		// Находим кнопку регистрации и кликаем на нее
		const registerBtn = document.querySelector(".tab-btn:nth-child(2)");
		if (registerBtn) {
			registerBtn.click();
		}
	}

	// Убираем ошибки при вводе
	const forms = [
		document.getElementById("loginForm"),
		document.getElementById("registerForm"),
	];

	forms.forEach((form) => {
		if (form) {
			form.addEventListener("input", function (e) {
				if (e.target.classList.contains("input-error")) {
					e.target.classList.remove("input-error");
					const errorId = e.target.id + "-error";
					const errorElement = document.getElementById(errorId);
					if (errorElement) {
						errorElement.textContent = "";
					}
				}
			});
		}
	});
});
