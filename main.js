const init = function () {
  const searchButton = document.querySelector('#form');
  searchButton.addEventListener('submit', handleUrl);
}

const handleUrl = function (event) {
  event.preventDefault();
  const url = document.querySelector(".form_container").value;
  shortUrl(url);
}




const showUrl = function (redirectUrl, url) {

  const rowDiv = document.createElement("div")

  const newEl = document.createElement("div");
  newEl.className="url"
  newEl.innerText =` ${url}`;
  rowDiv.appendChild(newEl);
  

  const newEl2 = document.createElement("div");
  newEl2.className = "url_short"
  newEl2.innerText = redirectUrl;
  rowDiv.appendChild(newEl2);
  

  const newEl3 = document.createElement("button");
  newEl3.innerText =`Copy`;
  newEl3.onmouseover = function () {
      newEl3.style.backgroundColor = "hsl(180, 57%, 72%)";
      newEl3.onmouseout = function () {
        newEl3.style.backgroundColor = "hsl(180, 66%, 49%)";
      }
    }

  newEl3.onclick = function () {
    newEl3.innerText =`Copied!`;
    newEl3.style.backgroundColor = "hsl(260, 38%, 28%)";
    copyToClipboard(redirectUrl);
    this.onmouseout = null;
    this.onmouseover = null;
  } 

    
  const div3 = document.createElement("div")
  div3.className="url_button"
  div3.appendChild(newEl3);
  rowDiv.appendChild(div3);

  const placeHolder = document.querySelector(".show_url"); 
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


const shortUrl = function(url) {
  console.log(url, "url")
  fetch('https://rel.ink/api/links/', {
    method: 'POST',
    body: JSON.stringify({"url": url}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then (response => {
    console.log('respose ', response);
    if (response.ok) {
      console.log('respose2 ', response);
      return response.json();
    }
    throw new Error ('Request failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {console.log("success", jsonResponse)
  const redirectUrl = `https://rel.ink/${jsonResponse.hashid}`;

  showUrl(redirectUrl, url);

    saveUrls();
  });
}

const saveUrls = function () {
  const urls = document.querySelectorAll(".url");
  const shortUrls = document.querySelectorAll(".url_short");
  const out = [];
  for (let i=0; i<urls.length; i++){
    const url = urls[i].innerText; 
    const shortUrl = shortUrls[i].innerText; 
    out.push({"url":url, "shortUrl":shortUrl});
  }
  console.log('save', out);
  localStorage.setItem("myLocalStorage", JSON.stringify(out));
}

const loadUrls = function (){
  const myLocalStorage = JSON.parse(localStorage.getItem("myLocalStorage") || '[]');
  console.log('load', myLocalStorage);
  myLocalStorage.forEach(item => showUrl(item.shortUrl, item.url));
}


window.onload = function() {
  init();
  loadUrls();
  
};


