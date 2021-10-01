# credit: codeWithMosh
from twilio.rest import Client

account_sid = "AC967aa15506c58aeab1848fc5d95d1a38"
auth_token = "057f2b2c9e816c510133d7ab73ebba5c"

client = Client(account_sid, auth_token)

# tooHigh is boolean
# true means too high
# false means too low


def sendSMS(userNumber, tooHigh):
    print("+1" + str(userNumber))
    if (tooHigh):
        m = "Exceeding 30 Celsius"
    else:
        m = "Below 0 Celsius"

    try:
        message = client.messages.create(
            to="+1" + str(userNumber),
            from_="+19169434793",
            body=m
        )
    except:
        pass
