from flask import Flask, render_template, request, jsonify, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Test'  # 请替换为一个安全的密钥

# 邮件设置
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USERNAME = "doq96149@gmail.com"  # 请替换为您的Gmail地址
SMTP_PASSWORD = "ipnt ryts fovm rqay"  # 请替换为您的应用专用密码

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
            try:
                send_contact_email(name, email, message)
                flash('Your message has been successfully sent!', 'success')
            except Exception as e:
                flash('There was an error sending the message, please try again later.', 'error')
        else:
            flash('Please complete all fields.', 'error')
    
    return render_template('index.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    try:
        send_contact_email(name, email, message)
        return jsonify({'status': 'success', 'message': 'Thank you for your message! We will get back to you as soon as possible.'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': 'There was an error sending the message, please try again later.'})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'status': 'error', 'message': 'The email address cannot be empty.'})
    
    try:
        send_subscription_notification(email)
        return jsonify({'status': 'success', 'message': 'Thank you for your subscription!'})
    except Exception as e:
        print(f"Error while sending mail: {str(e)}")
        return jsonify({'status': 'error', 'message': 'An error occurred during the subscription process, please try again later.'})

def send_contact_email(name, email, message):
    subject = f"新的联系表单提交 - 来自 {name}"
    body = f"姓名: {name}\n电子邮件: {email}\n消息: {message}"
    send_email(SMTP_USERNAME, subject, body)

def send_subscription_notification(subscriber_email):
    subject = "新的订阅者"
    body = f"新的订阅者邮箱地址：{subscriber_email}"
    send_email(SMTP_USERNAME, subject, body)

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)

if __name__ == '__main__':
    app.run(debug=True)
