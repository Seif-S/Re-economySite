// admin.js

$(document).ready(function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    function renderUserTable() {
      const userTableBody = $('#userTable tbody');
      userTableBody.empty();
  
      if (users.length === 0) {
        userTableBody.append('<tr><td colspan="3">Inga deltagare hittades.</td></tr>');
        return;
      }
  
      users.forEach(user => {
        userTableBody.append(`
          <tr data-id="${user.id}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td class="action-buttons">
              <button class="edit-button btn">Redigera</button>
              <button class="delete-button btn">Ta bort</button>
            </td>
          </tr>
        `);
      });
    }
  
    function generateId() {
      return users.length > 0 ? users[users.length - 1].id + 1 : 1;
    }
  
    $('#addUserForm').submit(function(e) {
      e.preventDefault();
      const name = $('#addUserName').val().trim();
  
      if (name === '') {
        alert('Vänligen fyll i namnet.');
        return;
      }
  
      const newUser = {
        id: generateId(),
        name: name
      };
  
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      renderUserTable();
      $('#addUserForm')[0].reset();
    });
  
    $(document).on('click', '.edit-button', function() {
      const userId = $(this).closest('tr').data('id');
      const user = users.find(u => u.id === userId);
  
      if (user) {
        $('#editUserId').val(user.id);
        $('#editUserName').val(user.name);
        $('#editUserModal').fadeIn();
      }
    });
  
    $('.close-button').click(function() {
      $('#editUserModal').fadeOut();
    });
  
    $('#editUserForm').submit(function(e) {
      e.preventDefault();
      const id = parseInt($('#editUserId').val());
      const name = $('#editUserName').val().trim();
  
      if (name === '') {
        alert('Vänligen fyll i namnet.');
        return;
      }
  
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        users[userIndex].name = name;
        localStorage.setItem('users', JSON.stringify(users));
        renderUserTable();
        $('#editUserModal').fadeOut();
      }
    });
  
    $(document).on('click', '.delete-button', function() {
      const userId = $(this).closest('tr').data('id');
      if (confirm('Är du säker på att du vill ta bort denna deltagare?')) {
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        renderUserTable();
      }
    });
  
    $(window).click(function(e) {
      if ($(e.target).is('#editUserModal')) {
        $('#editUserModal').fadeOut();
      }
    });
  
    renderUserTable();
  });
  