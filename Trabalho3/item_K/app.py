from flask import Flask, render_template, request
#from werkzeug import secure_filename
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "./uploads"
app.config['MAX_CONTENT_PATH'] = 40


@app.route('/upload')
def upload_file1():
    return render_template('upload.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        # f.save(secure_filename(f.filename))
        f.save(f.filename)
        return 'file uploaded successfully'


if __name__ == '__main__':
    app.run(debug=True)
