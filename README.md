# Local_File_Storage

This repo uses nginx to run a web-server on a Raspberry Pi. The app served allows users to upload, delete, and download files stored locally on the Raspberry Pi.

## How to Run

### Hardware Required

1. Raspberry Pi (make sure it's configured with Raspberry Pi OS)

### Steps

1. On your Raspberry Pi, install `nginx` using `sudo apt-get install nginx` 
2. Install `node` on your Raspberry Pi
3. Clone the repo. Find the config file for `nginx` (usually stored at `~/../../etc/nginx/sites-available`) and replace the contents with the text in `Local_File_Storage/nginx-config/config.txt`.
4. For the `server` and `client` folders in `Local_File_Storage`, run `npm install`.
5. In `Local_File_Storage/server`, run `node server.js`
6. In a new terminal window, go to `Local_File_Storage/client` and run `npm run build`
7. Now run `sudo /etc/init.d/nginx start` to start the web server
8. Type `hostname -I` into your Raspberry Pi. This will print your Raspberry Pi's IP Address
9. Enter your Raspberry Pi's IP Address in a browser on a computer connected to the same network. The page should load.