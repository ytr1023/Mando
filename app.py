from flask import Flask, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "a secret key"

app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        if name and email and message:
            flash('Your message has been sent successfully!', 'success')
        else:
            flash('Please fill out all fields.', 'error')
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
