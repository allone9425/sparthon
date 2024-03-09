document.addEventListener("DOMContentLoaded", (event) => {
  const buckets = document.querySelectorAll(".bucket");
  buckets.forEach((bucket, index) => {
    // 로컬 스토리지에서 상태 읽기
    const isDone = localStorage.getItem("bucket" + index) === "done";
    if (isDone) {
      bucket.classList.add("done");
    }

    // 삭제 버튼에 클릭 이벤트 핸들러 추가
    const deleteButton = bucket.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      // 부모 요소인 버킷리스트와 함께 삭제
      bucket.remove();
      // 해당 버킷리스트 삭제 후 로컬 스토리지에서도 제거
      localStorage.removeItem("bucket" + index);
    });
  });
});

// 버킷 리스트 클릭 이벤트
const buckets = document.querySelectorAll(".bucket");
buckets.forEach((bucket, index) => {
  bucket.addEventListener("click", function () {
    // 로컬 스토리지에 상태 저장
    if (bucket.classList.contains("done")) {
      bucket.classList.remove("done");
      localStorage.removeItem("bucket" + index);
    } else {
      bucket.classList.add("done");
      localStorage.setItem("bucket" + index, "done");
      alert("달성을 축하합니다!");
    }
  });
});

// 버킷리스트 추가 버튼 기능 구현
const addButton = document.querySelector("#addBucketBtn");
addButton.addEventListener("click", function (event) {
  event.preventDefault();
  const input = document.querySelector("#bucketInput");
  const inputValue = input.value.trim();
  if (inputValue !== "") {
    const newBucket = document.createElement("div");
    newBucket.classList.add("bucket", "center");

    const bucketText = document.createElement("p");
    bucketText.textContent = inputValue;
    newBucket.appendChild(bucketText);

    // 추가된 버킷리스트에 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<img src='./Delete.png' />";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      // 부모 요소인 버킷리스트와 함께 삭제
      newBucket.remove();
      // 해당 버킷리스트 삭제 후 로컬 스토리지에서도 제거
      localStorage.removeItem("bucket" + index);
    });
    newBucket.insertBefore(deleteButton, newBucket.firstChild);

    // 새로운 버킷리스트를 flex-row wrap에 추가
    const bucketContainer = document.querySelector(".flex-row.wrap");
    bucketContainer.appendChild(newBucket);

    // 입력 필드 초기화
    input.value = "";
  }
});
