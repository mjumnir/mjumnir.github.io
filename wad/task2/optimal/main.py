import os
from flask import Flask, render_template, send_from_directory, make_response, request
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
from flask_sslify import SSLify as ssl
from tokens import owm_token
import json, re

app = Flask(__name__)
sslify = ssl(app)

def write_json(data, filename='response.json'):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def get_meteo_data(city):
    url = 'https://api.openweathermap.org/data/2.5/weather'

    parameters = {
      'q':city,
      'APPID':owm_token
    }

    headers = {
      'Accepts': 'application/json',
    }

    session = Session()
    session.headers.update(headers)

    try:
        response = session.get(url, params=parameters)
        data = json.loads(response.text)
        temp = data['main']['temp']
        write_json(data)
        print(temp)
        return str(temp - 273.15)
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)
        return ''


def get_bot_responce(userText, count):
    Fake = [
      'Hi there, I\'m Fabio and you?',
      'Nice to meet you',
      'How are you?',
      'Not too bad, thanks',
      'What do you do?',
      'That\'s awesome',
      'Codepen is a nice place to stay',
      'I think you\'re a nice person',
      'Why do you think that?',
      'Can you explain?',
      'Anyway I\'ve gotta go now',
      'It was a pleasure chat with you',
      'Time to make a new codepen',
      'Bye',
      ':)'
    ]
    pattern = r'/[a-zA-Y]{3}'

    ticker = re.findall(pattern, userText)

    if ticker:

        if ticker[0] == '/spb':
            return get_meteo_data('Saint Petersburg,ru')
        elif ticker[0] == '/msk':
            return get_meteo_data('Moscow,ru')
    else:
        return Fake[int(count)]


@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route("/get")
def get_user_input():
    userText = request.args.get('msg')
    count = request.args.get('count')
    return get_bot_responce(userText, count)

@app.route('/img/<string:image>')
def rout_img(image):
    return send_from_directory(os.path.join(app.root_path, 'static', 'img'),
                               image)

@app.route('/js/<string:script>')
def rout_js(script):
    return send_from_directory(os.path.join(app.root_path, 'static', 'js'),
                               script)

@app.route('/css/<string:style>')
def rout_css(style):
    return send_from_directory(os.path.join(app.root_path, 'static', 'css'),
                               style)


@app.errorhandler(404)
def custom_mj_not_found(error):
    """Page not found."""
    return make_response(render_template("404.html"), 404)

#
#
# @app.errorhandler(400)
# def bad_request():
#     """Bad request."""
#     return make_response(render_template("400.html"), 400)
#
#
# @app.errorhandler(500)
# def server_error():
#     """Internal server error."""
#     return make_response(render_template("500.html"), 500)


if __name__ == '__main__':
    global_counter = - 1
    app.run(debug=True)
