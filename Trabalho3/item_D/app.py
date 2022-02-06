from flask import Flask
from flask import render_template
from flask import request

from flask import Flask, redirect, url_for, request
app = Flask(__name__)


@app.route('/hello')
def hello_world():
    return "hello world"


@app.route('/product/<name>')
def get_product(name):
    return "The product is " + str(name)


@app.route('/sale/<transaction_id>')
def get_sale(transaction_id=0):
    return "The transaction is "+str(transaction_id)


@app.route('/create/<first_name>/<last_name>')
def create(first_name=None, last_name=None):
    return 'Hello ' + first_name + ',' + last_name


@app.route('/dashboard/<name>')
def dashboard(name):
    return 'welcome %s' % name


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['name']
        return redirect(url_for('dashboard', name=user))
    else:
        user = request.args.get('name')
        return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
