// header.js
document.addEventListener("DOMContentLoaded", () => {
  // 페이지 로드시 찜, 장바구니 개수 업데이트
  updateWishlistCount();
  updateCartCount();

  // 로그인 링크 클릭 시 SweetAlert2 모달로 안내
  const loginLink = document.getElementById("login-link");
  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "준비중입니다",
        text: "로그인 기능은 현재 준비중입니다.",
      });
    });
  }
});

/**
 * 로컬스토리지의 "wishlist" 항목을 읽어 찜한 상품 개수를 업데이트합니다.
 */
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCountEl = document.querySelector(".wishlist-count");
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
    // 찜한 상품이 있으면 개수를 보여주고, 없으면 숨김 처리
    wishlistCountEl.style.display = wishlist.length > 0 ? "inline" : "none";
  }
}

/**
 * 로컬스토리지의 "cartItems" 항목을 읽어 장바구니 개수를 업데이트합니다.
 */
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = cartItems.length;
    cartCountEl.style.display = cartItems.length > 0 ? "inline" : "none";
  }
}
