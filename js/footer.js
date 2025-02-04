// footer.js
document.addEventListener("DOMContentLoaded", function () {
  createFooter(); // 푸터 생성 함수 호출
});

function createFooter() {
  const footer = document.querySelector(".footer-gm");
  footer.innerHTML = "";
  const footerContent = document.createElement("div");
  footerContent.classList.add("footer-content");
  const footerData = {
    "고객 서비스": [
      "문의",
      "배송",
      "서비스",
      "교환 및 반품",
      "주문조회",
      "주문취소",
      "매장 픽업 서비스",
      "수리서비스 가이드",
      "제품 사용 가이드",
      "정품 인증",
      "FAQ",
    ],
    "법적 고지": ["공지사항", "이용약관", "쿠키 정책"],
    "개인정보 처리방침": ["쿠키 정책", "기프트카드 이용약관"],
    "소셜 미디어": [
      "페이스북",
      "인스타그램",
      "유튜브",
      "X",
      "카카오톡",
      "핀터레스트",
      "위챗",
      "웨이보",
    ],
  };
  for (const category in footerData) {
    const categorySection = document.createElement("div");
    categorySection.classList.add("footer-category");
    const categoryTitle = document.createElement("h4");
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);
    const itemList = document.createElement("ul");
    footerData[category].forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      itemList.appendChild(listItem);
    });
    categorySection.appendChild(itemList);
    footerContent.appendChild(categorySection);
  }
  const footerText = document.createElement("p");
  footerText.innerText = "© 2025 Sleek Lens. All rights reserved.";
  footerText.classList.add("footer-text");
  const footerTextContainer = document.createElement("div");
  footerTextContainer.classList.add("footer-text-container");
  footerTextContainer.appendChild(footerText);
  footerContent.appendChild(footerTextContainer);
  footer.appendChild(footerContent);
}
