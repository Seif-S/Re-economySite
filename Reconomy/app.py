from flask import Flask, render_template, request
from openpyxl import Workbook, load_workbook, cell
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
        Wb = load_workbook(fileName)
        Ws = Wb.active
        index = xlsxSearch(user)
        if index != False:
            index = 'C' + str(index)
            Ws[index].value = time
        else:
            Ws.append([user, time, None, comments])
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
        Wb = load_workbook(fileName)
        Ws = Wb.active
        index = xlsxSearch(user)
        if index != False:
            index = 'B' + str(index)
            Ws[index].value = time
        else:
            Ws.append([user, time, None, comments])
            Wb.save(fileName)
    else:
        Wb = Workbook()
        Ws = Wb.active
        Ws.title = 'Data'
        Ws.append(['Name','Time checked in', 'Time checked out', 'Comment'])
        Ws.append([user, time, None, comments])
        Wb.save(fileName)
# requires to be called by check in/out function
def xlsxSearch(user):
    date = str(datetime.date.today())
    fileName = 'timeReport' + date + '.xlsx'
    if os.path.isfile(fileName):
        try:
            Wb = load_workbook(fileName, read_only=True)
            Ws = Wb.active
            for rows in Ws.iter_rows(min_row=1, max_col=1):
                cellValue = rows[0].value
                if cellValue == user:
                    cellIndex = rows[0].row
                    return cellIndex
                else:
                    continue
            return False
        except Exception as error:
            print(error)
    else:
        print('File do not exist')
        return False


if __name__ == '__main__':
    app.run(debug=True)