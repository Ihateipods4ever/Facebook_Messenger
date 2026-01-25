#!/bin/bash

# Automation script to set up and run the Messenger-Mac-Wrapper project on macOS

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

# Step 2: Install project dependencies
echo "Installing dependencies for Messenger-Mac-Wrapper..."
export PATH="/Users/macbook/.nvm/versions/node/v20.20.0/bin:$PATH"
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies for Messenger-Mac-Wrapper"
    exit 1
fi

# Step 3: Check for Homebrew (required for macOS automation)
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Please install it from https://brew.sh/ and try again."
    exit 1
fi

# Step 4: Install wine-stable for Windows installer support (optional)
# Note: Wine on macOS is often best handled via 'brew tap gromgit/homebrew-fuse' 
# but we'll stick to the standard formula for simplicity.
if ! command -v wine &> /dev/null; then
    echo "Installing Wine via Homebrew..."
    brew install --cask wine-stable
fi

# Step 5: Check if PostgreSQL is installed and running
echo "Checking PostgreSQL server..."
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Installing PostgreSQL..."
    brew install postgresql@14
fi

# Start PostgreSQL service using brew services
if ! brew services list | grep -qE "postgresql.*started"; then
    echo "Starting PostgreSQL server..."
    brew services start postgresql@14
    
    # Give it a moment to initialize
    sleep 3
else
    echo "PostgreSQL server is already running."
fi

# Step 6: Set DATABASE_URL and start the Messenger-Mac-Wrapper app
echo "Starting Messenger-Mac-Wrapper app..."
export DATABASE_URL="postgres://messenger:1234@localhost:5432/messenger_dev"
/Users/macbook/.nvm/versions/node/v20.20.0/bin/npm run dev &
NPM_DEV_PID=$!

sleep 10

# Step 7: Navigate and install sub-project dependencies
echo "Installing dependencies for Facebook_Messenger..."
cd Facebook_Messenger || { echo "Failed to navigate to Facebook_Messenger directory"; exit 1; }

/Users/macbook/.nvm/versions/node/v20.20.0/bin/npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies for Facebook_Messenger"
    exit 1
fi

# Step 8: Build for macOS by default
echo "Building Facebook_Messenger app for macOS..."
/Users/macbook/.nvm/versions/node/v20.20.0/bin/npm run dist --mac

if [ $? -ne 0 ]; then
    echo "Failed to build Facebook_Messenger app for macOS"
    exit 1
fi

# Step 9: Start the Facebook_Messenger app
echo "Starting Facebook_Messenger app..."
/Users/macbook/.nvm/versions/node/v20.20.0/bin/npm start &
NPM_START_PID=$!

sleep 5

echo "All processes have been started successfully!"

echo ""
echo "Custom Build Commands:"
echo "  - For macOS:   npm run dist -- --mac"
echo "  - For Windows: npm run dist -- --win"
echo "  - For Linux:   npm run dist -- --linux"
echo ""

# Keep the script running to maintain the processes
wait $NPM_DEV_PID $NPM_START_PID