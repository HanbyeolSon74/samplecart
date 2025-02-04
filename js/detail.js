document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector(".main-gm");

  if (mainElement) {
    displayProducts();
  } else {
    displayProductDetail();
  }

  loadWishlistState();
  updateCartCount(); // 페이지 로드 시 장바구니 숫자 업데이트
});

// 상품 상세 페이지 표시 함수
function displayProductDetail() {
  const detailContainer = document.querySelector(".detail-container");
  if (!detailContainer) {
    console.error("🚨 detail-container 요소를 찾을 수 없습니다!");
    return;
  }

  const productId = localStorage.getItem("selectedProduct");
  if (!productId) {
    detailContainer.innerHTML = "<p>상품 정보를 찾을 수 없습니다.</p>";
    return;
  }

  let savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let product = savedData.find((item) => item.id === productId);

  if (!product) {
    detailContainer.innerHTML = "<p>상품 정보를 찾을 수 없습니다.</p>";
    return;
  }

  const formattedPrice = parseInt(product.price).toLocaleString();
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isWished = wishlist.includes(productId);

  detailContainer.innerHTML = `
    <div class="product-detail">
      <img src="${product.picture}" alt="${product.name}" class="detail-img">
      <div class="detail-info">
        <h2>
          ${product.name}
          <button id="wishlistButton" class="wishlist-button">
            <i class="${isWished ? "fas fa-heart" : "far fa-heart"}"></i>
          </button>
        </h2>
        <p>가격: ${formattedPrice}원</p>
        <p>${product.content}</p>
        <button id="addToCart">장바구니에 추가</button>
      </div>
    </div>
  `;

  // 장바구니 추가 이벤트
  document.getElementById("addToCart").addEventListener("click", function () {
    addShoppingCart(product);
  });

  // 찜 버튼 클릭 이벤트
  document
    .getElementById("wishlistButton")
    .addEventListener("click", function () {
      toggleWishlist(productId);
      updateWishlistIcon();
    });
}

// 장바구니 추가 함수
function addShoppingCart(item) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const productExists = cartItems.some((cartItem) => cartItem.id === item.id);

  if (!productExists) {
    cartItems.push({ ...item, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("장바구니에 추가되었습니다!");
    updateCartCount();
  } else {
    alert("이 상품은 이미 장바구니에 있습니다.");
  }
}

// 찜 목록에 상품 추가/제거
function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
  } else {
    wishlist.push(productId);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

// 찜 아이콘 업데이트 함수
function updateWishlistIcon() {
  const wishlistButton = document.getElementById("wishlistButton");
  const productId = localStorage.getItem("selectedProduct");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const isWished = wishlist.includes(productId);
  const heartIcon = wishlistButton.querySelector("i");

  if (isWished) {
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas");
  } else {
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");
  }
}

// 찜 목록 개수 업데이트 함수
function updateWishlistCount() {
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCount = document.querySelector(".wishlist-count");

  if (wishlistCount) {
    const count = wishlistItems.length;
    wishlistCount.innerText = count;
    wishlistCount.style.display = count > 0 ? "inline" : "none";
  }
}

// 장바구니 숫자 업데이트 함수
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartCount = cartItems.length;

  let cartCountElement = document.querySelector(".cart-count");

  if (!cartCountElement) {
    cartCountElement = document.createElement("span");
    cartCountElement.classList.add("cart-count");
    document.body.appendChild(cartCountElement);
  }

  cartCountElement.textContent = cartCount;
}
