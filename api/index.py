import os
from twilio.rest import Client
from flask import Flask, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(appresource={
    r"/*":{
        "origins":"*"
    }
})

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
service_sid = os.environ["TWILIO_SERVICE_SID"]
app_key = os.environ["APP_KEY"]

@app.route('/', methods=['GET'])
def index():
    return "SOAPBOX CADDIE API 1.0"

@app.route('/getcode', methods=['POST'])
@cross_origin()
def code1():
    # Access form data
    key = request.form.get('key')
    if (key is None):
        return f"Error: *02*"
    if (key != app_key ):
        return f"Error: *99*"
    phone = "+1" + request.form.get('phone')
    print(phone)
    
    try:
     client = Client(account_sid, auth_token)

     verification = client.verify.v2.services(service_sid).verifications.create(to=phone, channel="sms")

     print(verification.sid)
     return f"Received: Username: {phone}"
    except:
      return f"Error: *101*"

@app.route('/verify', methods=['POST'])
@cross_origin()
def submit_form():
    # Access form data
    key = request.form.get('key')
    if (key is None):
        return f"Error: *02*"
    if (key != app_key ):
        return f"Error: *99*"
    phone = "+1" + request.form.get('phone')
    smscode = request.form.get('code', type=str)
    
    try:
      client = Client(account_sid, auth_token)

      verification_check = client.verify.v2.services(service_sid).verification_checks.create(to=phone, code=smscode)

      print(verification_check.status)

      return f"{verification_check.status}"
    except:
      return f"Error: *101*"


if __name__ == '__main__':
    app.run(debug=True)
