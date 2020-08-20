const init = function () {
  const searchButton = document.querySelector('#form');
  searchButton.addEventListener('submit', handleUrl);
}

const handleUrl = function (event) {
  event.preventDefault();
  const url = document.querySelector(".form_container").value;
  shortUrl(url);
  
}


const showUrl = function (response, url) {
  const redirectUrl = `https://rel.ink/${response.hashid}`;


  const newEl = document.createElement("div");
  newEl.innerText =` ${url}`;
  const div = document.querySelector(".url"); 
  div.appendChild(newEl);
  

  const newEl2 = document.createElement("div");
  newEl2.innerText = redirectUrl;
  const div2 = document.querySelector(".url_short"); 
  div2.appendChild(newEl2);
  

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
  div3.appendChild(newEl3);

  const button = document.querySelector(".url_button"); 
  button.appendChild(div3);


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
    showUrl(jsonResponse, url)
  })
}



window.onload = function() {
  init();
};


