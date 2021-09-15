/*
   Arduino Nano 33 IoT WiFi Test
   Tests operability of wifi module onboard arduino
   Results are posted to serial monitor

   Cole Brooks 2021
   Hongyu Zeng 2021
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

// Data wire is plugged into port 2 on the Arduino
#define ONE_WIRE_BUS 2
#define TEMPERATURE_PRECISION 9 // lower the precision.

// Wifi Information - You'll need to edit this
char ssid[] = "Golden Legendary"; // network name - change to your wifi name
char pass[] = "ZJCZHY2000"; // network password - change to your wifi password

// Email info - don't touch this. This is where emails will come from
//char eMailUser[] = "lab1texter@gmail.com";
//char eMailPass[] = "hitupwxqkxavkvza";

// Recipient email/phone number. Change this so you don't spam me :)
//char eMailRecipient[] = "zdszym@me.com"; // currently set to same email that sends them for testing
//char phoneRecipient[] = "3193839547@txt.att.net"; // message me if you need help figuring this out

// Temp Sensor objects
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Wifi
WiFiSSLClient client;
int status = WL_IDLE_STATUS;

int numberSensors;
float temperature;
int tempThreshold = 70; // CHANGE THIS AFTER YOU'RE DONE TESTING BOARD, IT'S CURRENTLY SET TO ALWAYS SEND ALERTS

void connectWifi() {
  // connects the IoT device to the wifi
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to wifi network: ");
    Serial.println(ssid);

    status = WiFi.begin(ssid, pass); // this function from the WiFi library does the work

    // wait a second for connection
    delay(1000);
    Serial.println("Connected...");

    // prints the status of the wifi
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());

    // This device's IP address
    Serial.print("IP ADDRESS: ");
    Serial.println(WiFi.localIP());
  }
}

void printStatus() {
  // prints the status of the wifi
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // This device's IP address
  Serial.print("IP ADDRESS: ");
  Serial.println(WiFi.localIP());
}

//void sendText() {
//  char senderName[] = "lab1texter";
//  EMailSender emailSend(eMailUser, eMailPass, eMailUser, senderName);
//  EMailSender::EMailMessage msg;
//  EMailSender::Response resp;
//  Serial.println("sending text...");
//  msg.subject = "TEMP ALERT";
//  msg.message = "Temp sensed above temp threshold";
//  resp = emailSend.send(phoneRecipient, msg);
//  // resp = emailSend.send(eMailRecipient, msg);
//
//  Serial.println("Sending status: ");
//  Serial.print(resp.status);
//  Serial.println(resp.code);
//  Serial.println(resp.desc);
//  Serial.println("");
//  Serial.print("FROM: ");
//  Serial.println(eMailUser);
//  Serial.print("TO: ");
//  Serial.println(phoneRecipient);
//  Serial.print("DATA:");
//  Serial.println("Temp sensed above temp threshold");
//  Serial.println("");
//}

void setup() {
  // Start the serial port with 9600 baud rate
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect
  }

  //   Check for the WiFi
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("The wifi module isn't working");
    while (true);
  }

  connectWifi();

  // after wifi is set up, set up temperature sensor
  numberSensors = sensors.getDeviceCount();
  Serial.print(numberSensors);
  Serial.println(" sensors found");
}

void loop() {
  // check current temperature
  sensors.requestTemperatures();
  for (int i = 0; i <= numberSensors; i++) {
    // Print the temp. If you see -196 that means your wiring is done wrong.
    Serial.print("Temp: ");
    temperature = sensors.getTempCByIndex(i);
    Serial.print(DallasTemperature::toFahrenheit(temperature));
    Serial.print((char)176);
    Serial.println("F");
  }
  Serial.println("");
  if (DallasTemperature::toFahrenheit(temperature) > tempThreshold) {
    // if we're above the tempThreshold, send the text message
    // sendText();
  }
  // Run the loop once per second
  delay(1000);
}
