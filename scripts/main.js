const URL_BASE = "https://www.tabnews.com.br/api/v1";

import { strategy } from "./strategy.js";

async function get(page, perPage, stratregy) {
  try {
    var response = await fetch(
      `${URL_BASE}/contents?page=${page}&per_page=${perPage}&strategy=${stratregy}`
    );
    var object = await handleResponse(response);
    showInfo(object);
  } catch (error) {
    console.log(error);
  }
}

async function handleResponse(response) {
  if (response.status == 200) {
    return await response.json();
  } else {
    alert(`Erro ${response.status} - Entre em contato com o nosso time.`);
  }
}

function showInfo(obj) {
  let divMain = document.getElementById("contents");
  for (let index = 0; index < obj.length; index++) {
    const content = obj[index];
    let divElement = document.createElement("div");
    divElement.appendChild(createTitle(`${index + 1}. ${content.title}`));
    divElement.appendChild(createFooter(content));
    divMain.appendChild(divElement);
  }
}

function createFooter(content) {
  let divFooter = document.createElement("div");
  divFooter.classList.add("footer-content");
  divFooter.appendChild(createFooterSpan(`${content.tabcoins} tabcoins`));
  divFooter.appendChild(
    createFooterSpan(`${content.children_deep_count} comentários`)
  );
  divFooter.appendChild(createFooterSpan(content.owner_username));
  return divFooter;
}

function createFooterSpan(value) {
  let footerElement = document.createElement("span");
  footerElement.innerText = value;
  footerElement.classList.add("footer-element");
  return footerElement;
}

function createTitle(title) {
  let titleElement = document.createElement("span");
  titleElement.innerText = title;
  titleElement.classList.add("title");
  return titleElement;
}

get(1, 20, strategy.relevant);

const today = dayjs();
const niver = dayjs("2022-09-15");
const oFormat = today.format("DD/MM/YYYY");

console.log(today);
console.log(niver);

const diff = today.diff(niver, "day");

console.log(diff);
