/**
 * @type {Array<Object>}
 */
const clothingItems = [];

const clothingForm = /** @type {HTMLFormElement} */ (
	document.getElementById("clothingForm")
);

const itemName = /** @type {HTMLInputElement} */ (
	document.getElementById("itemName")
);
const category = /** @type {HTMLSelectElement} */ (
	document.getElementById("category")
);
const size = /** @type {HTMLSelectElement} */ (document.getElementById("size"));

const color = /** @type {HTMLInputElement} */ (
	document.getElementById("color")
);

const price = /** @type {HTMLInputElement} */ (
	document.getElementById("price")
);

const quantity = /** @type {HTMLInputElement} */ (
	document.getElementById("quantity")
);

const description = /** @type {HTMLTextAreaElement} */ (
	document.getElementById("description")
);

/**
 * @type {Object<string, {required: boolean, validate: function(string): boolean, errorMessage: string}>}
 */
const validationRules = {
	itemName: {
		required: true,
		validate: (value) => value.trim() !== "",
		errorMessage: "Назва предмета є обов'язковою.",
	},
	category: {
		required: true,
		validate: (value) => value !== "",
		errorMessage: "Виберіть категорію.",
	},
	size: {
		required: true,
		validate: (value) => value !== "",
		errorMessage: "Виберіть розмір.",
	},
	color: {
		required: true,
		validate: (value) => value.trim() !== "",
		errorMessage: "Введіть колір.",
	},
	price: {
		required: true,
		validate: (value) =>
			value !== "" && !isNaN(parseFloat(value)) && parseFloat(value) >= 0,
		errorMessage: "Введіть коректну ціну.",
	},
	quantity: {
		required: true,
		validate: (value) =>
			value !== "" && Number.isInteger(parseInt(value)) && parseInt(value) >= 0,
		errorMessage: "Введіть коректну кількість.",
	},
};

/**
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field
 */
function validateField(field) {
	const fieldName = field.name;
	const rule = validationRules[fieldName];
	if (!rule) return true;

	const isValid = rule.validate(field.value);
	const formGroup = /** @type {HTMLElement} */ (field.closest(".form-group"));
	const errorMessageElement = /** @type {HTMLElement} */ (
		formGroup.querySelector(".error-message")
	);

	if (!isValid) {
		formGroup.classList.add("invalid");
		errorMessageElement.textContent = rule.errorMessage;
	} else {
		formGroup.classList.remove("invalid");
		errorMessageElement.textContent = "";
	}

	return isValid;
}

for (const fieldName in validationRules) {
	const field =
		/** @type {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} */ (
			clothingForm.elements.namedItem(fieldName)
		);
	field.addEventListener("input", () => validateField(field));
}

clothingForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let isFormValid = true;

	for (const fieldName in validationRules) {
		const field =
			/** @type {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} */ (
				clothingForm.elements.namedItem(fieldName)
			);
		const isValid = validateField(field);
		if (!isValid) {
			isFormValid = false;
		}
	}

	if (isFormValid) {
		sendConsoleReply();

		clothingForm.reset();
	} else {
		const firstInvalidField = /** @type {HTMLElement} */ (
			clothingForm.querySelector(
				".invalid input, .invalid select, .invalid textarea",
			)
		);
		if (firstInvalidField) {
			firstInvalidField.focus();
		}
	}
});

function sendConsoleReply() {
	const clothingItem = {
		itemName: itemName.value.trim(),
		category: category.value,
		size: size.value,
		color: color.value.trim(),
		price: parseFloat(price.value),
		quantity: parseInt(quantity.value),
		description: description.value.trim(),
	};

	clothingItems.push(clothingItem);

	console.log(JSON.stringify(clothingItems, null, 2));

	alert("Форма успішно відправлена!");
}
