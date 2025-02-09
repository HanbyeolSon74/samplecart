document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  addClearCartButton();
  addCheckoutButton();
});

// 장바구니 비우기 버튼
function addClearCartButton() {
  const cartContainer = document.querySelector(".shopping_cart");
  let clearCartButton = document.querySelector(".clear-cart-btn");

  if (!clearCartButton) {
    clearCartButton = document.createElement("button");
    clearCartButton.classList.add("clear-cart-btn");
    clearCartButton.textContent = "장바구니 비우기";

    const cartButtonsContainer = document.querySelector(".cart-buttons");
    if (cartButtonsContainer) {
      cartButtonsContainer.appendChild(clearCartButton);
    }
  }

  // 버튼 이벤트
  clearCartButton.addEventListener("click", () => {
    Swal.fire({
      title: "정말 비우시겠습니까?",
      text: "장바구니의 모든 상품이 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 삭제합니다!",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cartItems"); // 장바구니 비우기
        displayCartItems(); // UI 업데이트
        Swal.fire("삭제 완료!", "장바구니가 비워졌습니다.", "success");
      }
    });
  });

  clearCartButton.style.display = localStorage.getItem("cartItems")
    ? "inline-block"
    : "none";
}

// 결제하기 버튼
function addCheckoutButton() {
  const cartContainer = document.querySelector(".shopping_cart");
  let checkoutButton = document.querySelector(".checkout-btn");

  if (!checkoutButton) {
    checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-btn");
    checkoutButton.textContent = "결제하기";

    const cartButtonsContainer = document.querySelector(".cart-buttons");
    if (cartButtonsContainer) {
      cartButtonsContainer.appendChild(checkoutButton);
    }
  }

  checkoutButton.addEventListener("click", () => {
    Swal.fire({
      title: "결제 준비중!",
      text: "준비중입니다.",
      icon: "info",
      confirmButtonText: "확인",
    });
  });

  checkoutButton.style.display = localStorage.getItem("cartItems")
    ? "inline-block"
    : "none";
}

// 장바구니 표시 함수
function displayCartItems() {
  const cartContainer = document.querySelector(".shopping_cart");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("cart-empty-message");
    emptyMessage.textContent = "장바구니가 비어 있습니다.";
    cartContainer.appendChild(emptyMessage);
    return;
  }

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    const formattedPrice = parseInt(item.price).toLocaleString();

    itemDiv.innerHTML = `
      <img src="${item.picture}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>가격: ${formattedPrice}원</p>
        <p>수량: <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input"></p>
        <button class="remove-btn" data-index="${index}">삭제</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
  });

  addClearCartButton();
  addCheckoutButton();
  addEventListeners();
}

// 이벤트 리스너 추가
function addEventListeners() {
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const index = this.dataset.index;
      cartItems[index].quantity = parseInt(this.value);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const index = this.dataset.index;

      Swal.fire({
        title: "상품을 삭제할까요?",
        text: `"${cartItems[index].name}"을(를) 장바구니에서 제거합니다.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네, 삭제합니다",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          cartItems.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          displayCartItems();
          Swal.fire(
            "삭제 완료!",
            "상품이 장바구니에서 제거되었습니다.",
            "success"
          );
        }
      });
    });
  });
}
