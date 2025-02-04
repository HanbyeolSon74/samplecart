document.addEventListener("DOMContentLoaded", function () {
  displayCartItems(); // 먼저 장바구니 항목 표시
  addClearCartButton(); // 장바구니 비우기 버튼 추가
  addCheckoutButton(); // 결제하기 버튼 추가
});

// 장바구니 비우기 버튼을 JavaScript로 생성
function addClearCartButton() {
  const cartContainer = document.querySelector(".shopping_cart");
  let clearCartButton = document.querySelector(".clear-cart-btn");

  // 버튼이 이미 존재하면 다시 만들지 않음
  if (!clearCartButton) {
    clearCartButton = document.createElement("button");
    clearCartButton.classList.add("clear-cart-btn");
    clearCartButton.textContent = "장바구니 비우기";

    // .cart-buttons 컨테이너 안에 버튼을 추가합니다.
    const cartButtonsContainer = document.querySelector(".cart-buttons");
    if (cartButtonsContainer) {
      cartButtonsContainer.appendChild(clearCartButton);
    }
  }

  // 버튼 이벤트
  clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("cartItems"); // 장바구니 비우기
    displayCartItems(); // UI 업데이트
  });

  // 장바구니가 비어있지 않으면 보이게 함
  clearCartButton.style.display = localStorage.getItem("cartItems")
    ? "inline-block"
    : "none";
}

// 결제하기 버튼을 JavaScript로 생성
function addCheckoutButton() {
  const cartContainer = document.querySelector(".shopping_cart");
  let checkoutButton = document.querySelector(".checkout-btn");

  // 버튼이 이미 존재하면 다시 만들지 않음
  if (!checkoutButton) {
    checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-btn");
    checkoutButton.textContent = "결제하기";

    // .cart-buttons 컨테이너 안에 버튼을 추가합니다.
    const cartButtonsContainer = document.querySelector(".cart-buttons");
    if (cartButtonsContainer) {
      cartButtonsContainer.appendChild(checkoutButton);
    }
  }

  // 버튼 이벤트
  checkoutButton.addEventListener("click", () => {
    alert("결제 준비중 입니다.");
  });

  // 장바구니가 비어있지 않으면 보이게 함
  checkoutButton.style.display = localStorage.getItem("cartItems")
    ? "inline-block"
    : "none";
}

// 장바구니 항목 표시 함수
function displayCartItems() {
  const cartContainer = document.querySelector(".shopping_cart");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartContainer.innerHTML = ""; // 기존 내용 초기화

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

  // 버튼 상태 업데이트
  addClearCartButton();
  addCheckoutButton();
  addEventListeners();
}

// 이벤트 리스너 추가
function addEventListeners() {
  // 수량 변경 이벤트
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const index = this.dataset.index;
      cartItems[index].quantity = parseInt(this.value);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });

  // 삭제 버튼 이벤트
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const index = this.dataset.index;
      cartItems.splice(index, 1); // 해당 아이템 삭제
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems(); // UI 업데이트
    });
  });
}
