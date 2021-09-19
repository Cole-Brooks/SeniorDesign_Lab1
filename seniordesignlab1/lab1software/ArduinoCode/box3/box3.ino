/*
   name: box3

   authors: Senior Design Fall 2021 Group 20

   board: Arduino Nano 33 IoT

   desc: This is the code that will run the brains of the temperature sensor for box3.

   PINOUT:

   TX:
   RX:
   RESET:
   GND:
   d2: temp sensor data
   d3: LCD rs pin
   d4: LCD enable pin
   d5: LCD D4
   d6: LCD D5
   d7: LCD D6
   d8: LCD D7
   d9:
   d10:
   d11:
   d12:
*/

// Serial port interface. Download this
#include <SPI.h>
// Wifi library. Also necessary.
#include <WiFiNINA.h>
// Email sender
//#include <EMailSender.h>
// Temp Sensor Libraries
#include <OneWire.h>
#include <DallasTemperature.h>
// display libraries
#include <LiquidCrystal.h>
// password info
#include "Secrets.h"
// Data wire is plugged into port 2 on the Arduino
#define ONE_WIRE_BUS 2
#define TEMPERATURE_PRECISION 9 // lower the precision.

// Wifi Information - You'll need to edit this
char *ssid = SECRET_SSID; // network name - change to your wifi name
char *pass = SECRET_PASS; // network password - change to your wifi password
int status = WL_IDLE_STATUS;

//// Email info - don't touch this. This is where emails will come from
//char eMailUser[] = "lab1texter@gmail.com";
//char eMailPass[] = "hitupwxqkxavkvza";
//// Recipient email/phone number. Change this so you don't spam me :)
//char eMailRecipient[] = "lab1texter@gmail.com"; // currently set to same email that sends them for testing
//char phoneRecipient[] = "7125415271@email.uscc.net"; // message me if you need help figuring this out

// Temp Sensor objects
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
int tempThreshold = 30; // CHANGE THIS AFTER YOU'RE DONE TESTING BOARD, IT'S CURRENTLY SET TO ALWAYS SEND ALERTS
int numberSensors;
float temperature;
float noSensorTemp = -127.00;

// Display Objects
int lcd_rs = 3;
int lcd_e = 4;
int lcd_d4 = 5;
int lcd_d5 = 6;
int lcd_d6 = 7;
int lcd_d7 = 8;

LiquidCrystal lcd(
  3, // Arduino pin connected to RS pin on LCD
  4, // Arduino pin connected to Enable pin on LCD
  5, // 5-8 Arduino pins connected to D4-D7 on LCD
  6,
  7,
  8
);

void connectWifi() {
  // connects the IoT device to the wifi
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to wifi network: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass); // this function from the WiFi library does the work
    // wait a second for connection
    delay(1000);
  }
  Serial.println("Connected");
  printStatus();
}

void printStatus() {
  // prints the status of the wifi
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // This device's IP address
  Serial.print("IP ADDRESS: ");
  Serial.println(WiFi.localIP());
}


void setup() {
  // Start the serial port with 9600 baud rate
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect
  }

  // start the lcd
  lcd.begin(16, 2);

  // Check for the WiFi
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("The wifi module isn't working");
    while (true);
  }

  connectWifi();

  // after wifi is set up, set up temperature sensor
  numberSensors = sensors.getDeviceCount();
}

//void sendText() {
//  char senderName[] = "lab1texter";
//  EMailSender emailSend(eMailUser, eMailPass, eMailUser, senderName);
//  EMailSender::EMailMessage msg;
//  EMailSender::Response resp;
//  Serial.println("sending text...");
//  msg.subject = "TEMP ALERT";
//  msg.message = "Temperature detected was too high! Temp: " + String(temperature, 3);
//  //  resp = emailSend.send(phoneRecipient, msg);
//  resp = emailSend.send(eMailRecipient, msg);
//  Serial.println("Sending status: ");
//  Serial.println(msg.message);
//}

void loop() {
  // check current temperature
  sensors.requestTemperatures();
  for (int i = 0; i <= numberSensors; i++) {
    // get the temperature
    temperature = sensors.getTempCByIndex(i);

    // Print to LCD
    lcd.clear();
    if (temperature == noSensorTemp) {
      // no sensor was detected
      lcd.print("Sensor unplugged");
      lcd.setCursor(0, 1);
      lcd.print("or damaged");
      lcd.setCursor(0, 0);
    }
    else {
      lcd.print("Temp: ");
      lcd.print(temperature);
      lcd.print((char)223);
      lcd.print("C");
    }

    // Turn the below logging on if you don't have the screen connected
    Serial.print(temperature);
    Serial.print((char)176);
    Serial.println("C");
  }
  Serial.println("");
//  if (temperature > tempThreshold) {
//    // if we're above the tempThreshold, send the text message
//    sendText();
//  }
  // Run the loop once per second
  delay(1000);
}
