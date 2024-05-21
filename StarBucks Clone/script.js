// $(document).ready(function () {
//   // 點擊主菜單項時顯示相應的子菜單
//   $(".menu_item").click(function () {
//     // 隱藏所有其他子菜單
//     $(".submenu").hide();
//     // 顯示相應的子菜單
//     var submenuId = $(this).data("submenu");
//     $("#" + submenuId).show();
//   });
// });

const navs = Array.from(document.querySelectorAll("header nav ul li a"));
const subMenus = Array.from(document.querySelectorAll(".sub_menu"));
// 滑鼠移到哪個選單，就跑出相對應的選單細項
navs.forEach((nav) => {
  let index = navs.indexOf(nav);
  nav.addEventListener("mouseover", () => {
    nav.style.backgroundColor = "#1E1E1E";
    nav.style.color = "#ffffff";
    subMenus[index].style.display = "block";
    subMenus[index].addEventListener("mouseover", () => {
      nav.style.backgroundColor = "#1E1E1E";
      nav.style.color = "#ffffff";
      subMenus[index].style.display = "block";
    });
  });

  nav.addEventListener("mouseout", () => {
    nav.style.backgroundColor = "#F7F7F7";
    nav.style.color = "#1E1E1E";
    subMenus[index].style.display = "none";
    subMenus[index].addEventListener("mouseout", () => {
      nav.style.backgroundColor = "#F7F7F7";
      nav.style.color = "#1E1E1E";
      subMenus[index].style.display = "none";
    });
  });
});

//輪播
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, i) => {
    const distance = Math.abs(index - i);
    if (distance === 1 || (distance === slides.length - 1 && index !== i)) {
      slide.style.opacity = 0.5; // 左右兩側具透明度
    } else {
      slide.style.opacity = 1; // 中間位置的方塊不具透明度
    }
  });
  slider.style.transform = `translateX(-${index * slides[0].offsetWidth}px)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// 自動播放
const autoplayInterval = setInterval(nextSlide, 8000);
slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));

slider.addEventListener(
  "mouseleave",
  () => (autoplayInterval = setInterval(nextSlide, 8000))
);

dots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    index = dotIndex;
    updateSlider();
  });
});

// storeLocator
function initMap() {
  const locations = [
    { lat: 25.03379, lng: 121.55728 }, // 敦富門市
    { lat: 25.03332, lng: 121.54844 }, // 敦南門市
    { lat: 25.03947, lng: 121.55785 }, // 通化門市
    { lat: 25.02704, lng: 121.53682 }, // 興南門市
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: locations[0], // default=敦富門市
  });

  const markers = locations.map((location, index) => {
    return new google.maps.Marker({
      position: location,
      map: map,
      title: `Store ${index + 1}`,
    });
  });

  const storeItems = document.querySelectorAll(".store-item");
  storeItems.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      // 放大
      markers[index].setIcon(
        "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      );
      map.setCenter(markers[index].getPosition()); // 地圖中心
    });
    item.addEventListener("mouseout", () => {
      // 還原
      markers[index].setIcon(null);
    });
  });
}
initMap();
