# credit: codeWithMosh
from twilio.rest import Client

account_sid = "AC967aa15506c58aeab1848fc5d95d1a38"
auth_token = "fa2c4cc49a7be26c3abdca49e7f119e1"

client = Client(account_sid, auth_token)

# tooHigh is boolean
# true means too high
# false means too low


def sendSMS(userNumber, tooHigh):
    if (tooHigh):
        m = "Exceeding 30 Celsius"
    else:
        m = "Below 0 Celsius"

    try:
        message = client.messages.create(
            to="+1" + userNumber,
            from_="+19169434793",
            body=m
        )
    except:
        pass
