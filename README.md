# Messenger for Mac 

## How to Run as a Desktop App
**Clone this repository**:
1.  git clone https://github.com/Ihateipods4ever/Messenger-Mac-Wrapper.git
2.  Open your **Terminal** and navigate to the folder:
    cd path/to/folder
3.execute the command to run full installer:
    node ./automate_setup.sh

## Features
    **Native wrapper**: Runs Messenger in its own window.
*   **Mac Integration**: Hidden inset title bar for a native look.
*   **External Links**: Opens non-Messenger links in your default browser.

## Automation Script
An automation script [`automate_setup.sh`](automate_setup.sh) is provided to simplify the setup and build process. The script performs the following tasks:
1. Checks for and kills any process running on port 5000.
2. Installs dependencies for the Messenger-Mac-Wrapper project.
3. Installs `wine` for building Windows installers.
4. Checks if PostgreSQL is installed and running. If not, it installs and starts PostgreSQL.
5. Starts the Messenger-Mac-Wrapper app.
6. Navigates to the Facebook_Messenger directory and installs its dependencies.
7. Builds the Facebook_Messenger app.
8. Starts the Facebook_Messenger app.
9. Prompts the user to build an installer for a specific platform (Windows, macOS, or Linux).

To use the automation script:
    chmod +x automate_setup.sh
    bash ./automate_setup.sh
for linux the app will be in /path/to/folder/Messenger-Mac-Wrapper/dist/linux-unpacked open file called facebook_messenger
## Building Installers
After successfully building the Facebook_Messenger app, you can generate installers for specific platforms:
- **Windows**: Run `npm run dist -- --win` in the Facebook_Messenger directory.
- **macOS**: Run `npm run dist -- --mac` in the Facebook_Messenger directory.
- **Linux**: Run `npm run dist -- --linux` in the Facebook_Messenger directory.
## Notes
- The macOS build requires a macOS environment due to dependencies like `dmg-license`.
- Ensure PostgreSQL is installed and running if your app depends on it.
- The script requires sudo privileges to install `wine` and PostgreSQL.
