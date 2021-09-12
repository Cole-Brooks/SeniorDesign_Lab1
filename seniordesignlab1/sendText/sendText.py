# credit: codeWithMosh
from twilio.rest import Client

account_sid = "AC967aa15506c58aeab1848fc5d95d1a38"
auth_token = "0180f8afd46a29507edda9f3010b47ff"

client = Client(account_sid, auth_token)


message = client.messages.create(
    to="+13193839547",
    from_="+19169434793",
    body="This is our message"
)
