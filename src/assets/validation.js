document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("main-form");
    const clearBtn = form.querySelector(".clear-button");
    const phoneInput = form.querySelector("#phone");
    const honeypot = form.querySelector("#middleName");
    let isSubmitting = false;

    function showError(input, message) {
        input.classList.add("error");
        const errorEl = input.parentElement.querySelector(".error-message");
        if (errorEl) errorEl.textContent = message;
    }

    function clearError(input) {
        input.classList.remove("error");
        const errorEl = input.parentElement.querySelector(".error-message");
        if (errorEl) errorEl.textContent = "";
    }

    function validateName(input) {
        const val = input.value.trim();
        if (val.length < 2) {
            showError(input, "Введите корректное имя (минимум 2 символа).");
            return false;
        }
        clearError(input);
        return true;
    }

    function validatePhone(input) {
        const val = input.value.trim();
        const phonePattern = /^(\+375|\+7|80)\s?\d{2,3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        if (!phonePattern.test(val)) {
            showError(input, "Введите корректный номер (например: +375 33 123-45-67).");
            return false;
        }
        clearError(input);
        return true;
    }

    // Автоформатирование телефона
    phoneInput.addEventListener("input", () => {
        let digits = phoneInput.value.replace(/\D/g, "");
        if (digits.startsWith("375")) {
            digits = digits.substring(3);
            let formatted = "+375";
            if (digits.length > 0) formatted += " " + digits.substring(0, 2);
            if (digits.length > 2) formatted += " " + digits.substring(2, 5);
            if (digits.length > 5) formatted += "-" + digits.substring(5, 7);
            if (digits.length > 7) formatted += "-" + digits.substring(7, 9);
            phoneInput.value = formatted;
        } else if (digits.startsWith("7")) {
            digits = digits.substring(1);
            let formatted = "+7";
            if (digits.length > 0) formatted += " " + digits.substring(0, 3);
            if (digits.length > 3) formatted += " " + digits.substring(3, 6);
            if (digits.length > 6) formatted += "-" + digits.substring(6, 8);
            if (digits.length > 8) formatted += "-" + digits.substring(8, 10);
            phoneInput.value = formatted;
        } else if (digits.startsWith("80")) {
            digits = digits.substring(2);
            let formatted = "80";
            if (digits.length > 0) formatted += " " + digits.substring(0, 2);
            if (digits.length > 2) formatted += " " + digits.substring(2, 5);
            if (digits.length > 5) formatted += "-" + digits.substring(5, 7);
            if (digits.length > 7) formatted += "-" + digits.substring(7, 9);
            phoneInput.value = formatted;
        }
    });

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Валидация и отправка
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (honeypot.value.trim() !== "") return;

        const okName = validateName(form.querySelector("#name"));
        const okPhone = validatePhone(phoneInput);

        if (okName && okPhone) {
            const submitBtn = form.querySelector('button[type="submit"]');
            isSubmitting = true;
            submitBtn.disabled = true;
            submitBtn.textContent = "Отправка...";

            emailjs.sendForm(
                'service_fjuwd2r',
                'template_80t83bb',
                '#main-form'
            )
                .then(() => {
                    form.reset();
                    showToast("Сообщение успешно отправлено!");
                })
                .catch(err => {
                    console.error("Ошибка отправки:", err);
                    showToast("Ошибка при отправке формы");
                })
                .finally(() => {
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Отправить";
                });
            }
    });

    // Очистка
    clearBtn.addEventListener("click", () => {
        form.reset();
        form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        form.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    });

    // Сброс ошибок при вводе
    form.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", () => {
            if (input.value.trim() === "") {
                clearError(input);
            } else if (input.classList.contains("error")) {
                if (input.id === "name") validateName(input);
                if (input.id === "phone") validatePhone(input);
            }
        });
    });
});
