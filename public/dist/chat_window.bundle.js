/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/chat_window.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/chat_window.js":
/*!**********************************!*\
  !*** ./public/js/chat_window.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ChatWindow extends HTMLElement {\n\n  constructor () {\n    super();\n    this.socket = null\n  }\n\n  connectedCallback () {\n    this.renderChatWindow()\n    this.setGlobalValues()\n    this.addEventListeners()\n    this.addSocketEventListeners()\n  }\n\n  disConnectedCallback () {\n    this.socket.disconnect();\n  }\n\n  renderChatWindow () {\n    this.innerHTML = /*html*/`\n      <div class=\"col-md-3 bg-secondary\"></div>\n      <div class=\"col-md-9\">\n        <div class=\"container justify-content-center bg-aero\">\n          <h1 id=\"welcome-message\">Chat App</h1>\n          <div id='message-list' class=\"mb-3\">\n            <div class=\"card mb-2 p-2\">This is the first message</div>\n          </div>\n          <form id=\"message-form\">\n            <div class=\"mb-3\">\n              <textarea placeholder=\"Message\" id=\"message\" style=\"width: 30rem;\"></textarea>\n            </div>\n            <input type=\"submit\" value=\"Submit\" class=\"btn btn-primary\"></input>\n          </form>\n          <button id=\"send-location\" class=\"btn btn-secondary\">Send Location</button>\n        </div>\n      </div>\n    `\n  }\n\n  setGlobalValues () {\n    this.messageForm = document.getElementById('message-form')\n    this.messageFormInput = this.messageForm.querySelector('input')\n    this.messageFormTextarea = this.messageForm.querySelector('textarea')\n    this.locationBtn = document.getElementById('send-location')\n  }\n\n  addEventListeners () {\n    this.messageForm.addEventListener('submit', this.sendMessage.bind(this))\n    this.locationBtn.addEventListener('click', this.sendLocation.bind(this))\n  }\n\n  addSocketEventListeners () {\n    this.socket.on('message', (message) => {\n      console.log(message.text);\n    })\n\n    this.socket.on('message-sent', (message) => {\n      document.getElementById('message-list').innerHTML += `<div class=\"card mb-2 p-2\"><span>${message.username}</span><span>${moment(message.createdAt).format('H:mm')} - ${message.text}</span></div>`\n    })\n\n    this.socket.on('location-message', (location) => {\n      document.getElementById('message-list').innerHTML += `\n        <div class=\"card mb-2 p-2 d-block\">\n          <span>${moment(location.createdAt).format('H:mm')} - </span>\n          <a href=\"${location.text}\" target=\"_blank\">This is my location</a>\n        </div>`\n    })\n\n    this.socket.on('roomdata', (roomdata) => {\n      console.log(roomdata.users);\n    })\n  }\n\n  sendMessage (e) {\n    e.preventDefault()\n    this.messageFormInput.disabled = true\n\n    let message_text = this.messageFormTextarea.value\n    this.messageFormTextarea.value = ''\n    this.messageFormTextarea.focus()\n    this.socket.emit('send-message', message_text, () => {\n      this.messageFormInput.disabled = false\n    })\n  }\n\n  sendLocation (e) {\n    this.locationBtn.disabled = true\n    navigator.geolocation.getCurrentPosition((position) => {\n      this.socket.emit('send-location', {\n          latitude: position.coords.latitude,\n          longitude: position.coords.longitude\n      }, (message) => {\n        console.log(message);\n        this.locationBtn.disabled = false\n      })\n    });\n  }\n}\n\ncustomElements.define('chat-window', ChatWindow)\n\n//# sourceURL=webpack:///./public/js/chat_window.js?");

/***/ })

/******/ });