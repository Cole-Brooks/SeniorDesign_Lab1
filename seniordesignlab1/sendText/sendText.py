# credit: codeWithMosh
from twilio.rest import Client

account_sid = "AC967aa15506c58aeab1848fc5d95d1a38"
auth_token = "c25979ecd93924db05ecec3741b78597"

client = Client(account_sid, auth_token)

# tooHigh is boolean
# true means too high
# false means too low


def sendSMS(userNumber, tooHigh, maxTemp, minTemp):
    print("+1" + str(userNumber))
    if (tooHigh):
        m = f"Exceeding {maxTemp} Celsius"
    else:
        m = f"Below {minTemp} Celsius"

    try:
        message = client.messages.create(
            to="+1" + str(userNumber),
            from_="+19169434793",
            body=m
        )
    except:
        pass
