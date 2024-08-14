let checkedInNames = new Set();
let currentCheckedInName = null;
function toggleCheckInOut() {
const nameList = document.getElementById('nameList');
const selectedName = nameList.options[nameList.selectedIndex].text;
const checkButton = document.getElementById('checkButton');
const status = document.getElementById('status');
const currentTime = new Date();
const message = messageBox.value.trim();


if (selectedName !== "Select a name") {
    if (checkedInNames.has(selectedName)) {
    // Check out
    status.textContent = `${selectedName} checked out at ${currentTime.toLocaleTimeString()}`;
    checkButton.textContent = "Check In";
    checkButton.className = "check-in";
    checkedInNames.delete(selectedName);
    if (currentCheckedInName === selectedName) {
        currentCheckedInName = null;
    }
    } else {
    // Check in
    status.textContent = `${selectedName} checked in at ${currentTime.toLocaleTimeString()}`;
    checkButton.textContent = "Check Out";
    checkButton.className = "check-out";
    checkedInNames.add(selectedName);
    currentCheckedInName = selectedName;
    }
    updateCheckInList();
} else {
    alert('Please select a name');
}
}

function updateButtonText() {
const nameList = document.getElementById('nameList');
const selectedName = nameList.options[nameList.selectedIndex].text;
const checkButton = document.getElementById('checkButton');

if (selectedName !== "Select a name") {
    if (checkedInNames.has(selectedName)) {
    checkButton.textContent = "Check Out";
    checkButton.className = "check-out";
    } else {
    checkButton.textContent = "Check In";
    checkButton.className = "check-in";
    }
}
}

function updateCheckInList() {
const checkInList = document.getElementById('checkInList');
checkInList.innerHTML = '';
checkedInNames.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    checkInList.appendChild(listItem);
});
}
$(document).ready(function(){
    $('#checkButton').click(function(){
        $.ajax({
        url:'',
        type:'get',
        contentType:'application/json',
        data:{
        todo:$('#nameList :selected').text(),
        button_status:$('button').attr('class'),
        messagecontent:$('textarea').val()
        },
        success:function(response){
            console.log('Data saved')
            }
        })
    })
})



function getWeekNumber(date) {
    var firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    var pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const weekNumberElement = document.getElementById('weekNumber');
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    weekNumberElement.textContent = `Week ${weekNumber}`;
  });




  

function updateDateTime() {
  const dateTimeElement = document.getElementById('dateTime');
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();
  dateTimeElement.textContent = `Date: ${dateString} Time: ${timeString}`;
}



setInterval(updateDateTime, 1000);
