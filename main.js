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
  let counter = 0;
  const newEl = document.createElement("div");
  newEl.innerText =` ${url} ${++counter}`;
  const div = document.querySelector(".url"); 
  div.appendChild(newEl);
  
  let counter2 = 0;
  const newEl2 = document.createElement("div");
  newEl2.innerText =`https://rel.ink/ ${response.hashid} ${++counter2}`;
  
  const div2 = document.querySelector(".url_short"); 
  const strong =div2.querySelector(".url_button");
  div2.insertBefore(newEl2,strong);

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


