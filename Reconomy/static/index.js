let checkedInNames = new Set();
let currentCheckedInName = null;
function toggleCheckaInUt() {
const nameList = document.getElementById('nameList');
const selectedName = nameList.options[nameList.selectedIndex].text;
const checkButton = document.getElementById('checkButton');
const status = document.getElementById('status');
const currentTime = new Date();
const message = messageBox.value.trim();


if (selectedName !== "Välj namn") {
    if (checkedInNames.has(selectedName)) {
    // Check out
    status.textContent = `${selectedName} checkade ut kl: ${currentTime.toLocaleTimeString()}`;
    checkButton.textContent = "Checka In";
    checkButton.className = "checka-in";
    checkedInNames.delete(selectedName);
    if (currentCheckedInName === selectedName) {
        currentCheckedInName = null;
    }
    } else {
    // Check in
    status.textContent = `${selectedName} checkade in kl: ${currentTime.toLocaleTimeString()}`;
    checkButton.textContent = "Checka ut";
    checkButton.className = "checka-ut";
    checkedInNames.add(selectedName);
    currentCheckedInName = selectedName;
    }

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
    checkButton.textContent = "Checka Ut";
    checkButton.className = "checka-Ut";
    } else {
    checkButton.textContent = "Checka In";
    checkButton.className = "checka-in";
    }
}
}


$(document).ready(function(){
    $('#checkButton').click(function(){
        $.ajax({
        url:'',
        type:'get',
        contentType:'application/json',
        data:{
        todo:$('#nameList :selected').val(),
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
    const weekday = currentDate.toLocaleDateString('sv-SE', { weekday: 'long' }); // Veckodag på svenska
    weekNumberElement.textContent = `Vecka ${weekNumber} - ${weekday.charAt(0).toUpperCase() + weekday.slice(1)}`; // Första bokstaven versal
});




  

function updateDateTime() {
  const dateTimeElement = document.getElementById('dateTime');
  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();
  dateTimeElement.textContent = `Datum: ${dateString} Tid: ${timeString}`;
}



setInterval(updateDateTime, 1000);
