//  menue styling and activityes
const sideBar = document.getElementById("sideBar");
const overLay = document.querySelector(".overlay");
let index = 1;
document.querySelector("#menue img").onclick = function () {
  sideBar.style.left = "0px";
  overLay.style.display = "block";
}

document.getElementById("close").onclick = function () {
  sideBar.style.left = "-300px";
  overLay.style.display = "none";

}

// landing page chage images 
const images = ["./images/image-product-1.jpg","./images/image-product-2.jpg","./images/image-product-3.jpg","./images/image-product-4.jpg"]
const imageSlider = document.querySelectorAll(".imageSlider img");
function changeImage(imageSlider) {
  imageSlider.forEach((image, i) => {
    image.addEventListener("click", function (e) {
      index = i + 1;
      this.parentElement.parentElement.children[0].children[0].src = images[i];
      e.target.parentElement.querySelectorAll(".active").forEach((act) => {
        act.classList.remove("active");
      })
      e.target.classList.add("active");
    })
  });
}
changeImage(imageSlider);
// creat the light box 
const sec1 = document.querySelector(".sec1");
const mainImage = document.querySelector(".mainImage img");
 function lightbox() {
  let cloned = sec1.cloneNode(true);
  cloned.classList.add("lightbox");
  let nextDiv = document.createElement("div");
  let arrowRight = document.createElement("img");
  nextDiv.id = "next";
  arrowRight.src = "./images/icon-next.svg";
  let prevDiv = document.createElement("div");
  let arrowLeft = document.createElement("img");
  prevDiv.id = "prev";
  arrowLeft.src = "./images/icon-previous.svg";
  let close = document.createElement("div");
  close.textContent = "X";
  close.id = "closeBox";
  overLay.style.display = "block";
  nextDiv.append(arrowRight);
  prevDiv.append(arrowLeft);
  cloned.appendChild(nextDiv);
  cloned.appendChild(prevDiv);
  cloned.appendChild(close);
  document.body.append(cloned);
  let imageSlider = [...cloned.children[1].children];
  changeImage(imageSlider);
}

const mediaQuery = window.matchMedia("(min-width:769px)");
function handleClick(e) {
    if (e.target.id == "next") {
      const mainImage = e.target.parentElement.children[0].children[0];
      if (index < images.length) {
        mainImage.src = images[index];
        e.target.parentElement.children[1].children[index].classList.add("active");
        e.target.parentElement.children[1].children[index - 1].classList.remove("active");
        index++
      }
    }
    let minusIndex = index - 1;
    if (e.target.id == "prev") {
      const mainImage = e.target.parentElement.children[0].children[0];
      if (minusIndex > 0) {
        index--
        mainImage.src = images[index - 1];
        e.target.parentElement.children[1].children[minusIndex - 1].classList.add("active");
        e.target.parentElement.children[1].children[minusIndex].classList.remove("active");
      }
    }
    if (e.target.id == "closeBox") {
      e.target.parentElement.remove()
      overLay.style.display = "none"
    }
  };
  document.addEventListener("click", handleClick)
  mainImage.addEventListener("click", lightbox);
mediaQuery.addEventListener("change", function (e) {
  if (!e.matches) {
    console.log(true)
    mainImage.removeEventListener("click", lightbox);
  } else {
    mainImage.addEventListener("click", lightbox);
  }
});
window.onload = function () {
  if (window.innerWidth < 768) {
    mainImage.removeEventListener("click", lightbox);
  }
}
//  mobile silder 
const right = document.querySelector(".right")
const left = document.querySelector(".left")

let i = 0;
right.onclick = function () {
  if (i < images.length -1 ) {
    i++
    mainImage.src = images[i];
    console.log(i)
  }
}

left.onclick = function () {
  if (i > 0) {
    i--
    mainImage.src = images[i];
    console.log(i)
  }
}
// start counter 
const minusCount = document.getElementById("minusCount");
const plusCount = document.getElementById("plusCount");
const count = document.querySelector(".count");

plusCount.addEventListener("click", function () {
  count.innerHTML++;
})

minusCount.addEventListener("click", function () {
  if (count.innerHTML > 0) {
    count.innerHTML--;
  }

});
const cartBox = document.querySelector(".cartBox");
const cartIcone = document.getElementById("cartIcone");
cartIcone.addEventListener("click", _ => {
  cartBox.classList.toggle("none")
})
//  count products 
const cartCount = document.querySelector(".cartCount");
const prods = document.querySelectorAll(".products .prod");
const contentNums = document.querySelectorAll(".products .content .num");
const products = document.querySelector(".products");
const empText = document.querySelector(".empText");
function getCountProducts(prods) {
  if (prods) {
    if ([...prods].length) {
      cartCount.style.display = "block";
      products.classList.remove("empty");
      document.querySelectorAll(".prod .num").forEach((s) => {
        cartCount.innerHTML = +cartCount.innerHTML + parseInt(s.innerHTML.slice(1));
      })
    } else {
      empText.style.display = "block";
      cartCount.style.display = "none";
      products.classList.add("empty");
      counter.innerHTML = 0
    }
  } 
}

const counter = document.querySelector(".counter .count");
getCountProducts(prods);
const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  if (counter.innerHTML > "0") {
    let prodDiv = document.createElement("div");
    prodDiv.classList.add("prod");
    let thumbnailImage = document.createElement("img");
    thumbnailImage.src = this.dataset.img;
    prodDiv.append(thumbnailImage);
    let content = document.createElement("div");
    content.className = "content";
    let h3 = document.createElement("h3");
    h3.textContent = this.dataset.text;
    let div = document.createElement("div");
    div.classList.add("align-flex")
    let cartPrice = document.createElement("span");
    cartPrice.className = "cartPrice";
    cartPrice.innerHTML = "$" + this.dataset.price;
    let num = document.createElement("span");
    num.innerHTML = "x " + counter.innerHTML
    num.classList.add("num");
    let totalCost = document.createElement("span");
    totalCost.setAttribute("class", "total");
    totalCost.innerHTML = "$" + this.dataset.price * +counter.innerHTML + ".00";
    div.append(cartPrice);
    div.append(num);
    div.append(totalCost);
    content.append(h3);
    content.append(div);
    let deleted = document.createElement("img");
    deleted.src = './images/icon-delete.svg';
    deleted.className = "delete"
    prodDiv.append(thumbnailImage);
    prodDiv.append(content);
    prodDiv.append(deleted);
    products.prepend(prodDiv);
    let prod = document.querySelectorAll(".prod");
    document.querySelector(".checkout").classList.remove("none");
    empText.style.display = "none";
    getCountProducts(prod);
  }
  
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    getCountProducts(prods);
    document.querySelector(".checkout").classList.add("none");
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("checkout")) {
    this.location.reload()
  }
})