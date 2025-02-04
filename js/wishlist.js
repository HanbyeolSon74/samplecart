// 헤더와 찜목록 상태 초기화
document.addEventListener("DOMContentLoaded", function () {
  createHeader(); // 헤더 생성
  loadWishlistState(); // 찜목록 상태 로드 및 갱신
});

function displayWishlistProducts() {
  const mainElement = document.querySelector(".main-gm");
  mainElement.innerHTML = ""; // 기존 내용 초기화

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];

  // 찜한 상품 필터링
  let wishlistItems = savedData.filter((item) => wishlist.includes(item.id));

  if (wishlistItems.length === 0) {
    mainElement.innerHTML = "<p>찜한 상품이 없습니다.</p>";
    return;
  }

  wishlistItems.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const formattedPrice = parseInt(item.price).toLocaleString();

    productDiv.innerHTML = `
        <img src="${item.picture}" alt="${item.name}" class="product-img" data-id="${item.id}" />
        <div class="product-info">
          <div class="product-name-wrapper">
            <h3 class="product-name" data-id="${item.id}">${item.name}</h3>
            <button class="wishlist-button active" data-id="${item.id}">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <p class="product-price">${formattedPrice}원</p>
        </div>
      `;

    mainElement.appendChild(productDiv);
  });

  // 이벤트 리스너 추가
  mainElement.addEventListener("click", function (event) {
    const clickedElement = event.target;

    // 상세 페이지로 이동
    if (
      clickedElement.classList.contains("product-img") ||
      clickedElement.classList.contains("product-name")
    ) {
      const productId = clickedElement.getAttribute("data-id");
      localStorage.setItem("selectedProduct", productId);
      window.location.href = "/html/detail.html";
    }

    // 찜 목록에서 제거
    if (clickedElement.closest(".wishlist-button")) {
      const button = clickedElement.closest(".wishlist-button");
      const productId = button.getAttribute("data-id");
      removeFromWishlist(productId); // 찜 목록에서 제거
    }
  });
}

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // 찜 목록에서 해당 제품 제거
  wishlist = wishlist.filter((id) => id !== productId);

  // 업데이트된 찜 목록을 로컬 스토리지에 저장
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // 찜 목록 표시 갱신
  displayWishlistProducts();

  // 하트 아이콘 상태 갱신
  updateWishlistCount(); // 헤더에 표시되는 하트 개수를 갱신
}
