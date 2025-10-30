document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    let isSubmitting = false;
    const qty = params.get('qty');
    if (qty) document.getElementById('qty').value = qty;

    // Метод доставки
    const delivery = params.get('delivery');
    if (delivery) {
        const radio = document.querySelector(`input[name="delivery"][value="${delivery}"]`);
        if (radio) radio.checked = true;
    }

    const form = document.querySelector(".checkout-form");
    const clearBtn = form.querySelector(".clear-button");
    const phoneInput = form.querySelector("#phone");
    const honeypot = form.querySelector("#middleName"); // скрытое поле

    // --- helpers ---
    function showError(input, message) {
        input.classList.add("error");
        let errorEl = input.parentElement.querySelector(".error-message");
        if (!errorEl) {
            errorEl = document.createElement("div");
            errorEl.className = "error-message";
            input.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearError(input) {
        input.classList.remove("error");
        const errorEl = input.parentElement.querySelector(".error-message");
        if (errorEl) errorEl.textContent = "";
    }

    // --- validators ---
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

    function validateQty(input) {
        const val = parseInt(input.value, 10);
        if (isNaN(val) || val < 1) {
            showError(input, "Укажите количество (минимум 1).");
            return false;
        }
        clearError(input);
        return true;
    }

    function validateDelivery() {
        const radios = form.querySelectorAll("input[name='delivery']");
        const checked = Array.from(radios).some(r => r.checked);
        if (!checked) {
            // покажем ошибку на контейнере
            const container = form.querySelector("#toggle");
            showError(container, "Выберите тип доставки.");
            return false;
        }
        clearError(form.querySelector("#toggle"));
        return true;
    }

    // --- автоформат телефона ---
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

    // --- submit ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (honeypot.value.trim() !== "") return; // бот

        const okName = validateName(form.querySelector("#name"));
        const okPhone = validatePhone(phoneInput);
        const okQty = validateQty(form.querySelector("#qty"));
        const okDelivery = validateDelivery();

        if (okName && okPhone && okQty && okDelivery) {
            const submitBtn = form.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.textContent = "Отправка...";

            emailjs.sendForm(
                'service_fjuwd2r',
                'template_3a38onr',
                '#checkout-form'
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

    // --- очистка ---
    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
        form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        form.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    });

    // --- сброс ошибок при вводе ---
    form.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", () => {
            if (input.classList.contains("error")) {
                if (input.id === "name") validateName(input);
                if (input.id === "phone") validatePhone(input);
                if (input.id === "qty") validateQty(input);
            }
        });
    });

    // --- toast ---
    function showToast(message) {
        let toast = document.getElementById("toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.className = "toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
});