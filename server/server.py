import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import json
from urllib.parse import urlparse

# Initialize the Hugging Face pipeline for text classification
pipe = pipeline("text-classification", model="JeswinMS4/URL_DETECTION")

# Function to classify URL using the pipeline
def classify_url(url):
    result = pipe(url)
    return result

# Function to extract domain from URL
def extract_domain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    print(domain)
    return domain

# Flask application setup
app = Flask(__name__)
CORS(app)

# Endpoint to receive URL from frontend and predict
@app.route('/upload', methods=['POST'])
def upload_file():
    # Assuming the frontend sends JSON data with a 'url' field
    data = request.json
    url = data['url']  # Extract URL from JSON data
    
    # Extract domain from URL
    domain = extract_domain(url)
    
    # Classify the URL using the pipeline
    result = classify_url(domain)
    
    # Print the result (for testing purposes)
    print(json.dumps(result, indent=4))
    
    # Return the result as JSON response to the frontend
    return result

if __name__ == '__main__':
    app.run(port=4000)
