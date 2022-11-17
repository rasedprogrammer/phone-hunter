const loadPhones = async (searchText, dataLimit) => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	const res = await fetch(url);
	const data = await res.json();
	displayPhone(data.data, dataLimit);
};
const displayPhone = (phones, dataLimit) => {
	const phoneContainer = document.getElementById("phones-container");
	phoneContainer.innerText = ``;

	const showAllPhone = document.getElementById("show-all");
	// Display 10 Phone Only

	if (dataLimit && phones.length > 10) {
		phones = phones.slice(0, 10);
		showAllPhone.classList.remove("d-none");
	} else {
		showAllPhone.classList.add("d-none");
	}

	// Display No Phones Found
	const noPhonesFound = document.getElementById("no-found-message");
	if (phones.length === 0) {
		noPhonesFound.classList.remove("d-none");
	} else {
		noPhonesFound.classList.add("d-none");
	}
	// DisplayPhone
	phones.forEach((phone) => {
		// console.log(phone);
		const phoneDiv = document.createElement("div");
		phoneDiv.classList.add("col");
		phoneDiv.innerHTML = `
      <div class="card">
				<img src="${phone.image}" class="card-img-top p-4" alt="..." />
				<div class="card-body">
					<h5 class="card-title">${phone.phone_name}</h5>
					<p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
					</p>
					<button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
				</div>
			</div>
    `;
		phoneContainer.appendChild(phoneDiv);
	});
	// Stop Loader
	toggleSpinner(false);
};

const processSearch = (dataLimit) => {
	toggleSpinner(true);
	const searchField = document.getElementById("search-field");
	const searchText = searchField.value;
	loadPhones(searchText, dataLimit);
};
//Handle Search Button Click
document.getElementById("btn-search").addEventListener("click", () => {
	// Start Loader
	processSearch(10);
});
// Search Inpur Field Enter Handler

document
	.getElementById("search-field")
	.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			processSearch(10);
		}
	});
const toggleSpinner = (isLoading) => {
	const loaderSection = document.getElementById("loader");
	if (isLoading) {
		loaderSection.classList.remove("d-none");
	} else {
		loaderSection.classList.add("d-none");
	}
};

// Not The Best Way To Load Data Server
document.getElementById("btn-show-all").addEventListener("click", () => {
	processSearch();
});

const loadPhoneDetails = async (id) => {
	const url = `https://openapi.programming-hero.com/api/phone/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
	console.log(phone);
	const phoneName = document.getElementById("phoneDetailModalLabel");
	phoneName.innerText = phone.name;
	const phoneDetailsBody = document.getElementById("phone-details-body");
	phoneDetailsBody.innerHTML = `
		<p>Release Data: ${
			phone.releaseDate ? phone.releaseDate : "No Phone Release Date Found"
		}</p>
		<p>Storage: ${
			phone.mainFeatures ? phone.mainFeatures.storage : "No Information Found"
		}</p>
		<p>Bluetooth: ${
			phone.others
				? phone.others.Bluetooth
				: "No Bluetooh Information Available"
		}</p>
	`;
};
loadPhones("apple");
