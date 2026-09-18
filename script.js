const works = document.querySelectorAll('.work');
const menu = document.querySelector('.menu');


// 모바일인지 확인
function isMobile() {
  return window.innerWidth <= 768;
}


// 사진이 메뉴와 겹치는지 확인
function overlapsMenu(x, y, width, height) {

  const menuRect = menu.getBoundingClientRect();

  return (
    x < menuRect.right &&
    x + width > menuRect.left &&
    y < menuRect.bottom &&
    y + height > menuRect.top
  );
}


// 사진 랜덤 배치
function placeRandomly(work) {

  const width = work.offsetWidth;
  const height = work.offsetHeight;

  let x;
  let y;

  let attempts = 0;

  do {

    x = Math.random() * (window.innerWidth - width);
    y = Math.random() * (window.innerHeight - height);

    attempts++;

    // 너무 많은 시도를 하면 종료
    if (attempts > 1000) {
      break;
    }

  } while (
    isMobile() &&
    overlapsMenu(x, y, width, height)
  );


  work.style.left = `${x}px`;
  work.style.top = `${y}px`;

  // 랜덤한 앞뒤 순서
  work.style.zIndex = Math.floor(Math.random() * 100);
}


// 모든 사진 랜덤 배치
works.forEach((work) => {

  // 이미지가 로드된 후 크기를 계산
  if (work.complete) {
    placeRandomly(work);
  } else {
    work.addEventListener('load', () => {
      placeRandomly(work);
    });
  }


  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;


  // --------------------------------
  // 드래그 시작
  // --------------------------------

  work.addEventListener('pointerdown', (e) => {

    isDragging = true;

    offsetX = e.clientX - work.offsetLeft;
    offsetY = e.clientY - work.offsetTop;

    // 선택한 사진을 가장 앞으로
    work.style.zIndex = 500;

    // 모바일에서도 손가락을 계속 추적
    work.setPointerCapture(e.pointerId);

    e.preventDefault();
  });


  // --------------------------------
  // 드래그
  // --------------------------------

  work.addEventListener('pointermove', (e) => {

    if (!isDragging) return;


    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;


    // 화면 밖으로 너무 나가지 않게
    newX = Math.max(
      0,
      Math.min(newX, window.innerWidth - work.offsetWidth)
    );

    newY = Math.max(
      0,
      Math.min(newY, window.innerHeight - work.offsetHeight)
    );


    // 모바일에서는 메뉴 영역을 침범하지 못하게
    if (
      isMobile() &&
      overlapsMenu(
        newX,
        newY,
        work.offsetWidth,
        work.offsetHeight
      )
    ) {

      return;

    }


    work.style.left = `${newX}px`;
    work.style.top = `${newY}px`;

  });


  // --------------------------------
  // 드래그 종료
  // --------------------------------

  work.addEventListener('pointerup', (e) => {

    isDragging = false;

    work.releasePointerCapture(e.pointerId);

  });


  work.addEventListener('pointercancel', () => {

    isDragging = false;

  });

});