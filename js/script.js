var slideIndex = 0;

carousel();

function carousel() {
  let x = document.getElementsByClassName("slide");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1
  }
  x[slideIndex-1].style.display = "block";
  currentDiv(slideIndex)
  setTimeout(carousel, 4000); // 10 seconds
}

showDivs(slideIndex +1);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  var x = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("indicator");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
let $promotions = document.getElementById("promotions");


function getPromotions() {
  // http://127.0.0.1:8000/promotions
  let url = '/web-cake-shop/dummy/promotions.json';
  fetch(url)
      .then(response  => {
        if (response.status === 200){
          return response.json();
        }
        else {
          return [];
        }
      })
      .then(data => {
            const promotions = data;
            $promotions.innerHTML = '';
            promotions.products.forEach(productElement => {
              $promotions.innerHTML += `
                <article class="promotion">
                  <img src="${productElement.image}" alt="" height="200">
                  <header>
                    <h3>${productElement.name}</h3>
                    <h3>$${productElement.promotion.price}</h3>
                  </header>
                  <div>
                  ${productElement.description}
                  </div>
                  <div>
                    <button>Pedir Ahora</button>
                  </div>
                </article>
              `
            });
      })
      .catch(error => {
        console.warn(error);
        $promotions.innerHTML = `??Ups! Algo sali?? mal [${error}]`;
      });
}

getPromotions();
