#!/bin/bash

echo "=== RouteIQ Kerala - Git Push Terminal Commands ==="
echo ""

# Step 1: Navigate to project directory
echo "Step 1: Navigate to project directory"
echo "cd \"/Users/kannansivakumar/Downloads/project 5\""
cd "/Users/kannansivakumar/Downloads/project 5"
echo "✓ Current directory: $(pwd)"
echo ""

# Step 2: Make the push script executable
echo "Step 2: Make push script executable"
echo "chmod +x push_to_github.sh"
chmod +x push_to_github.sh
if [ $? -eq 0 ]; then
    echo "✓ Script is now executable"
else
    echo "✗ Failed to make script executable"
    exit 1
fi
echo ""

# Step 3: Check if script exists and is executable
echo "Step 3: Verify script permissions"
if [ -x "push_to_github.sh" ]; then
    echo "✓ Script exists and is executable"
else
    echo "✗ Script not found or not executable"
    exit 1
fi
echo ""

# Step 4: Run the git push script
echo "Step 4: Execute the git push script"
echo "./push_to_github.sh"
echo ""
echo "=== Starting Git Push Process ==="
./push_to_github.sh

echo ""
echo "=== Process Complete ==="
