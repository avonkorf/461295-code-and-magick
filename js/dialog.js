'use strict';
// var setup = document.querySelector('.setup');
var dialogHandle = setup.querySelector('.setup-user-pic');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  // Определение начальных координат события mousedown - нажатие по аватарке
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // Обработчик перемещения мыши
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    // Координаты смещения мыши между нажатием и текущим положением мыши
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    // Переопределение начальных координат как текущее положение мыши
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    // Обновление координат левого верхнего угла popup с учетом смещения
    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
