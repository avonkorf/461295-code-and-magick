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

var WIZARD_QUANTITY = 4;

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

var wizards = createWizards(WIZARD_PROPERTIES, WIZARD_QUANTITY);
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');

userDialog.classList.remove('hidden');
renderSimilarWizards(similarListElement, wizards);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
