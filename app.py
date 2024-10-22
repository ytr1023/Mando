from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
import os

app = Flask(__name__)
app.secret_key = 'test_secret_key'  # 设置一个秘密密钥用于flash消息

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

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # 确保存储目录存在
    if not os.path.exists('contacts'):
        os.makedirs('contacts')
    
    # 将联系信息写入文件
    with open('contacts/contacts.txt', 'a', encoding='utf-8') as f:
        f.write(f"Name: {name}\nEmail: {email}\nMessage: {message}\n\n")
    
    return jsonify({'status': 'success', 'message': 'Thank you for your message!'})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'status': 'error', 'message': '邮箱不能为空。'})
    
    # 确保存储目录存在
    if not os.path.exists('subscribers'):
        os.makedirs('subscribers')
    
    # 将订阅邮箱写入文件
    with open('subscribers/subscribers.txt', 'a', encoding='utf-8') as f:
        f.write(f"{email}\n")
    
    return jsonify({'status': 'success', 'message': 'Thank you for your subscription!'})

if __name__ == '__main__':
    app.run(debug=True)
