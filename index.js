//Q7.
// books.js


function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}


Book.prototype.getSummary = function() {
    return `${this.title} by ${this.author}, published in ${this.year}`;
};

const library = [
    new Book("To Kill a Mockingbird", "Harper Lee", 1960),
    new Book("1984", "George Orwell", 1949),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925)
];

module.exports = library;


// app.js


const library = require('./books');

const summaries = library.map(book => book.getSummary());

summaries.forEach(summary => console.log(summary));

// Q8
// Book Constructor
function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
  }
  
  // Member Constructor
  function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
  }
  
  // Borrow Book Method
  Member.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
      if (this.borrowedBooks.length < 3) {
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} borrowed "${book.title}".`);
      } else {
        console.log(`${this.name} cannot borrow more than 3 books.`);
      }
    } else {
      console.log(`"${book.title}" is already borrowed.`);
    }
  };
  
  // Premium Member Constructor
  function PremiumMember(name) {
    Member.call(this, name); // Inherit Member properties
    this.specialCollectionAccess = true;
  }
  
  // Inherit Member Prototype
  PremiumMember.prototype = Object.create(Member.prototype);
  PremiumMember.prototype.constructor = PremiumMember;
  
  // Override borrowBook Method for PremiumMember
  PremiumMember.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
      if (this.borrowedBooks.length < 5) {
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} borrowed "${book.title}" (Premium Member).`);
      } else {
        console.log(`${this.name} cannot borrow more than 5 books.`);
      }
    } else {
      console.log(`"${book.title}" is already borrowed.`);
    }
  };
  
  // Demonstrate the functionality
  // Creating book objects
  const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
  const book2 = new Book("1984", "George Orwell");
  const book3 = new Book("To Kill a Mockingbird", "Harper Lee");
  const book4 = new Book("Pride and Prejudice", "Jane Austen");
  const book5 = new Book("Moby-Dick", "Herman Melville");
  
  // Creating regular and premium members
  const member1 = new Member("Alice");
  const premiumMember1 = new PremiumMember("Bob");
  
  // Regular member borrowing books
  member1.borrowBook(book1);
  member1.borrowBook(book2);
  member1.borrowBook(book3);
  member1.borrowBook(book4); // This should trigger the limit for regular members
  
  // Premium member borrowing books
  premiumMember1.borrowBook(book1);
  premiumMember1.borrowBook(book2);
  premiumMember1.borrowBook(book3);
  premiumMember1.borrowBook(book4);
  premiumMember1.borrowBook(book5);


//  Q.9 Device constructor
function Device(name, type) {
    this.name = name;
    this.type = type;
    this.status = false; // Initially off
}

Device.prototype.turnOn = function() {
    this.status = true;
};

Device.prototype.turnOff = function() {
    this.status = false;
};

Device.prototype.checkStatus = function() {
    return this.status ? "On" : "Off";
};

// SmartHome constructor
function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
}

SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
};

SmartHome.prototype.removeDevice = function(deviceName) {
    this.devices = this.devices.filter(device => device.name !== deviceName);
};

SmartHome.prototype.listDevices = function() {
    return this.devices.map(device => `${device.name}: ${device.checkStatus()}`);
};

// SmartDevice constructor (inherits from Device)
function SmartDevice(name, type, connectivity) {
    Device.call(this, name, type);
    this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

SmartDevice.prototype.updateFirmware = async function() {
    // Simulate firmware update with a promise
    return new Promise(resolve => {
        setTimeout(() => resolve("Firmware updated"), 2000);
    });
};

SmartDevice.prototype.checkConnectivity = function() {
    return this.connectivity;
};

// SmartLight constructor (inherits from SmartDevice)
function SmartLight(name, brightness, color) {
    SmartDevice.call(this, name, "light", "online");
    this.brightness = brightness;
    this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.adjustBrightness = function(level) {
    this.brightness = level;
};

SmartLight.prototype.changeColor = function(newColor) {
    this.color = newColor;
};

// SmartThermostat constructor (inherits from SmartDevice)
function SmartThermostat(name, temperature, mode) {
    SmartDevice.call(this, name, "thermostat", "online");
    this.temperature = temperature;
    this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function(temp) {
    this.temperature = temp;
};

SmartThermostat.prototype.setMode = function(newMode) {
    this.mode = newMode;
};

// User constructor for authentication and profile management
function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = new SmartHome(username);
}

User.prototype.authenticate = async function() {
    // Simulate authentication with a promise
    return new Promise(resolve => {
        setTimeout(() => resolve("User authenticated"), 1000);
    });
};

User.prototype.addDeviceToHome = function(device) {
    this.smartHome.addDevice(device);
};

User.prototype.removeDeviceFromHome = function(deviceName) {
    this.smartHome.removeDevice(deviceName);
};

// Example usage
const user = new User("Alice", "password123");
const light = new SmartLight("Living Room Light", 70, "warm white");
const thermostat = new SmartThermostat("Main Thermostat", 22, "heat");

user.addDeviceToHome(light);
user.addDeviceToHome(thermostat);

console.log(user.smartHome.listDevices()); // Lists all devices

// Update firmware
light.updateFirmware().then(console.log); // "Firmware updated"


// Q 10. Base class User
class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
   
    getDetails = () => {
      console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
  }
  
  
  class Student extends User {
    constructor(name, email, studentId) {
      super(name, email);
      this.studentId = studentId;
    }
  
   
    enroll = () => {
      console.log(`Student ${this.name} enrolled.`);
    }
  }
  
  class Instructor extends User {
    constructor(name, email, instructorId) {
      super(name, email);
      this.instructorId = instructorId;
    }
  
  
    assignGrade = (student) => {
      console.log(`Instructor ${this.name} assigned a grade to ${student.name}.`);
    }
  }
  


  const student = new Student('Prachi', 'Prachi@example.com', 'S123');
  const instructor = new Instructor('Deepak', 'Deepak@example.com', 'I456');
  
 
  student.getDetails();      
  student.enroll();         
  instructor.getDetails();    
  instructor.assignGrade(student); 
