# Mirage Server Endpoints Documentation

This document provides an overview of the available endpoints in the Mirage server. Each endpoint serves a specific purpose related to chat room management and messaging.

## Overview of Endpoints

You can check the complete list of endpoints in the Mirage server code [here](https://github.com/KorryKatti/Mirage/blob/main/server.py).

### 1. **connect(sid, environ)**
- **Type:** Socket.IO event
- **Description:** Triggered when a client connects to the server.
- **Parameters:** 
  - `sid` (Session ID)
  - `environ` (Environment dictionary)
- **Usage:** Connection setup for clients.

### 2. **disconnect(sid)**
- **Type:** Socket.IO event
- **Description:** Triggered when a client disconnects from the server.
- **Parameters:**
  - `sid` (Session ID)
- **Usage:** Handle client disconnections.

### 3. **get_rooms(sid)**
- **Type:** Socket.IO event
- **Description:** Fetches the list of rooms that the current user has joined.
- **Parameters:**
  - `sid` (Session ID)
- **Usage:** Returns a list of rooms specific to the connected user.

### 4. **create_room(sid, data)**
- **Type:** Socket.IO event
- **Description:** Creates a new room with the given name and adds the creator.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `room_name` and `username`)
- **Usage:** Users can create a new room; checks if the room already exists.

### 5. **join_room_route(sid, data)**
- **Type:** Socket.IO event
- **Description:** Allows a user to join an existing room.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `username` and `room_name`)
- **Usage:** Adds the user to the specified room.

### 6. **leave_room_route(sid, data)**
- **Type:** Socket.IO event
- **Description:** Allows a user to leave a room.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `username` and `room_name`)
- **Usage:** Removes the user from the specified room.

### 7. **get_users_in_room_route(sid, data)**
- **Type:** Socket.IO event
- **Description:** Returns a list of users currently in the specified room.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `room_name`)
- **Usage:** Retrieves user information for a room.

### 8. **send_message(sid, data)**
- **Type:** Socket.IO event
- **Description:** Sends a message to the specified room.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `username`, `room_name`, and `message`)
- **Usage:** Adds the message to the room's list and emits the message to all users.

### 9. **get_new_messages(sid, data)**
- **Type:** Socket.IO event
- **Description:** Retrieves messages from a room starting after the specified message ID.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `room_name` and `last_message_id`)
- **Usage:** Fetches new messages for the client, based on the last seen message ID.

### 10. **get_all_messages(sid, data)**
- **Type:** Socket.IO event
- **Description:** Retrieves all messages for the specified room.
- **Parameters:**
  - `sid` (Session ID)
  - `data` (Includes `room_name`)
- **Usage:** Sends all previous messages for the room to the client.

### 11. **get_metrics(sid)**
- **Type:** Socket.IO event
- **Description:** Retrieves server statistics, such as total and today’s pings.
- **Parameters:**
  - `sid` (Session ID)
- **Usage:** Shows server usage metrics.

## Note on Message Storage

For storing messages on the client-side, you could ask users to allow local storage from their browser, enabling messages to be saved locally even after server restarts. This helps improve user experience without involving server-side message storage.
