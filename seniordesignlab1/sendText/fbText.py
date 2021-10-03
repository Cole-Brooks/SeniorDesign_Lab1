from sendText import sendSMS
from firebase import Firebase
from time import sleep
# install firebase, twilio, python_jwt, gcloud, sseclient, pycryptodome, requests_toolbelt
config = {
    "apiKey": "AIzaSyBuLuMBLm0RcBvMoVvM8ngSY2P0a8KcXKA",
    "authDomain": "arduinotempsensor-22a0f.firebaseapp.com",
    "databaseURL": "https://arduinotempsensor-22a0f-default-rtdb.firebaseio.com",
    "storageBucket": "arduinotempsensor-22a0f.appspot.com"
}

firebase = Firebase(config)

# Get a reference to the database service
db = firebase.database()


def sendAlert(curTemp, maxTemp, minTemp, phoneNum):
    sendSMS(phoneNum, curTemp > maxTemp, maxTemp, minTemp)


while True:
    # https://stackoverflow.com/questions/510348/how-can-i-make-a-time-delay-in-python
    curPhoneNumber = db.child("PhoneNumber").get().val()
    minTemp = db.child("MinTemp").get().val()
    maxTemp = db.child("MaxTemp").get().val()
    hasBeenAlerted = db.child("hasBeenAlerted").get().val()
    curTemp = db.child("Temp").get().val()
    if (curTemp != -127.00):
        if (hasBeenAlerted == 0 and (curTemp > maxTemp or curTemp < minTemp)):
            db.update({"hasBeenAlerted": 1})
            sendAlert(curTemp, maxTemp, minTemp, curPhoneNumber)
            print("sending alerts")
        elif (hasBeenAlerted == 1 and (curTemp <= maxTemp and curTemp >= minTemp)):
            db.update({"hasBeenAlerted": 0})
            print("back to normal")
    sleep(1)
