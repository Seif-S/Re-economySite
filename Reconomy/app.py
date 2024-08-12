from flask import Flask, render_template, request
from openpyxl import Workbook, load_workbook
import os.path
import datetime

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    try:
        username = request.args.get('todo')
        buttonStatus = request.args.get('button_status')
        textArea = request.args.get('messagecontent')
        currentTime = datetime.datetime.today()
        if username and username.strip():
                if buttonStatus == 'check-out':
                    xlsxCheckout(username, currentTime, textArea)
                elif buttonStatus == 'check-in':
                    xlsxCheckin(username, currentTime, textArea)
                else:
                    print('Error')
    except Exception as error:
        return repr(error)
    return render_template('index.html')

def xlsxCheckout(user, time, comments):
    date = str(datetime.date.today())
    fileName = 'timeReport'+ date +'.xlsx'
    if os.path.isfile(fileName):
        Ws.append([user, None,time, comments])
        Wb.save(fileName)
    else:
        Wb = Workbook()
        Ws = Wb.active
        Ws.title = 'Data'
        Ws.append(['Name','Time checked in', 'Time checked out', 'Comment'])
        Ws.append([user, None, time, comments])
        Wb.save(fileName)

def xlsxCheckin(user, time, comments):
    date = str(datetime.date.today())
    fileName = 'timeReport'+ date +'.xlsx'
    if os.path.isfile(fileName):
        Ws.append([user, time, None, comments])
        Wb.save(fileName)
    else:
        Wb = Workbook()
        Ws = Wb.active
        Ws.title = 'Data'
        Ws.append(['Name','Time checked in', 'Time checked out', 'Comment'])
        Ws.append([user, time, None, comments])
        Wb.save(fileName)

if __name__ == '__main__':
    app.run(debug=True)