const works = document.querySelectorAll('.work');

works.forEach((work) => {

  // 랜덤 위치
  const x = Math.random() * (window.innerWidth - 180);
  const y = Math.random() * (window.innerHeight - 180);

  work.style.left = `${x}px`;
  work.style.top = `${y}px`;

  // 랜덤한 앞뒤 순서
  work.style.zIndex = Math.floor(Math.random() * 100);


  // 드래그
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;


  work.addEventListener('mousedown', (e) => {

    isDragging = true;

    offsetX = e.clientX - work.offsetLeft;
    offsetY = e.clientY - work.offsetTop;

    // 클릭한 사진을 다른 사진보다 앞으로
    work.style.zIndex = 500;

    e.preventDefault();
  });


  document.addEventListener('mousemove', (e) => {

    if (!isDragging) return;

    work.style.left = `${e.clientX - offsetX}px`;
    work.style.top = `${e.clientY - offsetY}px`;

  });


  document.addEventListener('mouseup', () => {

    isDragging = false;

  });

});