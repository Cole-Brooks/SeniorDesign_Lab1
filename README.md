# SeniorDesign_Lab1

## Description
This repository contains the code needed for the Arduino, Python Server and the code for Firebase to deploy. This lab is about developing a temperature sensor and its web application.


## Developer Documentation
Twilio is used for sending text alerts.
Firebase is used for receiving data and handling queries.
Char.js is used for real time plot.

##Installation
The software parts that we are using for this lab are: Firebase, Python server and codes that run on Arduino. The Firebase stores related data such as: user phone number, current temperature, previous 300 temperature etc. The Arduino communicates with the Firebase to send temperature data and retrieve flag for whether to virtually press the button. The Python server handles the sending text message by repeatedly retrieving phone number, temperature range, current temperature. It also makes sure that one and only one alert will be sent for one temperature out of bound event.  
For using the software, first, user will need to install the followings for using Firebase and Python. 
1.	Install Node.js, use npm to install firebase, firebasetools
2.	Use Pip to install firebase, twilio, python_jwt, gcloud, sseclient, pycryptodome and requests_toolbelt. It is also required to check the Python code for sendText.py module to make sure that the Twilio auth token is up-to-date.
3.	Include your WiFi’s ssid and password into Secrets.h.  

## User Documentation
Use “firebase deploy --only hosting” for deploying the database. And then user can proceed to run the Python server.

