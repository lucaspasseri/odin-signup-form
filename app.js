const form = document.querySelector("#new-account-form");

console.log({ form });

for (let i = 0; i < form.length - 1; i++) {
	const currInput = form[i];
	currInput.addEventListener("input", validateInput);
}

function validateInput(event) {
	const target = event.target;
	console.log({ target });

	const valid = target.validity.valid;
	const span = target.parentNode.querySelector("span span");

	if (valid) {
		target.className = "valid";
	} else {
		target.className = "invalid";
	}

	span.textContent = target.validationMessage;
}

form.addEventListener("submit", event => {
	const inputs = [];

	for (let i = 0; i < event.target.length - 1; i++) {
		inputs.push(event.target?.[i]);
	}

	const invalidInputs = inputs.filter(input => !input.validity.valid);

	if (invalidInputs.length > 0) {
		event.preventDefault();
		addInvalidateStyles(invalidInputs);
	}
});

function addInvalidateStyles(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		if (i === 0) {
			input.focus();
		}

		input.className = "invalid";
	}
}
