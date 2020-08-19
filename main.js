const init = function () {
  const searchButton = document.querySelector('.search__button');
  searchButton.addEventListener('click', handleUrl);
}

const handleUrl = function (event) {
  console.log(event);
  alert("ok");
}


window.onload = function() {
  init();
};


