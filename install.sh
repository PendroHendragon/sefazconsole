#!/bin/bash

echo "installing node"
sudo apt install nodejs
echo "checking install"
node -v
echo "installing npm"
sudo apt install npm
echo "checking install"
npm -v

echo "unzip the console"
unzip sefaz.zip
echo "installing dependency of the sefaz monitor"
npm install
echo "permission for the sefaz console"
sudo chmod +x sefaz.sh