const isDirty = {
	"first-name": false,
	"last-name": false,
	email: false,
	"phone-number": false,
	password: false,
	"confirm-password": false,
};

const form = document.querySelector("#new-account-form");

for (let i = 0; i < form.length - 1; i++) {
	const currInput = form[i];
	currInput.addEventListener("input", validadeAfterInput);
	currInput.addEventListener("blur", validadeAfterBlur);
}

function validadeAfterBlur(event) {
	const target = event.target;
	if (target.value.length > 0) {
		isDirty[target.id] = true;
		validateInput(target);
	}
}

function validadeAfterInput(event) {
	const target = event.target;

	if (!isDirty[target.id]) return;
	validateInput(target);
}

function validateInput(target) {
	const valid = target.validity.valid;
	const span = target.parentNode.querySelector("span span");

	if (target.id === "confirm-password" && valid) {
		const password = document.querySelector("#password");

		if (password.value !== target.value) {
			target.className = "invalid";
			span.textContent = "O password inserido deve ser igual ao anterior.";
		} else {
			target.className = "valid";
			span.textContent = target.validationMessage;
		}
		return;
	}

	if (valid) {
		target.className = "valid";
	} else {
		target.className = "invalid";
	}

	if (span) {
		span.textContent = target.validationMessage;
	}
}

form.addEventListener("submit", event => {
	Object.assign(isDirty, {
		"first-name": true,
		"last-name": true,
		email: true,
		"phone-number": true,
		password: true,
		"confirm-password": true,
	});

	const inputs = [];

	for (let i = 0; i < event.target.length - 1; i++) {
		inputs.push(event.target?.[i]);
	}

	const invalidInputs = inputs.filter(input => !input.validity.valid);

	if (invalidInputs.length === 0) {
		const confirmPassword = inputs[inputs.length - 1];
		const password = inputs[inputs.length - 2];
		const span = confirmPassword.parentNode.querySelector("span span");

		if (password.value !== confirmPassword.value) {
			event.preventDefault();
			confirmPassword.focus();
			confirmPassword.className = "invalid";
			span.textContent = "O password inserido deve ser igual ao anterior.";
		} else {
			confirmPassword.className = "valid";
			span.textContent = confirmPassword.validationMessage;
		}
		return;
	}

	event.preventDefault();
	addInvalidateStyles(invalidInputs);
});

function addInvalidateStyles(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		if (i === 0) {
			input.focus();
		}

		input.className = "invalid";
		const span = input.parentNode.querySelector("span span");
		span.textContent = input.validationMessage;
	}
}
