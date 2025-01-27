// 테이블
const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

// 테이블 헤더 생성
const tr1 = document.createElement("tr");
["사진", "이름", "가격", "상세내용", "관리"].forEach((text) => {
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
  "../img/fishtail-br3,jpg",
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

// 저장 버튼
function saveData() {
  const idElement = document.getElementById("id");
  const nameElement = document.getElementById("name");
  const priceElement = document.getElementById("price");
  const contentElement = document.getElementById("content");

  const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];

  const cartInfo = {
    id: idElement.value.trim(),
    picture: randomImage,
    name: nameElement.value.trim(),
    price: priceElement.value.trim(),
    content: contentElement.value.trim(),
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
  img.art = "사진";
  img.style.width = "50px";
  img.style.height = "50px";
  tdImage.appendChild(img);
  tr.appendChild(tdImage);

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

  // 관리 버튼
  const tdManage = document.createElement("td");

  // 수정 버튼
  const editBtn = document.createElement("button");
  editBtn.innerHTML = "수정";
  editBtn.onclick = () => editRow(cartInfo, tr);
  tdManage.appendChild(editBtn);

  //삭제 버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.onclick = () => remove_tr(deleteBtn);
  tdManage.appendChild(deleteBtn);

  tr.appendChild(tdManage);
  tbody.appendChild(tr);
}

// 수정
// 이름, 가격, 내용
function editRow(cartInfo, row) {
  const nameCell = row.cells[1];
  const priceCell = row.cells[2];
  const contentCell = row.cells[3];

  const originalName = nameCell.innerText;
  const originalPrice = priceCell.innerText;
  const originalContnet = contentCell.innerText;

  const nameInput = document.createElement("input");
  const priceInput = document.createElement("input");
  const contentInput = document.createElement("input");

  nameInput.type = "text";
  priceInput.type = "number";
  contentInput.type = "text";

  nameInput.value = originalName;
  priceInput.value = originalPrice;
  contentInput.value = originalContnet;

  nameCell.innerHTML = "";
  priceCell.innerHTML = "";
  contentCell.innerHTML = "";

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

  // 수정완료버튼
  const editBtn = row.cells[4].querySelector("button");
  editBtn.innerText = "수정완료";

  editBtn.onclick = () => {
    const newName = nameInput.value.trim();
    const newPrice = parseInt(priceInput.value.trim());
    const newContent = contentInput.value.trim();

    let isValid = true;

    // 최종 검증
    isValid =
      validateField(nameInput, "name", nameError) &
      validateField(priceInput, "price", priceError) &
      validateField(contentInput, "content", contentError);

    if (!isValid) return;

    // 로컬스토리지 수정

    nameCell.innerHTML = newName;
    priceCell.innerHTML = newPrice;
    contentCell.innerHTML = newContent;

    cartInfo.name = newName;
    cartInfo.price = newPrice;
    cartInfo.content = newContent;
    localStorage.setItem("cartInfo", JSON.stringify(savedData));

    editBtn.innerText = "수정";
    editBtn.onclick = () => editRow(cartInfo, row);
  };
}

// 삭제버튼 클릭시 행 삭제
function remove_tr(This) {
  const row = This.closest("tr");
  const id = row.cells[1].innerText;

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
