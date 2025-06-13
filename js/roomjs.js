let server_url = '';

fetch('settings.json')
  .then(res => res.json())
  .then(settings => {
    if (settings.server_url) {
      server_url = settings.server_url;
    } else {
      alert('server_url not found in settings.json');
    }
  })
  .catch(() => {
    alert('Failed to load settings.json');
  });

const chatBox = document.getElementById('chat');
const input = document.getElementById('input');

const username = localStorage.getItem('user');
const token = localStorage.getItem('token');

let currentRoomId = null;
let currentRoomName = 'Loading...';
let availableRooms = [];
let pendingDownloadUrl = null;

// Check if download warnings are disabled
let downloadWarningsDisabled = localStorage.getItem('downloadWarningsDisabled') === 'true';

if (!username || !token) {
  alert('You are not logged in.');
  window.location.href = './index.html';
}

window.onload = function() {
  const user = localStorage.getItem('user');

  if (!user) {
    alert("You are not logged in. Redirecting to homepage");
    window.location.href = './index.html';
  } else {
    document.getElementById('username').textContent = user;
    const profileLink = document.getElementById('profileLink');
    if (profileLink) {
      profileLink.href = `./userprofile.html?user=${encodeURIComponent(user)}`;
    }
    
    // Setup inbox link
    const inboxLink = document.getElementById('inboxLink');
    if (inboxLink) {
      inboxLink.addEventListener('click', showInboxModal);
      inboxLink.style.cursor = 'pointer';
    }
    
    loadRooms();
    loadInboxCount();
  }
};

function loadRooms() {
  // wait 1.22 seconds before loading rooms
  setTimeout(() => {
    fetchRooms();
  }, 1220);
  fetch(`${server_url}/api/rooms`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.rooms) {
      availableRooms = data.rooms;
      populateRoomList();
      
      // Auto-select first joined room or first available room
      const joinedRoom = data.rooms.find(r => r.joined);
      if (joinedRoom) {
        selectRoom(joinedRoom.room_id, joinedRoom.name);
      } else if (data.rooms.length > 0) {
        // Try to join the first available room automatically
        const firstRoom = data.rooms[0];
        joinExistingRoom(firstRoom.name, () => {
          selectRoom(firstRoom.room_id, firstRoom.name);
        });
      }
    }
  })
  .catch(err => {
    console.error('Failed to load rooms:', err);
  });
}

function populateRoomList() {
  const roomList = document.getElementById('roomList');
  roomList.innerHTML = '';
  
  availableRooms.forEach(room => {
    const li = document.createElement('li');
    li.className = 'room';
    li.setAttribute('data-room-id', room.room_id);
    li.setAttribute('data-room-name', room.name);
    
    const icon = room.joined ? '◉' : '◎';
    const joinedClass = room.joined ? '' : ' not-joined';
    
    li.innerHTML = `<span class="room-icon">${icon}</span> ${room.name}`;
    li.className += joinedClass;
    
    if (room.is_private) {
      li.innerHTML += ' <span class="private-indicator">🔒</span>';
    }
    
    li.addEventListener('click', () => {
      if (room.joined) {
        selectRoom(room.room_id, room.name);
      } else {
        joinExistingRoom(room.name, () => {
          // After joining, select the room
          const updatedRoom = availableRooms.find(r => r.name === room.name);
          if (updatedRoom && updatedRoom.joined) {
            selectRoom(updatedRoom.room_id, updatedRoom.name);
          }
        });
      }
    });
    
    roomList.appendChild(li);
  });
  
  // Add "Join Channel" button
  const joinLi = document.createElement('li');
  joinLi.className = 'room add-room';
  joinLi.innerHTML = '<span class="room-icon">+</span> Join Channel';
  joinLi.addEventListener('click', showJoinRoomModal);
  roomList.appendChild(joinLi);
  
  // Add "Create Channel" button
  const createLi = document.createElement('li');
  createLi.className = 'room add-room';
  createLi.innerHTML = '<span class="room-icon">+</span> Create Channel';
  createLi.addEventListener('click', showCreateRoomModal);
  roomList.appendChild(createLi);
}

function checkServerStatus() {
  const startTime = Date.now();
  
  fetch(`${server_url}/api/ping`)
    .then(res => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const statusDiv = document.querySelector('.system-status');
      const statusIndicator = document.querySelector('.status-indicator');
      const statusText = document.querySelector('.status-text');
      
      if (res.ok && res.status === 200) {
        statusDiv.className = 'system-status status-nominal';
        statusText.textContent = 'NOMINAL';
        statusIndicator.textContent = '◉';
        statusIndicator.style.color = '#00ff00';
        
        if (responseTime > 500) {
          statusDiv.className = 'system-status status-slow';
          statusText.textContent = 'SLOW';
          statusIndicator.style.color = '#ffaa00';
        }
      } else {
        statusDiv.className = 'system-status status-offline';
        statusText.textContent = 'OFFLINE';
        statusIndicator.textContent = '◉';
        statusIndicator.style.color = '#ff0000';
      }
    })
    .catch(err => {
      console.error('Failed to check server status:', err);
      const statusDiv = document.querySelector('.system-status');
      const statusIndicator = document.querySelector('.status-indicator');
      const statusText = document.querySelector('.status-text');
      
      statusDiv.className = 'system-status status-offline';
      statusText.textContent = 'OFFLINE';
      statusIndicator.textContent = '◉';
      statusIndicator.style.color = '#ff0000';
    });
}

// Check server status periodically
setInterval(checkServerStatus, 5000); // Check every 5 seconds
checkServerStatus(); // Initial check


function selectRoom(roomId, roomName) {
  currentRoomId = roomId;
  currentRoomName = roomName;
  
  // Update active room in UI
  document.querySelectorAll('.room').forEach(r => r.classList.remove('active'));
  const activeRoom = document.querySelector(`[data-room-id="${roomId}"]`);
  if (activeRoom) {
    activeRoom.classList.add('active');
  }
  
  // Update header
  document.getElementById('headerText').textContent = `🧠 MIRAGE Interface v0.0.4-BETA // ${roomName}`;
  
  // Load messages for this room
  fetchMessages();
  
  // Clear any previous join errors
  document.getElementById('joinError').textContent = '';
}

function joinExistingRoom(roomName, callback) {
  const room = availableRooms.find(r => r.name === roomName);
  let password = '';
  
  if (room && room.is_private) {
    password = prompt(`Room "${roomName}" is private. Please enter password:`);
    if (password === null) return; // User cancelled
  }

  fetch(`${server_url}/api/join_room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ 
      name: roomName,
      password: password 
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw new Error(err.error || 'Failed to join room'); });
    }
    return res.json();
  })
  .then(data => {
    // Immediately select the room we're joining
    selectRoom(data.room_id, data.room_name);
    
    // Then refresh the room list
    return fetchRooms();
  })
  .then(() => {
    if (callback) callback();
  })
  .catch(err => {
    console.error('Error joining room:', err);
    alert('Error joining room: ' + err.message);
  });
}


function sendMsg() {
  const message = input.value.trim();
  if (!message || !currentRoomId) return;

  fetch(`${server_url}/api/send_room_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ 
      room_id: currentRoomId, 
      message: message 
    })
  }).then(res => {
    if (!res.ok) console.error('flask rejected the message');
  }).catch(err => {
    console.error('server is ghosting:', err);
  });

  input.value = '';
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseMarkdown(text) {
  text = escapeHTML(text);
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/_(.*?)_/g, '<i>$1</i>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>');
}

function handleDownload(fileUrl, fileName) {
  if (downloadWarningsDisabled) {
    // Directly download if warnings are disabled
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  } else {
    // Show warning modal
    pendingDownloadUrl = fileUrl;
    document.getElementById('downloadFileInfo').innerHTML = `<strong>File:</strong> ${fileName}<br><strong>URL:</strong> ${fileUrl}`;
    document.getElementById('downloadWarningModal').style.display = 'block';
  }
}

function closeDownloadWarning() {
  document.getElementById('downloadWarningModal').style.display = 'none';
  pendingDownloadUrl = null;
}

function proceedDownload() {
  if (pendingDownloadUrl) {
    // Check if user wants to disable warnings
    if (document.getElementById('disableWarnings').checked) {
      localStorage.setItem('downloadWarningsDisabled', 'true');
      downloadWarningsDisabled = true;
    }
    
    // Download the file
    const link = document.createElement('a');
    link.href = pendingDownloadUrl;
    link.download = '';
    link.click();
    
    closeDownloadWarning();
  }
}



function fetchMessages() {
  if (!currentRoomId) return;

  fetch(`${server_url}/api/get_room_messages?room_id=${currentRoomId}`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.json())
  .then(data => {
    if (!data.messages) return;

    chatBox.innerHTML = '';
    data.messages.forEach(m => {
  const msg = document.createElement('div');
  msg.className = 'msg';
  
  // Check if message contains a file URL
  if (m.message.startsWith('[File] ')) {
    const fileUrl = m.message.substring(7); // Remove '[File] ' prefix
    const fileName = fileUrl.split('/').pop() || 'Download File';
    msg.innerHTML = `<span class="msg-user"><a href="./userprofile.html?user=${encodeURIComponent(m.username)}" style="color: #ff004c;">~${m.username}</a>:</span> <span class="msg-text">📎 <button class="download-btn" onclick="handleDownload('${fileUrl}', '${fileName}')">${fileName}</button></span>`;
  } else {
    msg.innerHTML = `<span class="msg-user"><a href="./userprofile.html?user=${encodeURIComponent(m.username)}" style="color: #ff004c;">~${m.username}</a>:</span> <span class="msg-text">${parseMarkdown(m.message)}</span>`;
  }
  
  chatBox.appendChild(msg);
});
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(err => {
    console.error('Failed to fetch messages:', err);
  });
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMsg();
});

// Pull new messages every 3s
setInterval(fetchMessages, 3000);

setTimeout(loadRooms, 1000);

// Check inbox count every 30s
setInterval(loadInboxCount, 30000);

function logout() {
  fetch(`${server_url}/api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(data => {
        throw new Error(data.error || 'Logout failed');
      });
    }
    return res.json();
  })
  .then(data => {
    console.log(data.message);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = './index.html';
  })
  .catch(err => {
    console.error('Logout failed:', err.message);
  });
}

// Modal functions
function showJoinRoomModal() {
  document.getElementById('joinRoomModal').style.display = 'block';
  document.getElementById('joinError').textContent = '';
}

function closeJoinModal() {
  document.getElementById('joinRoomModal').style.display = 'none';
  document.getElementById('joinRoomPassword').value = '';
}

function showCreateRoomModal() {
  document.getElementById('createRoomModal').style.display = 'block';
  document.getElementById('createError').textContent = '';
}

function closeCreateModal() {
  document.getElementById('createRoomModal').style.display = 'none';
  document.getElementById('roomPassword').value = '';
}

// Inbox functions
function loadInboxCount() {
  fetch(`${server_url}/api/inbox_count`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.json())
  .then(data => {
    const countBadge = document.getElementById('inboxCount');
    if (data.inbox_count && data.inbox_count > 0) {
      countBadge.textContent = data.inbox_count;
      countBadge.style.display = 'inline';
    } else {
      countBadge.style.display = 'none';
    }
  })
  .catch(err => {
    console.error('Failed to load inbox count:', err);
  });
}

function showInboxModal() {
  document.getElementById('inboxModal').style.display = 'block';
  loadInboxMessages();
}

function closeInboxModal() {
  document.getElementById('inboxModal').style.display = 'none';
}

function loadInboxMessages() {
  fetch(`${server_url}/api/inbox`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.json())
  .then(data => {
    const messagesContainer = document.getElementById('inboxMessages');
    messagesContainer.innerHTML = '';
    
    if (!data.messages || data.messages.length === 0) {
      messagesContainer.innerHTML = '<div class="no-messages">No messages found</div>';
      return;
    }
    
    data.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'inbox-message';
      messageDiv.innerHTML = `
        <div class="message-header">
          <img src="${msg.avatar_url}" class="sender-avatar" alt="Avatar" />
          <div class="message-info">
            <span class="sender-name">~${msg.sender}</span>
            <span class="message-time">${formatTime(msg.created_at)}</span>
          </div>
          <button onclick="deleteInboxMessage(${msg.id})" class="delete-btn">×</button>
        </div>
        <div class="message-content">${parseMarkdown(msg.message)}</div>
      `;
      messagesContainer.appendChild(messageDiv);
    });
  })
  .catch(err => {
    console.error('Failed to load inbox messages:', err);
    document.getElementById('inboxMessages').innerHTML = '<div class="error-message">Failed to load messages</div>';
  });
}

function deleteInboxMessage(messageId) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  
  fetch(`${server_url}/api/delete_inbox_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ message_id: messageId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      loadInboxMessages(); // Refresh messages
      loadInboxCount(); // Update count
    } else {
      alert('Failed to delete message: ' + (data.error || 'Unknown error'));
    }
  })
  .catch(err => {
    console.error('Failed to delete message:', err);
    alert('Failed to delete message');
  });
}

function showSendMessageModal() {
  document.getElementById('sendMessageModal').style.display = 'block';
  document.getElementById('sendError').textContent = '';
}

function closeSendMessageModal() {
  document.getElementById('sendMessageModal').style.display = 'none';
  document.getElementById('recipientUsername').value = '';
  document.getElementById('messageText').value = '';
}

function sendInboxMessage() {
  const recipient = document.getElementById('recipientUsername').value.trim();
  const message = document.getElementById('messageText').value.trim();
  const errorDiv = document.getElementById('sendError');
  
  if (!recipient || !message) {
    errorDiv.textContent = 'Please fill in both recipient and message';
    return;
  }
  
  fetch(`${server_url}/api/send_inbox_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      recipient: recipient,
      message: message
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      closeSendMessageModal();
      alert('Message sent successfully!');
    } else {
      errorDiv.textContent = data.error || 'Failed to send message';
    }
  })
  .catch(err => {
    console.error('Failed to send message:', err);
    errorDiv.textContent = 'Failed to send message';
  });
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function joinRoom() {
  const roomName = document.getElementById('joinRoomName').value.trim();
  const password = document.getElementById('joinRoomPassword').value.trim();
  const errorDiv = document.getElementById('joinError');
  
  if (!roomName) {
    errorDiv.textContent = 'Please enter a room name';
    return;
  }

  fetch(`${server_url}/api/join_room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ 
      name: roomName,
      password: password 
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw new Error(err.error || 'Failed to join room'); });
    }
    return res.json();
  })
  .then(data => {
    // Close modal and clear inputs
    closeJoinModal();
    document.getElementById('joinRoomName').value = '';
    document.getElementById('joinRoomPassword').value = '';
    
    // Immediately select the joined room
    selectRoom(data.room_id, data.room_name);
    
    // Refresh room list
    return fetchRooms();
  })
  .catch(err => {
    errorDiv.textContent = err.message;
    console.error('Error joining room:', err);
  });
}

// Show/hide password field based on private checkbox
document.addEventListener('DOMContentLoaded', function() {
  const privateCheckbox = document.getElementById('isPrivate');
  const passwordField = document.getElementById('roomPassword');
  
  if (privateCheckbox && passwordField) {
    privateCheckbox.addEventListener('change', function() {
      passwordField.style.display = this.checked ? 'block' : 'none';
      if (!this.checked) {
        passwordField.value = '';
      }
    });
  }
});

function createRoom() {
  const roomName = document.getElementById('createRoomName').value.trim();
  const isPrivate = document.getElementById('isPrivate').checked;
  const password = document.getElementById('roomPassword').value.trim();
  const errorDiv = document.getElementById('createError');
  
  if (!roomName) {
    errorDiv.textContent = 'Please enter a room name';
    return;
  }
  
  if (isPrivate && !password) {
    errorDiv.textContent = 'Password required for private channels';
    return;
  }

  const requestBody = { 
    room_name: roomName,
    is_private: isPrivate ? 1 : 0
  };
  
  if (isPrivate && password) {
    requestBody.password = password;
  }

  fetch(`${server_url}/api/create_room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(requestBody)
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      closeCreateModal();
      loadRooms(); // Refresh room list
      document.getElementById('createRoomName').value = '';
      document.getElementById('isPrivate').checked = false;
    } else {
      errorDiv.textContent = data.error || 'Failed to create room';
    }
  })
  .catch(err => {
    errorDiv.textContent = 'Error creating room';
    console.error('Error:', err);
  });
}

// Add this to your script section
function fetchRooms() {
  return fetch(`${server_url}/api/rooms`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.rooms) {
      availableRooms = data.rooms;
      populateRoomList();
      return data.rooms;
    }
  })
  .catch(err => {
    console.error('Failed to fetch rooms:', err);
    throw err;
  });
}

function triggerFileUpload() {
  document.getElementById('fileInput').click();
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('room_id', currentRoomId);

    fetch(`${server_url}/api/upload_file`, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: formData
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                throw new Error(err.error || `Network response was not ok: ${res.status} ${res.statusText}`);
            });
        }
        return res.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Upload failed:', data.error);
            alert('Failed to upload file: ' + data.error);
            return;
        }
        if (data.file_url) {
  console.log('File uploaded successfully:', data.file_url);
  // Send the file URL as a message
  fetch(`${server_url}/api/send_room_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ 
      room_id: currentRoomId, 
      message: `[File] ${data.file_url}` 
    })
  }).then(res => {
    if (!res.ok) console.error('flask rejected the message');
    fetchMessages(); // Refresh messages to show the file
  }).catch(err => {
    console.error('server is ghosting:', err);
  });
}
    })
    .catch(err => {
        console.error('Failed to upload file:', err);
        alert('Failed to upload file: ' + err.message);
    });
}
// Mobile sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const toggleRooms = document.getElementById('toggleRooms');
  const roomList = document.getElementById('roomList');
  
  // Check if we're on mobile and show the toggle button if needed
  function checkMobile() {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
      sidebar.classList.remove('active');
    }
  }
  
  // Toggle sidebar visibility on mobile
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
  
  // Toggle room list visibility
  toggleRooms.addEventListener('click', function() {
    roomList.classList.toggle('collapsed');
    toggleRooms.classList.toggle('collapsed');
  });
  
  // Check on load and on resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

// Close modals when clicking outside
window.onclick = function(event) {
  const joinModal = document.getElementById('joinRoomModal');
  const createModal = document.getElementById('createRoomModal');
  const inboxModal = document.getElementById('inboxModal');
  const sendModal = document.getElementById('sendMessageModal');
  
  if (event.target === joinModal) {
    closeJoinModal();
  }
  if (event.target === createModal) {
    closeCreateModal();
  }
  if (event.target === inboxModal) {
    closeInboxModal();
  }
  if (event.target === sendModal) {
    closeSendMessageModal();
  }
}