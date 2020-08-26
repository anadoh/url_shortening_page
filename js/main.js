const init = function () {
  const searchButton = document.querySelector('#form');
  searchButton.addEventListener('submit', handleUrl);
}

const handleUrl = function (event) {
  event.preventDefault();
  const url = document.querySelector(".serch__input").value;
  shortUrl(url);
}




const showUrl = function (redirectUrl, url) {

  const rowDiv = document.createElement("div");
  const column1 = document.createElement("div");
  column1.className = "url"
  column1.innerText = ` ${url}`;
  rowDiv.appendChild(column1);

  const column2 = document.createElement("div");
  column2.className = "url-short"
  column2.innerText = redirectUrl;
  rowDiv.appendChild(column2);

  const column3Button = document.createElement("button");
  column3Button.innerText = `Copy`;
  column3Button.onmouseover = function () {
    column3Button.style.backgroundColor = "hsl(180, 57%, 72%)";
    column3Button.onmouseout = function () {
      column3Button.style.backgroundColor = "hsl(180, 66%, 49%)";
    }
  }

  column3Button.onclick = function () {
    column3Button.innerText = `Copied!`;
    column3Button.style.backgroundColor = "hsl(260, 38%, 28%)";
    copyToClipboard(redirectUrl);
    this.onmouseout = null;
    this.onmouseover = null;
  }

  const column3 = document.createElement("div")
  column3.className = "url_button"
  column3.appendChild(column3Button);
  rowDiv.appendChild(column3);

  const placeHolder = document.querySelector(".urls");
  placeHolder.appendChild(rowDiv);
}

function copyToClipboard(text) {
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}

const shortUrl = function (url) {
  console.log(url, "url")
  fetch('https://rel.ink/api/links/', {
    method: 'POST',
    body: JSON.stringify({ "url": url }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log('respose ', response);
    if (response.ok) {
      console.log('respose2 ', response);
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    console.log("success", jsonResponse)
    const redirectUrl = `https://rel.ink/${jsonResponse.hashid}`;

    showUrl(redirectUrl, url);

    saveUrls();
  });
}

const saveUrls = function () {
  const urls = document.querySelectorAll(".url");
  const shortUrls = document.querySelectorAll(".url-short");
  const out = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i].innerText;
    const shortUrl = shortUrls[i].innerText;
    out.push({ "url": url, "shortUrl": shortUrl });
  }
  console.log('save', out);
  localStorage.setItem("myLocalStorage", JSON.stringify(out));
}

const loadUrls = function () {
  const myLocalStorage = JSON.parse(localStorage.getItem("myLocalStorage") || '[]');
  console.log('load', myLocalStorage);
  myLocalStorage.forEach(item => showUrl(item.shortUrl, item.url));
}

window.onload = function () {
  init();
  loadUrls();
};


