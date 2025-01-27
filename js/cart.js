// 장바구니 페이지에서 물건 표시 함수
function shoppingBagCart() {
  const cartMain = document.querySelector(".shopping_cart");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // cartItems 키로 가져옴

  if (cartItems.length === 0) {
    // 장바구니가 비었을 때
    cartMain.innerHTML = "<p>쇼핑백에 담긴 제품이 없습니다</p>";
  } else {
    // 장바구니에 물건이 있을 때
    cartMain.innerHTML = cartItems
      .map(
        (item) => `
        <div class="cart-item">
          <img src="${item.picture}" alt="${item.name}" class="item-image" />
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>가격: ${parseInt(item.price).toLocaleString()}원</p>
            <div class="quantity-controls">
              <button class="decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-id="${item.id}">+</button>
            </div>
            <button class="delete" data-id="${item.id}">삭제</button>
          </div>
        </div>
      `
      )
      .join("");
  }
}

// 장바구니 페이지에서 수량 조절 및 삭제 이벤트 추가
document.addEventListener("click", (e) => {
  const target = e.target;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (target.classList.contains("increase")) {
    const id = target.dataset.id;
    cartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    shoppingBagCart();
  } else if (target.classList.contains("decrease")) {
    const id = target.dataset.id;
    cartItems = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // 수량이 0이면 삭제
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    shoppingBagCart();
  } else if (target.classList.contains("delete")) {
    const id = target.dataset.id;
    cartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    shoppingBagCart();
  }
});

// 페이지 로드 시 장바구니 내용 표시
window.onload = function () {
  shoppingBagCart(); // 이 부분을 여기서 호출하도록 변경
};
