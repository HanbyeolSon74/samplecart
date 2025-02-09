// 테이블 생성
const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

// 다운로드 버튼 추가
const downloadButton = document.createElement("button");
downloadButton.innerText = "다운로드";
downloadButton.addEventListener("click", downloadCSV);
document.querySelector(".main-wrap").appendChild(downloadButton);

// 테이블 헤더 설정
const tr1 = document.createElement("tr");
["사진", "카테고리", "이름", "가격", "상세내용", "관리"].forEach((text) => {
  const th = document.createElement("th");
  th.innerText = text;
  tr1.appendChild(th);
});
thead.appendChild(tr1);
table.appendChild(thead);
table.appendChild(tbody);
document.querySelector(".main-wrap").appendChild(table);

let savedData = JSON.parse(localStorage.getItem("cartInfo")) || [];

// 새로고침 시 데이터 유지
window.onload = function () {
  savedData.forEach((cartInfo) => addRowToTable(cartInfo));
};

// 에러 메세지 각각 반응하기
document.getElementById("id").addEventListener("input", function () {
  checkedFailed(document.getElementById("id"));
});
document.getElementById("name").addEventListener("input", function () {
  checkedFailed(document.getElementById("name"));
});
document.getElementById("price").addEventListener("input", function () {
  checkedFailed(document.getElementById("price"));
});
document.getElementById("content").addEventListener("input", function () {
  checkedFailed(document.getElementById("content"));
});

// 이미지
const imagePaths = [
  "../img/wispy-y8.jpg",
  "../img/hush-w2.jpg",
  "../img/glitter-02.jpg",
  "../img/fishtail-br3.jpg",
  "../img/fishtail-01.jpg",
  "../img/donutbun-br3.jpg",
  "../img/donutbun-bl5.jpg",
  "../img/cheveuxdenini-p7.jpg",
  "../img/cheveuxdenini-01.jpg",
  "../img/barrette-02.jpg",
  "../img/babypony-g7.jpg",
  "../img/11001_MM107_LEATHER_LIV1.jpg",
  "../img/11001_MM107_01.jpg",
  "../img/11001_MM104_W2.jpg",
  "../img/11001_MM104_LEATHER_LK11.jpg",
  "../img/11001_MM104_LEATHER_L01.jpg",
  "../img/aba 02.jpg",
  "../img/aca 02.jpg",
  "../img/bonzo 01.jpg",
  "../img/ele 02.jpg",
  "../img/ep 02.jpg",
  "../img/ep 031.jpg",
  "../img/jf brc1.jpg",
  "../img/met 02.jpg",
  "../img/ojo gc9.jpg",
  "../img/yona 031.jpg",
];

// 저장 버튼
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveData);

// 에러 메세지
function checkedFailed(input) {
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const content = document.getElementById("content").value.trim();

  let isValid = true;

  // 에러 메시지 초기화
  document.getElementById("idred").innerText = "";
  document.getElementById("namered").innerText = "";
  document.getElementById("pricered").innerText = "";
  document.getElementById("contentred").innerText = "";

  if (input.id === "id") {
    if (!id) {
      document.getElementById("idred").innerText = "아이디를 입력하세요.";
      isValid = false;
    } else if (savedData.some((user) => user.id === id)) {
      document.getElementById("idred").innerText = "아이디가 중복됩니다.";
      isValid = false;
    }
  }

  if (input.id === "price") {
    if (!price || price < 100) {
      document.getElementById("pricered").innerText =
        "가격은 최소 100원 이상이여야 합니다.";
      isValid = false;
    }
  }

  if (input.id === "content") {
    if (!content || content.length < 10) {
      document.getElementById("contentred").innerText =
        "내용은 최소 10자 이상이어야 합니다.";
      isValid = false;
    }
  }

  saveButton.disabled = !isValid;
}

// 카테고리 선택
const categoryList = document.getElementById("category-list");
let selectedCategory = "Glasses"; // 기본 선택값은 안경으로 설정

// 카테고리 항목 클릭 시 선택된 카테고리 변경
categoryList.addEventListener("click", function (event) {
  const clickedItem = event.target;
  if (clickedItem.classList.contains("category-dot")) {
    selectedCategory = clickedItem.getAttribute("data-category");

    // 모든 항목에서 선택된 상태 제거
    const items = categoryList.querySelectorAll(".category-dot");
    items.forEach((item) => item.classList.remove("selected"));

    // 선택된 항목에 스타일 적용
    clickedItem.classList.add("selected");
  }
});

// 저장 버튼 기능 수정
function saveData() {
  const idElement = document.getElementById("id");
  const nameElement = document.getElementById("name");
  const priceElement = document.getElementById("price");
  const contentElement = document.getElementById("content");

  const id = idElement.value.trim();
  const name = nameElement.value.trim();
  const price = priceElement.value.trim();
  const content = contentElement.value.trim();

  // 유효성 검사
  if (!id) {
    alert("아이디를 입력하세요.");
    return;
  }
  if (savedData.some((cart) => cart.id === id)) {
    alert("아이디가 중복됩니다.");
    return;
  }
  if (!name) {
    alert("이름을 입력하세요.");
    return;
  }
  if (!price || parseInt(price) < 100) {
    alert("가격은 최소 100원 이상이어야 합니다.");
    return;
  }
  if (!content || content.length < 10) {
    alert("내용은 최소 10자 이상이어야 합니다.");
    return;
  }

  const categoryElement = document.querySelector(".category-dot.selected");
  const selectedCategory = categoryElement
    ? categoryElement.getAttribute("data-category")
    : "Glasses"; // 기본값 안경

  const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];

  const cartInfo = {
    id: id,
    picture: randomImage,
    category: selectedCategory,
    name: name,
    price: parseInt(price),
    content: content,
  };

  savedData.push(cartInfo);
  localStorage.setItem("cartInfo", JSON.stringify(savedData));

  addRowToTable(cartInfo);

  // 입력 필드 초기화
  idElement.value = "";
  nameElement.value = "";
  priceElement.value = "";
  contentElement.value = "";
  saveButton.disabled = true;
}

// 테이블 행 추가
function addRowToTable(cartInfo) {
  const tr = document.createElement("tr");

  // 이미지 추가
  const tdImage = document.createElement("td");
  const img = document.createElement("img");
  img.src = cartInfo.picture;
  tdImage.appendChild(img);
  tr.appendChild(tdImage);

  // 카테고리 추가
  const tdCategory = document.createElement("td");
  tdCategory.innerText = cartInfo.category;
  tr.appendChild(tdCategory);

  // 이름, 가격, 내용
  ["name", "price", "content"].forEach((key, index) => {
    const td = document.createElement("td");
    if (key === "price") {
      td.innerText = parseInt(cartInfo[key]).toLocaleString(); // 가격에 쉼표 추가
    } else {
      td.innerText = cartInfo[key];
    }
    tr.appendChild(td);
  });

  // 관리 버튼 추가
  // 수정
  const tdManage = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정";
  editBtn.onclick = () => editRow(cartInfo, tr);
  tdManage.appendChild(editBtn);

  // 삭제 버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.onclick = () => remove_tr(deleteBtn);
  tdManage.appendChild(deleteBtn);

  tr.appendChild(tdManage);
  tbody.appendChild(tr);
}

// 수정
function editRow(cartInfo, row) {
  const categoryCell = row.cells[1]; // 카테고리 셀
  const nameCell = row.cells[2];
  const priceCell = row.cells[3];
  const contentCell = row.cells[4];

  // 기존 값 저장
  const originalCategory = categoryCell.innerText;
  const originalName = nameCell.innerText;
  const originalPrice = priceCell.innerText;
  const originalContent = contentCell.innerText;

  // 입력 필드 생성
  const categorySelect = document.createElement("select");
  ["glasses", "sunglasses"].forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.innerText = optionValue;
    if (optionValue === originalCategory) option.selected = true;
    categorySelect.appendChild(option);
  });

  const nameInput = document.createElement("input");
  const priceInput = document.createElement("input");
  const contentInput = document.createElement("input");

  nameInput.type = "text";
  priceInput.type = "number";
  contentInput.type = "text";

  nameInput.value = originalName;
  priceInput.value = parseInt(originalPrice.replace(/,/g, ""), 10) || ""; // 기존 값 유지
  contentInput.value = originalContent;

  // 기존 셀 내용을 지우고 입력 필드 추가
  categoryCell.innerHTML = "";
  nameCell.innerHTML = "";
  priceCell.innerHTML = "";
  contentCell.innerHTML = "";

  categoryCell.appendChild(categorySelect);
  nameCell.appendChild(nameInput);
  priceCell.appendChild(priceInput);
  contentCell.appendChild(contentInput);

  // 테이블 각 셀 밑에 에러메세지
  const nameError = document.createElement("div");
  const priceError = document.createElement("div");
  const contentError = document.createElement("div");

  nameError.className = "error";
  priceError.className = "error";
  contentError.className = "error";

  nameCell.appendChild(nameError);
  priceCell.appendChild(priceError);
  contentCell.appendChild(contentError);

  // 실시간 오류 메세지
  nameInput.addEventListener("input", () => {
    validateField(nameInput, "name", nameError);
  });
  priceInput.addEventListener("input", () => {
    validateField(priceInput, "price", priceError);
  });
  contentInput.addEventListener("input", () => {
    validateField(contentInput, "content", contentError);
  });

  // 수정 버튼 변경
  const editBtn = row.cells[5].querySelector("button");
  editBtn.innerText = "수정완료";

  editBtn.onclick = () => {
    const newCategory = categorySelect.value;
    const newName = nameInput.value.trim();
    const newPrice = priceInput.value.trim()
      ? parseInt(priceInput.value.trim(), 10)
      : parseInt(originalPrice.replace(/,/g, ""), 10); // 빈 값이면 기존 값 유지
    const newContent = contentInput.value.trim();

    let isValid = true;

    if (newName === "" || newPrice < 100 || newContent.length < 10) {
      alert("올바른 값을 입력하세요.");
      isValid = false;
    }

    if (!isValid) return;

    // 수정된 데이터 저장
    cartInfo.category = newCategory;
    cartInfo.name = newName;
    cartInfo.price = newPrice;
    cartInfo.content = newContent;

    localStorage.setItem("cartInfo", JSON.stringify(savedData));

    // UI 업데이트
    categoryCell.innerText = newCategory;
    nameCell.innerText = newName;
    priceCell.innerText = newPrice.toLocaleString();
    contentCell.innerText = newContent;

    editBtn.innerText = "수정";
    editBtn.onclick = () => editRow(cartInfo, row);
  };
}

// 삭제버튼 클릭시 행 삭제
function remove_tr(This) {
  const row = This.closest("tr");
  const id = row.cells[2].innerText;

  savedData = savedData.filter((cart) => cart.name !== id);
  localStorage.setItem("cartInfo", JSON.stringify(savedData));
  row.remove();
}

// 조건 검사
function validateField(input, type, errorElement) {
  const value = input.value.trim();
  let isValid = true;

  errorElement.innerText = "";

  if (type === "id") {
    if (!value) {
      errorElement.innerText = "아이디를 입력하세요.";
      isValid = false;
    } else if (savedData.some((cart) => cart.id === value)) {
      errorElement.innerText = "아이디가 중복됩니다.";
      isValid = false;
    }
  }

  if (type === "price") {
    if (!value || value < 100) {
      errorElement.innerText = "가격은 최소 100원 이상이어야 합니다.";
      isValid = false;
    }
  }

  if (type === "content") {
    if (!value || value.length < 10) {
      errorElement.innerText = "내용은 최소 10자 이상이어야 합니다.";
      isValid = false;
    }
  }

  return isValid;
}

// 테이블 데이터 CSV 다운로드
function downloadCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "사진,카테고리,이름,가격,상세내용\n"; // 헤더 추가

  savedData.forEach((cartInfo) => {
    let row = `${cartInfo.picture},${cartInfo.category},${cartInfo.name},${cartInfo.price},${cartInfo.content}`;
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "cart_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
