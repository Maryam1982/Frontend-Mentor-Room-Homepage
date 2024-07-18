const prevNav = document.querySelector(".btn.btn--slider-nav:nth-child(1)");
const nextNav = document.querySelector(".btn.btn--slider-nav:nth-child(2)");
const heroImageContainer = document.querySelector(".hero__slider-img");
const heroTitle = document.querySelector(".hero__text-title");
const heroBody = document.querySelector(".hero__text-body");
const collapsedMenu = document.querySelector(
  ".hero__nav-section :nth-child(1)"
);
const expandedMenu = document.querySelector(".hero__nav-section :nth-child(3)");
const menuContainer = document.querySelector(".menu-container");

function setNavVisibility() {
  const clientWidth = document.body.clientWidth;
  if (clientWidth > 570) {
    if (!collapsedMenu.classList.contains("hero__ham-menu--hide"))
      collapsedMenu.classList.add("hero__ham-menu--hide");
    if (expandedMenu.classList.contains("hero__nav--hide"))
      expandedMenu.classList.remove("hero__nav--hide");
  } else {
    if (collapsedMenu.classList.contains("hero__ham-menu--hide"))
      collapsedMenu.classList.remove("hero__ham-menu--hide");
    if (!expandedMenu.classList.contains("hero__nav--hide"))
      expandedMenu.classList.add("hero__nav--hide");
  }
}

collapsedMenu.addEventListener("click", () => {
  if (collapsedMenu.classList.contains("hero__ham-menu--rotate")) {
    collapsedMenu.classList.remove("hero__ham-menu--rotate");
    document.body.style.overflow = "scroll";
    if (!menuContainer.classList.contains("menu-container--hide"))
      menuContainer.classList.add("menu-container--hide");
  } else {
    collapsedMenu.classList.add("hero__ham-menu--rotate");
    document.body.style.overflow = "hidden";
    if (menuContainer.classList.contains("menu-container--hide"))
      menuContainer.classList.remove("menu-container--hide");
  }
});

setNavVisibility();
window.addEventListener("resize", () => {
  setNavVisibility();
});

const sliderItems = [
  {
    img: "./images/desktop-image-hero-1.jpg",
    order: 1,
    text: {
      title: "Discover innovative ways to decorate",
      body: `We provide unmatched quality, comfort, and style for property owners across the country. 
          Our experts combine form and function in bringing your vision to life. Create a room in your 
          own style with our collection and make your property a reflection of you and what you love.`,
    },
  },
  {
    img: "./images/desktop-image-hero-2.jpg",
    order: 2,
    text: {
      title: "We are available all across the globe",
      body: `With stores all over the world, it's easy for you to find furniture for your home or place of business. 
          Locally, we’re in most major cities throughout the country. Find the branch nearest you using our 
          store locator. Any questions? Don't hesitate to contact us today.`,
    },
  },
  {
    img: "./images/desktop-image-hero-3.jpg",
    order: 3,
    text: {
      title: "Manufactured with the best materials",
      body: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology 
          to ensure that every product is made as perfect and as consistent as possible. With three decades of 
          experience in this industry, we understand what customers want for their home and office.`,
    },
  },
];

function swapElements(first, second) {
  const tempPos = sliderItems[first];
  sliderItems[first] = sliderItems[second];
  sliderItems[second] = tempPos;
}

function reOrder(direction) {
  const currentOrder = sliderItems[0].order;
  if (direction === "next") {
    const nextOrder =
      currentOrder + 1 > sliderItems.length ? 1 : currentOrder + 1;
    const nextIndex = sliderItems.findIndex((item) => item.order === nextOrder);
    swapElements(1, nextIndex);
  } else if (direction === "prev") {
    const prevOrder =
      currentOrder - 1 <= 0 ? sliderItems.length : currentOrder - 1;
    const prevIndex = sliderItems.findIndex((item) => item.order === prevOrder);
    swapElements(1, prevIndex);
  }
}

function updateText() {
  heroTitle.textContent = sliderItems[1].text.title;
  heroBody.textContent = sliderItems[1].text.body;
}

prevNav.addEventListener("click", () => {
  reOrder("prev");

  heroImageContainer.style.backgroundImage = `url(${sliderItems[0].img}), url(${sliderItems[1].img}),url(${sliderItems[2].img})`;
  heroImageContainer.classList.add("background-animation-prev");

  setTimeout(() => {
    heroImageContainer.style.backgroundImage = `url(${sliderItems[1].img}), url(${sliderItems[0].img}),url(${sliderItems[2].img})`;
    updateText();
    swapElements(0, 1);
  }, 4999);

  setTimeout(() => {
    heroImageContainer.classList.remove("background-animation-prev");
  }, 5001);
});

nextNav.addEventListener("click", () => {
  reOrder("next");
  heroImageContainer.style.backgroundImage = `url(${sliderItems[0].img}), url(${sliderItems[1].img}),url(${sliderItems[2].img})`;
  heroImageContainer.classList.add("background-animation-next");

  setTimeout(() => {
    heroImageContainer.style.backgroundImage = `url(${sliderItems[1].img}), url(${sliderItems[0].img}),url(${sliderItems[2].img})`;
    updateText();
    swapElements(0, 1);
  }, 4999);

  setTimeout(() => {
    heroImageContainer.classList.remove("background-animation-next");
  }, 5001);
});
