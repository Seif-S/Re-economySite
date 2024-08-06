from flask import Flask, render_template, request
import csv
import datetime

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        try:
            username = request.form['option']
            currentTime = datetime.datetime.today()
            data = {'Name':username, 'Time':currentTime}
            with open('timeReport.csv','at', newline='') as file:
                fieldname = data.keys()
                csvWrite = csv.DictWriter(file, fieldnames=fieldname)
                csvWrite.writerow(data)
            return render_template('index.html')
        except Exception as error:
            return repr(error)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)