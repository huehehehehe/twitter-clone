from flask import Flask, Blueprint, request
from clone import tweets_api
from flask_cors import CORS
import debugger
import clone


app = Flask(__name__)
CORS(app)
app.register_blueprint(tweets_api, url_prefix = '/api/v1/')

@app.route('/')
def hello():
    return "Hello"

if __name__ == '__main__':
    app.run(debug=debugger.DEBUG, host=debugger.HOST, port=debugger.PORT)