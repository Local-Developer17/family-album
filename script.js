const sidebarElem = document.querySelector(".sidebar");
const dropdownElem = document.querySelector(".dropdown");
const galleryElem = document.querySelector(".gallery-container");
const galleryElemAll = document.querySelector(".gallery-container");
const container = document.querySelector(".gallery");
const headingElem = document.querySelector(".gallery-heading");
const image = document.getElementsByTagName("img");
const headingEl = document.querySelector(".gallery-heading");
const bodyEl = document.querySelector("body");
const main = document.querySelector(".main-container");
const pic = document.getElementById("pic");
const slidesEl = document.querySelector(".slides");
const sloganEl = document.querySelector(".slogan");
const titleEl = document.querySelector(".title");
const plansEl = document.querySelector(".plans");
const RightToggleUrl = "images/toggle-right.png";
const leftToggleUrl = "images/toggle-left.png";
const closeBtnUrl = "images/cancel.png";
const welcomeEl = document.querySelector(".welcome");
const buyBtn = document.getElementsByTagName("button");
const firstSlide = document.getElementById("first");
const secondSlide = document.getElementById("second");
const thirdSlide = document.getElementById("third");
const overlay = document.querySelector(".overlay");
const preview = document.querySelector(".preview");
const allImages = [
  ["images/q1/pic-1.jpg", "images/q1/pic-2.jpg", "images/q1/pic-3.jpg"],
  ["images/q2/pic-1.jpg", "images/q2/pic-2.jpg", "images/q2/pic-3.jpg"],
  ["images/q3/pic-1.jpg", "images/q3/pic-2.jpg", "images/q3/pic-3.jpg"],
  ["images/q4/pic-1.jpg", "images/q4/pic-2.jpg", "images/q4/pic-3.jpg"],
];
const slideImages = [...allImages[0], ...allImages[1], ...allImages[2], ...allImages[3]];
const slideImages2 = [...allImages[0], ...allImages[1], ...allImages[2], ...allImages[3]];
const slideImages3 = [...allImages[0], ...allImages[1], ...allImages[2], ...allImages[3]];
const previewAll = document.querySelectorAll(".previewImg");
let isZoomed = "";
let pictureCount = 0;
let counter = 0;

//Dropdown Sürükleme Olayları:
sidebarElem.addEventListener("mouseover", () => {
  dropdownElem.classList.remove("hidden");
});
sidebarElem.addEventListener("mouseleave", () => {
  dropdownElem.classList.add("hidden");
});
//Plan Satın Alma(Price Cards):
buyBtn[1].onclick = () => {
  document.querySelector(".premium").classList.add("selected");
  document.querySelector(".ultimate").classList.remove("selected");
};
buyBtn[2].onclick = () => {
  document.querySelector(".ultimate").classList.add("selected");
  document.querySelector(".premium").classList.remove("selected");
};
//Listelenen fotoğrafları seçilen çeyreğe göre listeleme:
document.querySelector(".q1").onclick = () => {
  switchQuarter(0);
  refreshGallery(2);
};
document.querySelector(".q2").onclick = () => {
  switchQuarter(1);
  refreshGallery(2);
};
document.querySelector(".q3").onclick = () => {
  switchQuarter(2);
  refreshGallery(2);
};
document.querySelector(".q4").onclick = () => {
  switchQuarter(3);
  refreshGallery(2);
};
let previewImg;
//Galeride Resimleri Tıklanan çeyreğe göre dizme:
function switchQuarter(input) {
  headingEl.classList.remove("hidden");
  container.classList.remove("hidden");
  slidesEl.classList.add("hidden");
  galleryElem.innerHTML = "";
  allImages[input].forEach((value, index) => {
    let newImg = document.createElement("img");
    newImg.setAttribute("src", value);
    galleryElem.appendChild(newImg);
    //Resmi büyüt:
    image[index + 5].onclick = () => {
      allImages[input].forEach((value, i) => {
        //Preview Componentindeki İmajların gelmesi:
        previewImg = document.createElement("img");
        previewImg.setAttribute("src", value);
        previewImg.classList.add("previewImg");
        preview.classList.remove("hidden");
        preview.appendChild(previewImg);
      });
      //Büyütülen resmin preview seçili görünmesi:
      document.querySelectorAll(".previewImg")[index].classList.add("current");
      pic.src = value;
      openImage();
      toggleBtn(index, allImages[input].length - 1, input);
      closeBtn();
      picIndicator(index + 1, allImages[input].length);
      //Preview'den seçilen fotoğrafı zoom componentine getirme:
      document.querySelectorAll(".previewImg").forEach((value, index) => {
        value.onclick = () => {
          //Preview'deki tüm fotoğrafların gölgesini kaldırıp, gölgeyi seçili olana ekleme:
          document.querySelectorAll(".previewImg").forEach((pic) => pic.classList.remove("current"));
          pic.src = value.src;
          value.classList.add("current");
          toggleBtn(index, allImages[input].length - 1, input);
        };
      });
    };
  });
}

//Büyütülen Resimler Arası Geçiş tuşları:
const RightToggle = document.createElement("img");
const leftToggle = document.createElement("img");
function toggleBtn(counter, pictureCount, input) {
  //Right Toggle:
  RightToggle.setAttribute("src", RightToggleUrl);
  RightToggle.classList.add("right-btn");
  container.appendChild(RightToggle);
  RightToggle.onclick = () => {
    if (counter >= pictureCount) {
      document.querySelectorAll(".previewImg")[counter].classList.remove("current");
      counter = 0;
      pic.src = allImages[input][counter];
      document.querySelectorAll(".previewImg")[counter].classList.add("current");
      swipeRight();
      indicator.textContent = `${counter + 1} / ${pictureCount + 1}`;
    } else {
      pic.src = allImages[input][counter + 1];
      document.querySelectorAll(".previewImg")[counter].classList.remove("current");
      document.querySelectorAll(".previewImg")[counter + 1].classList.add("current");
      counter++;
      swipeRight();
      indicator.textContent = `${counter + 1} / ${pictureCount + 1}`;
    }
  };
  //Left Toggle:
  leftToggle.setAttribute("src", leftToggleUrl);
  leftToggle.classList.add("left-btn");
  container.appendChild(leftToggle);
  leftToggle.onclick = () => {
    if (counter < 1) {
      document.querySelectorAll(".previewImg")[counter].classList.remove("current");
      counter = pictureCount;
      pic.src = allImages[input][counter];
      document.querySelectorAll(".previewImg")[counter].classList.add("current");
      swipeLeft();
      indicator.textContent = `${counter + 1} / ${pictureCount + 1}`;
    } else {
      pic.src = allImages[input][counter - 1];
      document.querySelectorAll(".previewImg")[counter].classList.remove("current");
      document.querySelectorAll(".previewImg")[counter - 1].classList.add("current");
      counter--;
      swipeLeft();
      indicator.textContent = `${counter + 1} / ${pictureCount + 1}`;
    }
  };
}
const indicator = document.createElement("p");
function picIndicator(counter, pictureCount) {
  indicator.textContent = `${counter} / ${pictureCount}`;
  indicator.classList.add("indicator");
  container.appendChild(indicator);
}
function openImage() {
  container.classList.add("overlay");
  main.classList.add("fix-height");
  pic.classList.add("zoom");
  pic.classList.add("no-click");
  pic.classList.remove("hidden");
  galleryElem.classList.add("hidden");
  headingEl.classList.add("hidden");
  welcomeEl.classList.add("hidden");
}
//Büyütülen Resimleri Kapatma:
const closeImg = document.createElement("img");
function closeBtn() {
  closeImg.setAttribute("src", closeBtnUrl);
  closeImg.classList.add("close-btn");
  container.appendChild(closeImg);
  closeImg.onclick = () => refreshGallery(1);
}
function refreshGallery(input) {
  switch (input) {
    //Resmi kapatma:
    case 1:
      //Animasyon Class'ı Silme:
      container.removeChild(closeImg);
      container.removeChild(RightToggle);
      container.removeChild(leftToggle);
      container.removeChild(indicator);
      main.classList.remove("fix-height");
      document.querySelectorAll(".previewImg").forEach((pic) => preview.removeChild(pic));
      //Timeout ile Animasyon buraya eklenecek: SetTimeout(()=> {},timeout)
      container.classList.remove("overlay");
      pic.classList.add("hidden");
      galleryElem.classList.remove("hidden");
      headingEl.classList.remove("hidden");
      pic.classList.remove("no-click");
      pic.classList.remove("swipe-right");
      welcomeEl.classList.remove("hidden");
      pic.classList.remove("default");
      pic.classList.remove("zoom");
      preview.classList.add("hidden");

      break;
    //Galeriyi Değiştirme
    case 2:
      pic.classList.add("hidden");
      galleryElem.classList.remove("hidden");
      headingEl.classList.remove("hidden");
      pic.classList.remove("no-click");
  }
}
//Esc ile kapatma olayı:
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    refreshGallery(1);
  }
});
//Animasyonlar:
function swipeRight() {
  pic.classList.add("swipe-right");
  setTimeout(() => {
    pic.classList.remove("swipe-right");
  }, 200);
  pic.classList.remove("zoom");
  pic.classList.add("default");
}
function swipeLeft() {
  pic.classList.add("swipe-left");
  setTimeout(() => {
    pic.classList.remove("swipe-left");
  }, 200);
  pic.classList.remove("zoom");
  pic.classList.add("default");
}
//Ana Menüdeki Slayt Resimleri:
function slideAnimation() {
  firstSlide.src = slideImages[Math.floor(Math.random() * slideImages.length)];
  secondSlide.src = slideImages2[Math.floor(Math.random() * slideImages2.length)];
  thirdSlide.src = slideImages3[Math.floor(Math.random() * slideImages3.length)];
  setInterval(() => {
    firstSlide.src = slideImages[Math.floor(Math.random() * slideImages.length)];
    secondSlide.src = slideImages2[Math.floor(Math.random() * slideImages2.length)];
    thirdSlide.src = slideImages3[Math.floor(Math.random() * slideImages3.length)];
  }, 4000);
}
slideAnimation();
