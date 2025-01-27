// 페이지가 로드된 후 실행
window.onload = function () {
  createHeader();
  displayProducts();
};

// 헤더 생성
function createHeader() {
  const header = document.querySelector(".header-gm");

  // 로고
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const logoImg = document.createElement("img");
  logoImg.src = "/img/SleekLens.png";
  logoImg.alt = "Logo";
  logo.appendChild(logoImg);
  header.appendChild(logo);

  // 로그인
  const login = document.createElement("div");
  login.classList.add("login");
  const loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.innerText = "로그인";

  // 로그인 버튼 클릭 시 알림
  loginLink.addEventListener("click", () => {
    alert("준비중입니다");
  });

  login.appendChild(loginLink);
  header.appendChild(login);

  // 장바구니
  const cart = document.createElement("div");
  cart.classList.add("cart");
  const cartLink = document.createElement("a");

  const cartImg = document.createElement("img");
  cartImg.src = "/img/shopping_bag.png";
  cartImg.alt = "Cart";
  cartLink.appendChild(cartImg);

  // localStorage에서 cartItems 정보 가져오기
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartLink.addEventListener("click", () => {
    window.location.href = "/html/cart.html";
  });

  // 장바구니에 추가된 상품의 개수 표시
  const cartCount = document.createElement("span");
  cartCount.classList.add("cart-count");
  cartCount.innerText = cartItems.length;
  cartLink.appendChild(cartCount);

  cart.appendChild(cartLink);
  header.appendChild(cart);
}

// 본문 - 제품 표시
function displayProducts() {
  const mainElement = document.querySelector(".main-gm");

  // localStorage에서 제품 가져오기
  let savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];

  savedData.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // 장바구니 추가 버튼
    const shoppingBtn = document.createElement("button");
    shoppingBtn.innerText = "쇼핑백에 추가";

    // 버튼 눌렀을 때 장바구니에 상품 추가
    shoppingBtn.onclick = () => addShoppingCart(item);

    // 가격 쉼표 추가
    const formattedPrice = parseInt(item.price).toLocaleString();

    // 각 제품의 내용 표시
    productDiv.innerHTML = `
              <img src="${item.picture}" alt="${item.name}" class="product-img" />
              <div class="product-info">
                <h3>${item.name}</h3>
                <p>가격 ${formattedPrice}원</p>
                <p>${item.content}</p>
              </div>
            `;

    productDiv.appendChild(shoppingBtn);
    mainElement.appendChild(productDiv);
  });
}

// 장바구니에 상품 추가
function addShoppingCart(item) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // 이미 장바구니에 있는지 확인
  const productExists = cartItems.some((cartItem) => cartItem.id === item.id);

  if (!productExists) {
    cartItems.push({ ...item, quantity: 1 }); // 상품 추가 시 수량 1로 설정
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    alert("장바구니에 추가되었습니다!");
    window.location.href = "/html/cart.html"; // 장바구니 페이지로 이동
  } else {
    alert("이 상품은 이미 장바구니에 있습니다.");
  }
}

// 장바구니 아이콘 상품 갯수 업데이트
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartCount.innerText = cartItems.length;
}
