const { EventEmitter } = require("events");

class PhoneBook extends EventEmitter {
  constructor(phoneNumber) {
    super();
    this.phoneNumber = phoneNumber;
  }

  addContact(phoneNumber) {
    this.on(phoneNumber, (message) => {
      console.log(
        `[message from ${this.phoneNumber} to ${phoneNumber}]: ${message}`
      );
    });
  }

  sendTextMessage(toPhoneNumber, message) {
    this.emit(toPhoneNumber, message);
  }
}

const myPhoneBook = new PhoneBook("123-123-1234");

myPhoneBook.addContact("222-222-2222");
myPhoneBook.sendTextMessage("222-222-2222", "Hey, whats up");
