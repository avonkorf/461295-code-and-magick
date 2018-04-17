'use strict';

var WIZARD_PROPERTIES = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор',
    'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
    'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'],
  EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARD_QUANTITY = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Генерация случайных чисел
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Создание одного волшебника со случайными свойствами
var createWizard = function (properties) {
  return {
    name: getRandomElement(properties.FIRST_NAMES) + ' ' + getRandomElement(properties.LAST_NAMES),
    coatColor: getRandomElement(properties.COAT_COLORS),
    eyesColor: getRandomElement(properties.EYE_COLORS)
  };
};

// Создание массива объектов из волшебников
var createWizards = function (properties, quantity) {
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    wizards.push(createWizard(properties));
  }

  return wizards;
};

// Создание DOM-элементов с использованием шаблона на основе массива объектов
var addWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var wizardElement = similarWizardTemplate.content.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Добавление созданных DOM-элементов в виде фрагмента в блок страницы
var renderSimilarWizards = function (parentElement, wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(addWizard(wizards[i]));
  }

  parentElement.appendChild(fragment);
};

var onSetupCloseEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userName) {
    closePopup();
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var onSetupCloseClick = function () {
  closePopup();
};

var onWizardEyesClick = function () {
  var newColor = getRandomElement(WIZARD_PROPERTIES.EYE_COLORS);
  wizardEyes.style = 'fill: ' + newColor;
  setupWizardEyesNewColor.value = newColor;
};

var onWizardCoatClick = function () {
  var newColor = getRandomElement(WIZARD_PROPERTIES.COAT_COLORS);
  wizardCoat.style = 'fill: ' + newColor;
  setupWizardCoatNewColor.value = newColor;
};
var onFireBallClick = function () {
  var newColor = getRandomElement(FIREBALL_COLORS);
  fireball.style.background = newColor;
  setupFireballNewColor.value = newColor;
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupCloseEscPress);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  fireball.addEventListener('click', onFireBallClick);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupCloseEscPress);
  setupClose.removeEventListener('click', onSetupCloseClick);
  setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  fireball.removeEventListener('click', onFireBallClick);
};

var wizards = createWizards(WIZARD_PROPERTIES, WIZARD_QUANTITY);
var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
renderSimilarWizards(similarListElement, wizards);

// Аватарка
var setupOpen = document.querySelector('.setup-open');

// Окно настройки
// Кнопка закрытия окна
var setupClose = setup.querySelector('.setup-close');
// Поле ввода имени пользователя
var userName = setup.querySelector('.setup-user-name');
// Настройки волшебника
var wizard = setup.querySelector('.setup-wizard-appearance');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardCoat = wizard.querySelector('.wizard-coat');
var setupWizardEyesNewColor = wizard.querySelectorAll('input[name$="eyes-color"]');
var setupWizardCoatNewColor = wizard.querySelectorAll('input[name$="coat-color"]');
// Настройки файерболла
var fireball = setup.querySelector('.setup-fireball-wrap');
var setupFireballNewColor = fireball.querySelectorAll('input[name$="fireball-color"]');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setup.querySelector('.setup-similar').classList.remove('hidden');
