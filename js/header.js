document.addEventListener("DOMContentLoaded", function () {
  createHeader(); // 헤더 생성
  loadWishlistState(); // 찜목록 상태 로드 및 갱신

  if (document.querySelector(".wishlist-button")) {
    setupWishlistButton(); // 상세 페이지의 찜 버튼 설정
  }
});

// header.js
function createHeader() {
  const header = document.querySelector(".header-gm");
  header.innerHTML = ""; // 기존 헤더 내용 제거

  // 로고
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const logoLink = document.createElement("a");
  logoLink.innerText = "Sleek Lens";
  logoLink.href = "/html/main.html";
  logo.appendChild(logoLink);
  header.appendChild(logo);

  // 로그인
  const login = document.createElement("div");
  login.classList.add("login");
  const loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.innerText = "로그인";
  login.appendChild(loginLink);

  loginLink.addEventListener("click", () => {
    createModal(); // 모달 생성 함수 호출
  });

  // 찜한 상품 (아이콘)
  const wishlist = document.createElement("div");
  wishlist.classList.add("wishlist");
  wishlist.style.position = "relative";

  const wishlistLink = document.createElement("a");
  wishlistLink.href = "/html/wishlist.html";

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fas", "fa-heart");

  const wishlistCount = document.createElement("span");
  wishlistCount.classList.add("wishlist-count");
  wishlistCount.style.position = "absolute";
  wishlistCount.style.top = "0";
  wishlistCount.style.right = "0";
  wishlistCount.style.transform = "translate(100%, -50%)";

  wishlistLink.appendChild(heartIcon);
  wishlistLink.appendChild(wishlistCount);
  wishlist.appendChild(wishlistLink);

  // 장바구니
  const cart = document.createElement("div");
  cart.classList.add("cart");
  const cartLink = document.createElement("a");

  const cartImg = document.createElement("img");
  cartImg.src = "/img/shopping_bag.png";
  cartImg.alt = "Cart";
  cartLink.appendChild(cartImg);

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartCount = document.createElement("span");
  cartCount.classList.add("cart-count");
  cartCount.innerText = cartItems.length;
  cartLink.appendChild(cartCount);

  cartLink.addEventListener("click", () => {
    window.location.href = "/html/cart.html";
  });

  cart.appendChild(cartLink);

  // 요소 추가 순서 변경 (하트가 로그인 왼쪽)
  const headerRight = document.createElement("div");
  headerRight.classList.add("header-right");
  headerRight.appendChild(wishlist);
  headerRight.appendChild(login);
  headerRight.appendChild(cart);

  header.appendChild(headerRight);

  loadWishlistState(); // 찜목록 초기화 및 개수 갱신
}

// 찜목록 상태 로드
function loadWishlistState() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.querySelectorAll(".wishlist-button").forEach((button) => {
    const product = button.closest(".product");
    let productId = null;

    if (product) {
      const productImg = product.querySelector(".product-img");
      if (productImg) {
        productId = productImg.getAttribute("data-id");
      }
    } else {
      const productDetail = document.querySelector(".product-detail");
      if (productDetail) {
        productId = productDetail.getAttribute("data-id");
      }
    }

    if (!productId) return;

    const icon = button.querySelector("i");

    if (wishlist.includes(productId)) {
      icon.classList.replace("far", "fas");
      button.classList.add("active");
    } else {
      icon.classList.replace("fas", "far");
      button.classList.remove("active");
    }

    button.addEventListener("click", function () {
      toggleWishlist(button, productId);
    });
  });

  updateWishlistCount();
}

// 상세 페이지 찜 버튼 설정
function setupWishlistButton() {
  const button = document.querySelector(".wishlist-button");
  if (!button) return; // 버튼이 없으면 실행하지 않음

  const productDetail = document.querySelector(".product-detail");
  if (!productDetail) return;

  const productId = productDetail.getAttribute("data-id");
  const icon = button.querySelector("i");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.includes(productId)) {
    icon.classList.replace("far", "fas");
    button.classList.add("active");
  } else {
    icon.classList.replace("fas", "far");
    button.classList.remove("active");
  }

  button.addEventListener("click", () => {
    toggleWishlist(button, productId);
  });
}

// 찜목록 추가/삭제
function toggleWishlist(button, productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const icon = button.querySelector("i");

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
    icon.classList.replace("fas", "far");
    button.classList.remove("active");
  } else {
    wishlist.push(productId);
    icon.classList.replace("far", "fas");
    button.classList.add("active");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

// 찜 개수 업데이트
function updateWishlistCount() {
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCount = document.querySelector(".wishlist-count");
  const wishlistIcon = document.querySelector(".wishlist i");

  if (wishlistCount) {
    const count = wishlistItems.length;
    wishlistCount.innerText = count;
    wishlistCount.style.display = count > 0 ? "inline" : "none";
  }

  if (!wishlistIcon) {
    const wishlist = document.querySelector(".wishlist a");
    const newHeartIcon = document.createElement("i");
    newHeartIcon.classList.add("fas", "fa-heart");
    wishlist.prepend(newHeartIcon);
  }
}

// 로그인 모달 생성
function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.textContent = "×";

  const message = document.createElement("p");
  message.textContent = "준비중입니다";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(message);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  modal.style.display = "block";
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  createHeader();
});
