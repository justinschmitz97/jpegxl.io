from flask import Flask

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')
 
@app.route('/image/<name>')
def get_image(name):
    return app.send_static_file(name)

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()