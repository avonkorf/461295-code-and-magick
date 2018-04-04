'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var TEXT_X = 120;
var TEXT_FIRST_Y = 40;
var TEXT_SECOND_Y = 60;
var INITIAL_BAR_X = 120;
var INITIAL_BAR_Y = 250;
var GAP_BAR_X = 50;
var GAP_BAR_Y = 15;
var MAIN_USER = 'Вы';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var writeLegend = function (ctx, text, x, y) {
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

  writeLegend(ctx, 'Ура вы победили!', TEXT_X, TEXT_FIRST_Y);
  writeLegend(ctx, 'Список результатов:', TEXT_X, TEXT_SECOND_Y);

  var step = BAR_HEIGHT / getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    ctx.fillText(Math.round(times[i]), INITIAL_BAR_X + GAP_BAR_X * i, INITIAL_BAR_Y - times[i] * step - GAP_BAR_Y);

    if (players[i] === MAIN_USER) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
    }

    ctx.fillRect(INITIAL_BAR_X + GAP_BAR_X * i, INITIAL_BAR_Y, BAR_WIDTH, -times[i] * step);
    ctx.fillStyle = 'black';
    ctx.fillText(players[i], INITIAL_BAR_X + GAP_BAR_X * i, INITIAL_BAR_Y + GAP_BAR_Y);
  }
};
