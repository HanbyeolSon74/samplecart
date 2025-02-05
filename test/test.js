document.getElementById("apple-btn").addEventListener("click", function () {
  showFruitImage("apple");
});
document.getElementById("banana-btn").addEventListener("click", function () {
  showFruitImage("banana");
});
document.getElementById("peach-btn").addEventListener("click", function () {
  showFruitImage("peach");
});
document.getElementById("grape-btn").addEventListener("click", function () {
  showFruitImage("grape");
});

function showFruitImage(fruit) {
  const fruitImage = document.getElementById("fruit-image");

  if (fruit === "apple") {
    fruitImage.src = "../test/img/사과.jpg";
    fruitImage.alt = "사과";
  } else if (fruit === "banana") {
    fruitImage.src = "../test/img/바나나.jpg";
    fruitImage.alt = "바나나";
  } else if (fruit === "peach") {
    fruitImage.src = "../test/img/복숭아.jpeg";
    fruitImage.alt = "복숭아";
  } else if (fruit === "grape") {
    fruitImage.src = "../test/img/포도.jpg";
    fruitImage.alt = "포도";
  } else {
    fruitImage.src = " ";
    fruitImage.alt = "";
  }
}
