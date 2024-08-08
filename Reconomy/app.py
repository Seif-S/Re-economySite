from flask import Flask, render_template, request
import csv
import datetime

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
async def index():
    try:
        username = request.args.get('todo')
        buttonStatus = request.args.get('button_status')
        print(buttonStatus)
        currentTime = datetime.datetime.today()
        data = {'Name':username, 'Time':currentTime}
        if username and username.strip():
                if buttonStatus == 'check-out':
                    csvCheckin()
                    with open('timeReport.csv','at', newline='') as file:
                        fieldname = data.keys()
                        csvWrite = csv.DictWriter(file, fieldnames=fieldname)
                        csvWrite.writerow(data)
                elif buttonStatus == 'check-in':
                    csvCheckout()
                    with open('timeReport.csv','at', newline='') as file:
                        fieldname = data.keys()
                        csvWrite = csv.DictWriter(file, fieldnames=fieldname)
                        csvWrite.writerow(data)
                else:
                    print('Error')
    except Exception as error:
        return repr(error)
    return render_template('index.html')

def csvCheckin():
    with open('timeReport.csv','at', newline='') as file:
        data = {'Name':'User', 'Status':'Time checked in'}
        fields = data
        csvWrite = csv.DictWriter(file, fieldnames=fields)
        csvWrite.writerow(data)

def csvCheckout():
    with open('timeReport.csv','at', newline='') as file:
        data = {'Name':'User', 'Status':'Time checked out'}
        fields = data.keys()
        csvWrite = csv.DictWriter(file, fieldnames=fields)
        csvWrite.writerow(data)

if __name__ == '__main__':
    app.run(debug=True)