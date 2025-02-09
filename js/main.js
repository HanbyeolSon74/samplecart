document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector(".main-gm");
  if (mainElement) {
    displayProducts(mainElement, "all");
  } else {
    displayProductDetail();
  }

  loadWishlistState();

  // 카테고리 버튼 생성
  const categoryButtons = document.createElement("div");
  categoryButtons.classList.add("category-buttons");
  categoryButtons.innerHTML = `
    <button data-category="all">전체</button>
    <button data-category="Glasses">안경</button>
    <button data-category="Sunglasses">선글라스</button>
  `;

  document
    .querySelector(".header-gm")
    .insertAdjacentElement("afterend", categoryButtons);

  // 버튼 클릭 시 필터링
  categoryButtons.addEventListener("click", function (event) {
    const category = event.target.getAttribute("data-category");
    if (category) {
      displayProducts(mainElement, category);
    }
  });
});

document.querySelector(".main-gm").addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (
    clickedElement.classList.contains("product-img") ||
    clickedElement.classList.contains("product-name")
  ) {
    const productId = clickedElement.getAttribute("data-id");
    localStorage.setItem("selectedProduct", productId);
    window.location.href = "/html/detail.html";
  }

  if (clickedElement.closest(".wishlist-button")) {
    const button = clickedElement.closest(".wishlist-button");
    const productId = button.closest(".product").getAttribute("data-id");
    toggleWishlist(productId); // toggleWishlist 호출
    updateHeartIcon(productId);
    updateWishlistCount(); // 찜 목록 개수 업데이트
  }
});

let filteredData = []; // 전역 변수로 설정
let currentPage = 1;
const itemsPerPage = 15; // 한 페이지당 표시할 제품 개수

function displayProducts(mainElement, category) {
  const savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];
  if (!savedData.length) {
    Swal.fire({
      icon: "error",
      title: "제품이 없습니다!",
      text: "저장된 제품이 없습니다!",
    });
    return;
  }

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // 카테고리가 all일 경우 모든 제품을 보여주고, 그 외에는 필터링
  filteredData =
    category === "all"
      ? savedData
      : savedData.filter((product) => {
          return (
            product.category &&
            product.category.trim().toLowerCase() === category.toLowerCase()
          );
        });
  currentPage = 1; // 새 필터가 적용되면 첫 페이지로 초기화
  displayPage(mainElement, currentPage);
  displayPagination();
}

function displayPage(mainElement, page) {
  mainElement.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = filteredData.slice(start, end);

  mainElement.innerHTML = paginatedData
    .map(
      (product) => `
    <div class="product" data-id="${product.id}" data-category="${
        product.category
      }">
      <img src="${product.picture}" alt="${
        product.name
      }" class="product-img" data-id="${product.id}" />
      <h3 class="product-name" data-id="${product.id}">
        ${product.name}
        <button class="wishlist-button"><i class="${
          JSON.parse(localStorage.getItem("wishlist") || "[]").includes(
            product.id
          )
            ? "fas fa-heart"
            : "far fa-heart"
        }"></i></button>
      </h3>
      <p class="product-price">${parseInt(product.price).toLocaleString()}원</p>
    </div>
  `
    )
    .join("");
}

function displayProductDetail() {
  const productId = localStorage.getItem("selectedProduct");
  if (!productId) {
    Swal.fire({
      icon: "error",
      title: "제품을 찾을 수 없음",
      text: "선택된 제품 ID가 없습니다!",
    });
    return;
  }

  const savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];
  const product = savedData.find((item) => item.id === productId);
  if (!product) {
    Swal.fire({
      icon: "error",
      title: "제품을 찾을 수 없음",
      text: "해당 제품을 찾을 수 없습니다!",
    });
    return;
  }

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isWished = wishlist.includes(productId);

  const mainElement = document.querySelector(".main-gm");
  if (!mainElement) return;

  mainElement.innerHTML = `
    <div class="product-detail">
      <img src="${product.picture}" alt="${product.name}" class="product-img" />
      <div class="product-info">
        <h3 class="product-name">
          ${product.name}
          <button class="wishlist-button"><i class="${
            isWished ? "fas fa-heart " : "far fa-heart "
          }"></i></button>
        </h3>
        <p class="product-price">${parseInt(
          product.price
        ).toLocaleString()}원</p>
        <p class="product-description">${product.content}</p>
      </div>
    </div>
  `;

  loadWishlistState();
}

function updateHeartIcon(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const heartIcon = document.querySelector(
    `.product[data-id="${productId}"] .wishlist-button i`
  );

  if (wishlist.includes(productId)) {
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas");
  } else {
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");
  }
}

function toggleWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(productId)) {
    const index = wishlist.indexOf(productId);
    wishlist.splice(index, 1); // 찜 목록에서 제거
  } else {
    wishlist.push(productId); // 찜 목록에 추가
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function loadWishlistState() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.querySelectorAll(".wishlist-button").forEach((button) => {
    const productId = button.closest(".product").getAttribute("data-id");
    const heartIcon = button.querySelector("i");

    if (wishlist.includes(productId)) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
    }
  });

  updateWishlistCount(); // 찜 목록 개수 업데이트
}

// 찜 목록 갯수
function updateWishlistCount() {
  const wishlistRaw = localStorage.getItem("wishlist");
  const wishlist = wishlistRaw ? JSON.parse(wishlistRaw) : [];

  const wishlistCountElement = document.querySelector(".wishlist-count");
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length;
    wishlistCountElement.style.display = wishlist.length > 0 ? "block" : "none"; // 0이면 숨김
  }
}

// 찜 목록 변경 시 업데이트 (이벤트 리스너 활용)
window.addEventListener("storage", updateWishlistCount);

// 스타일 변경 (CSS로 처리 가능)
document.querySelectorAll(".wishlist-button").forEach((button) => {
  button.addEventListener("mouseover", function () {
    const heartIcon = button.querySelector("i");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const productId = button.closest(".product").getAttribute("data-id");

    // 찜하지 않은 상태일 때만 하트를 빨간색으로 바꿈
    if (!wishlist.includes(productId)) {
      heartIcon.classList.add("fas"); // 찜하지 않은 경우에만 마우스를 올리면 빨간 하트로 변경
    }
  });

  button.addEventListener("mouseout", function () {
    const heartIcon = button.querySelector("i");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const productId = button.closest(".product").getAttribute("data-id");

    // 찜하지 않은 상태일 때만 회색 하트로 돌아가게 설정
    if (!wishlist.includes(productId)) {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far"); // 클릭하지 않은 상태로 돌아가면 회색 하트로 변경
    }
  });
});

// 페이지네이션
function displayPagination() {
  let paginationElement = document.querySelector(".pagination");

  if (!paginationElement) {
    paginationElement = document.createElement("div");
    paginationElement.classList.add("pagination");
    document
      .querySelector(".main-gm")
      .insertAdjacentElement("afterend", paginationElement);
  }

  paginationElement.innerHTML = "";
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("page-button");
    if (i === currentPage) button.classList.add("active");
    button.addEventListener("click", function () {
      currentPage = i;
      displayPage(document.querySelector(".main-gm"), currentPage);
      displayPagination();
    });
    paginationElement.appendChild(button);
  }
}
