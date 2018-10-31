from flask import Flask, render_template, request, send_from_directory, jsonify
from surrounded import enemy_move, create_choose_enemy_tile_dataset

app = Flask(__name__, static_url_path='/')

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/index.html')
def index_html():
  return render_template('index.html')

@app.route('/info.html')
def info_html():
  return render_template('info.html')

@app.route('/enemyMove', methods=['GET'])
def enemyMove():
  ally_positions = request.args.getlist('ally_positions[]')
  enemy_positions = request.args.getlist('enemy_positions[]')
  return jsonify(enemyMove = enemy_move(ally_positions, enemy_positions))

@app.route('/js/<path:path>')
def send_js(path):
  return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
  return send_from_directory('css', path)

@app.route('/images/<path:path>')
def send_images(path):
  return send_from_directory('images', path)

if __name__ == '__main__':
  app.run(debug = True)
