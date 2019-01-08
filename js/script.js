'use strict';

(function () {

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var contactUsBtn = document.querySelector('.contacts-btn');
  var feedBackFormPopup;
  var feedBackForm;
  var feedBackFormCloseBtn;
  var customerNameField;
  var customerEmailField;
  var customerMessageField;
  var isStorageSupport = true;
  var returnedCustomerName = '';
  var returnedCustomerEmail = '';

  try {
    returnedCustomerName = localStorage.getItem('device_customer_login');
  } catch (err) {
    isStorageSupport = false;
  }

  try {
    returnedCustomerEmail = localStorage.getItem('device_customer_email');
  } catch (err) {
    isStorageSupport = false;
  }

  var initDOMElements = function () {
    feedBackFormPopup = document.querySelector('.modal-feedback-form');
    feedBackForm = feedBackFormPopup.querySelector('.feedback-form');
    feedBackFormCloseBtn = feedBackFormPopup.querySelector('.modal-close');
    customerNameField = feedBackFormPopup.querySelector('#customer-name');
    customerEmailField = feedBackFormPopup.querySelector('#customer-email');
    customerMessageField = feedBackFormPopup.querySelector('#customer-message');
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC && typeof action === 'function') {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER && typeof action === 'function') {
      action();
    }
  };

  var showFeedBackForm = function () {
    initDOMElements();
    feedBackFormPopup.classList.add('modal-open');

    setupFormSpecificEvents();

    if (returnedCustomerName) {
      customerNameField.value = returnedCustomerName;
      customerEmailField.focus();
    }

    if (returnedCustomerEmail) {
      customerEmailField.value = returnedCustomerEmail;
      customerMessageField.focus();
    }

    if (!returnedCustomerName && !returnedCustomerEmail) {
      customerNameField.focus();
    }

  };

  var hideFeedBackForm = function () {
    feedBackFormPopup.classList.remove('modal-open');
    customerNameField.value = '';
    customerEmailField.value = '';
    customerMessageField.value = '';
    destroyFormSpecificEvents();
  };

  var feedBackFormSubmitHandler = function (evt) {
    if (!customerNameField.value) {
      evt.preventDefault();
      feedBackFormPopup.classList.add('modal-error');
      customerNameField.focus();
    } else if (!customerEmailField.value) {
      evt.preventDefault();
      feedBackFormPopup.classList.add('modal-error');
      customerEmailField.focus();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('device_customer_login', customerNameField.value);
        localStorage.setItem('device_customer_email', customerEmailField.value);
      }
    }
  };

  var feedBackFormCloseBtnKeyDownHandler = function (evt) {
    isEnterEvent(evt, hideFeedBackForm);
  };

  var feedBackFormCloseBtnClickHandler = function () {
    hideFeedBackForm();
  };

  var feedBackFormEscClickHandler = function (evt) {
    isEscEvent(evt, hideFeedBackForm);
  };

  var setupFormSpecificEvents = function () {
    feedBackForm.addEventListener('submit', feedBackFormSubmitHandler);
    feedBackFormCloseBtn.addEventListener('click', feedBackFormCloseBtnClickHandler);
    feedBackFormCloseBtn.addEventListener('keydown', feedBackFormCloseBtnKeyDownHandler);
    document.addEventListener('keydown', feedBackFormEscClickHandler);
  };

  var destroyFormSpecificEvents = function () {
    feedBackForm.removeEventListener('submit', feedBackFormSubmitHandler);
    feedBackFormCloseBtn.removeEventListener('click', feedBackFormCloseBtnClickHandler);
    feedBackFormCloseBtn.removeEventListener('keydown', feedBackFormCloseBtnKeyDownHandler);
    document.removeEventListener('keydown', feedBackFormEscClickHandler);
  };

  var contactUsBtnClickHandler = function (evt) {
    evt.preventDefault();
    showFeedBackForm();
  };

  contactUsBtn.addEventListener('click', contactUsBtnClickHandler);

})();
