# Mirage-web

Mirage-web is the official frontend interface for Mirage, a privacy-centric communication platform. This repository contains all the web assets, including HTML layouts, CSS styling, and client-side logic required to run the Mirage experience in a browser.

## Project Overview

The interface is built with a focus on distinct, retro-inspired aesthetic themes. It provides a full suite of features for private and public communication without storing sensitive data on the server side.

## Core Features

- **Central Registry (Global Chat)**: A real-time hub for public discourse and channel-based communication.
- **Secure Relay (Private Messaging)**: A dedicated system for direct, one-on-one encrypted messaging.
- **Telegraph Wire (FYP)**: A feed-based discovery system for viewing trending posts and priority wires.
- **User Dossiers**: Comprehensive profile management and customization options.
- **Consistent Design**: A unified, minimalistic design powered by Sakura CSS and Alpine.js.

## Backend and API

This repository is purely for the UI. The backend services, including all API endpoints, database handling, and core message routing, are located in a separate repository.

You can find the backend source code here:
[github.com/korrykatti/mirage](https://github.com/korrykatti/mirage)

## Setup

To run the project locally, serve the root directory using a static file server of your choice. Configuration for the backend connection can be found and modified in the `settings.json` file.

## Development

The project uses Sakura CSS for straightforward, classless styling and Alpine.js for lightweight UI interactions. Contributions are welcome, provided they align with the established aesthetic and privacy standards.

## License

Mirage-web is open-source software distributed under the MIT License.
