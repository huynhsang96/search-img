const keyApi = "6fb4uKhZJ6hVnyc3x1BdJnd8YIhBeb8Z";
let endPoint;
let dataImg;
let contentImg;
let boxImg;
const inputElement = document.querySelector(".input_img");
const btnSearch = document.querySelector(".btn_search");
const btnClear = document.querySelector(".btn_clear");
const wrapperImg = document.querySelector(".wrapper");

function createImg() {
	const content = document.createElement("div");
	content.classList.add("content");
	wrapperImg.appendChild(content);
}

// template để render ra ảnh
function imageTemplate(url) {
	const template = `
    <div class="box_img">
        <div class="wrapper-loader">
            <div class="loader"></div>
        </div>
        <img src="${url}" alt="Img-GiF" />
    </div>`;
	contentImg.insertAdjacentHTML("beforeend", template);
}

inputElement.addEventListener("keyup", (e) => {
	if (contentImg && e.key === "Enter" && inputElement.value != "") {
		deleteImg();
	}
	if (e.key === "Enter" && inputElement.value != "") {
		requestApi(inputElement.value);
		createImg();
		contentImg = document.querySelector(".content");
	}
});

btnSearch.addEventListener("click", (e) => {
	if (contentImg && inputElement.value != "") {
		deleteImg();
	}
	if (inputElement.value != "") {
		requestApi(inputElement.value);
		createImg();
		contentImg = document.querySelector(".content");
	}
});

function requestApi(value) {
	endPoint = `https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${keyApi}`;
	fetchData();
}

// lấy dữ liệu
async function fetchData() {
	const data = await axios.get(endPoint);
	dataImg = data.data.data;
	renderImg(dataImg);
}

// render dữ liệu
function renderImg(data) {
	if (data.length > 0) {
		data.forEach(async (element) => {
			await imageTemplate(element.images.original.url);
		});
	} else {
		console.log("No data");
	}
}

function deleteImg() {
	contentImg.parentNode.removeChild(contentImg);
}

btnClear.addEventListener("click", () => {
	if (contentImg) {
		deleteImg();
		contentImg = document.querySelector(".content");
		inputElement.value = "";
		inputElement.focus();
	}
});
