from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/get_data')
def get_data():
    # This is where your scraping logic goes
    url = "https://example-free-fire-source.com/api" 
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
