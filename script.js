/**
 * @type {Array<Object>}
 */
const clothingItems = [];

const clothingForm = /** @type {HTMLFormElement} */ (
	document.getElementById("clothingForm")
);

clothingForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formGroups = document.querySelectorAll(".form-group");

	formGroups.forEach((group) => {
		group.classList.remove("error");

		const errorMessage = /** @type {HTMLElement} */ (
			group.querySelector(".error-message")
		);
		if (errorMessage) {
			errorMessage.textContent = "";
		}
	});

	let isValid = true;

	const itemName = /** @type {HTMLInputElement} */ (
		document.getElementById("itemName")
	);
	const itemNameGroup = itemName.parentElement;
	if (itemName.value.trim() === "") {
		isValid = false;

		const ine = /** @type {HTMLElement} */ (
			document.getElementById("itemNameError")
		);

		ine.textContent = "Назва предмета є обов'язковою.";
		itemNameGroup?.classList.add("error");
	}

	const category = /** @type {HTMLInputElement} */ (
		document.getElementById("category")
	);
	const categoryGroup = category.parentElement;
	if (category.value === "") {
		isValid = false;

		const ce = /** @type {HTMLElement} */ (
			document.getElementById("categoryError")
		);

		ce.textContent = "Категорія є обов'язковою.";
		categoryGroup?.classList.add("error");
	}

	const size = /** @type {HTMLInputElement} */ (
		document.getElementById("size")
	);
	const sizeGroup = size.parentElement;
	if (size.value === "") {
		isValid = false;

		const se = /** @type {HTMLElement} */ (
			document.getElementById("sizeError")
		);

		se.textContent = "Розмір є обов'язковим.";
		sizeGroup?.classList.add("error");
	}

	const color = /** @type {HTMLInputElement} */ (
		document.getElementById("color")
	);
	const colorGroup = color.parentElement;
	if (color.value.trim() === "") {
		isValid = false;

		const ce = /** @type {HTMLElement} */ (
			document.getElementById("colorError")
		);

		ce.textContent = "Колір є обов'язковим.";
		colorGroup?.classList.add("error");
	}

	const price = /** @type {HTMLInputElement} */ (
		document.getElementById("price")
	);
	const priceGroup = price.parentElement;
	if (price.value === "" || parseFloat(price.value) < 0) {
		isValid = false;

		const pe = /** @type {HTMLElement} */ (
			document.getElementById("priceError")
		);

		pe.textContent = "Необхідно ввести дійсну ціну.";
		priceGroup?.classList.add("error");
	}

	const quantity = /** @type {HTMLInputElement} */ (
		document.getElementById("quantity")
	);
	const quantityGroup = quantity.parentElement;
	if (quantity.value === "" || parseInt(quantity.value) < 0) {
		isValid = false;

		const qe = /** @type {HTMLElement} */ (
			document.getElementById("quantityError")
		);

		qe.textContent = "Необхідно ввести дійсну кількість.";
		quantityGroup?.classList.add("error");
	}

	if (isValid) {
		const desc = /** @type {HTMLInputElement} */ (
			document.getElementById("description")
		);

		const clothingItem = {
			itemName: itemName.value.trim(),
			category: category.value,
			size: size.value,
			color: color.value.trim(),
			price: parseFloat(price.value),
			quantity: parseInt(quantity.value),
			description: desc.value.trim(),
		};

		clothingItems.push(clothingItem);

		console.log(JSON.stringify(clothingItems, null, 2));

		alert("Форма успішно відправлена!");

		clothingForm.reset();
	}
});
