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
  const newEl = document.createElement("div");
  newEl.innerText =` ${url}`;
  const div = document.querySelector(".url"); 
  div.appendChild(newEl);
  
 
  const newEl2 = document.createElement("div");
  newEl2.innerText =`https://rel.ink/ ${response.hashid}`;
  const div2 = document.querySelector(".url_short"); 
  div2.appendChild(newEl2);

  const newEl3 = document.createElement("button");
  newEl3.innerText =`Copy`;

  const div3 = document.createElement("div")
  div3.appendChild(newEl3);

  const button = document.querySelector(".url_button"); 
  button.appendChild(div3);


  

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


