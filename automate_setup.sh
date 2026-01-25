#!/bin/bash

# Automation script to set up and run the Messenger-Mac-Wrapper project

echo "Starting automation script for Messenger-Mac-Wrapper..."

# Step 1: Check if something is running on port 5000 and kill it
echo "Checking for processes running on port 5000..."
if lsof -i :5000 > /dev/null; then
    echo "Port 5000 is in use. Killing the process..."
    PID=$(lsof -t -i :5000)
    kill -9 $PID
    echo "Process on port 5000 has been killed."
else
    echo "Port 5000 is free."
fi

# Step 2: Install dependencies for Messenger-Mac-Wrapper
echo "Installing dependencies for Messenger-Mac-Wrapper..."
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies for Messenger-Mac-Wrapper"
    exit 1
fi

# Step 3: Install wine for building Windows installers
echo "Installing wine for Windows installer support..."
if ! command -v wine &> /dev/null; then
    sudo apt update
    sudo apt install -y wine
fi

# Step 4: Check if PostgreSQL is installed and running
echo "Checking PostgreSQL server..."
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Installing PostgreSQL..."
    sudo apt update
    sudo apt install -y postgresql postgresql-contrib
fi

# Check if PostgreSQL service is running
if ! sudo service postgresql status | grep -q "active (running)"; then
    echo "Starting PostgreSQL server..."
    sudo service postgresql start
    
    if [ $? -ne 0 ]; then
        echo "Failed to start PostgreSQL server"
        exit 1
    fi
else
    echo "PostgreSQL server is already running."
fi

# Step 3: Start the Messenger-Mac-Wrapper app
echo "Starting Messenger-Mac-Wrapper app..."
npm run dev &

# Store the PID of the npm run dev process
NPM_DEV_PID=$!

# Wait for the app to start (adjust the sleep time as needed)
sleep 10

# Step 4: Navigate to the Facebook_Messenger directory and install dependencies
echo "Installing dependencies for Facebook_Messenger..."
cd Facebook_Messenger || { echo "Failed to navigate to Facebook_Messenger directory"; exit 1; }

npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies for Facebook_Messenger"
    exit 1
fi

# Step 5: Build the Facebook_Messenger app for Linux by default
echo "Building Facebook_Messenger app for Linux..."
npm run dist --linux

if [ $? -ne 0 ]; then
    echo "Failed to build Facebook_Messenger app for Linux"
    exit 1
fi

# Step 6: Start the Facebook_Messenger app
echo "Starting Facebook_Messenger app..."
npm start &

# Store the PID of the npm start process
NPM_START_PID=$!

# Wait for the app to start (adjust the sleep time as needed)
sleep 5

echo "All processes have been started successfully!"

# Step 7: Inform the user about manual building of other platforms
echo ""
echo "The script has built the Linux target by default to avoid network timeouts."
echo "You can manually build installers for other platforms by running the following commands:"
echo "  - For Windows: npm run dist -- --win"
echo "  - For macOS: npm run dist -- --mac"
echo "  - For Linux: npm run dist -- --linux"
echo ""

# Keep the script running to maintain the processes
wait $NPM_DEV_PID $NPM_START_PID