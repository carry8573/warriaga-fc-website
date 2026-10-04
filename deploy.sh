#!/bin/bash
# Warriaga Park FC Website - Deployment Script
# This script simulates deploying the website to a production server.

echo "Starting deployment to production server..."
echo "Step 1: Packaging website files..."
sleep 1

echo "Step 2: Uploading files to server..."
# In a real project, this would be an rsync or scp command:
# rsync -avz ./index.html user@server:/var/www/

echo "Step 3: Clearing cache..."
sleep 1

echo "Deployment completed successfully!"