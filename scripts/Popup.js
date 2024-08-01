export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    console.log("Popup.open");
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    // console.log("Popup.close");
  }

  _handleEscClose(key) {
    if (key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // const closeButton = document.querySelector(".popup__close");

    // closeButton.addEventListener("click", () => {
    //   this.close();
    //   console.log("Popup.closeButton");
    // });

    this._popup.addEventListener("click", () => {
      this.close();
      console.log("Popup.click");
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt.key);
      console.log("Popup.keydown");
    });
  }
}
