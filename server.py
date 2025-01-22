import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import json

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/images-list'):
            self.handle_images_list()
        else:
            super().do_GET()

    def handle_images_list(self):
        # Extract folder from query string
        folder = self.path.split('?folder=')[-1]
        folder_path = os.path.join(os.getcwd(), 'image', folder)

        if not os.path.exists(folder_path):
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Folder not found")
            return

        # List all image files in the folder
        allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        files = [
            file for file in os.listdir(folder_path)
            if file.split('.')[-1].lower() in allowed_extensions
        ]

        # Send the list of files as JSON
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(files).encode())

# Run the server
PORT = 8000
server_address = ('', PORT)
httpd = HTTPServer(server_address, CustomHandler)
print(f"Serving on port {PORT}")
httpd.serve_forever()
