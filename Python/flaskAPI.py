import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'assignmentdb.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'name': row[1],
        'image': row[2],
        'price': row[3],
        'category': row[4],
        'description': row[5],
    }

    return row_dict

def get_cartRow_as_dict(row):
    cartRow_dict = {
        'id': row[0],
        'name': row[1],
        'image': row[2],
        'price': row[3],
        'quantity': row[4],
    }

    return cartRow_dict


app = Flask(__name__)

#Get all products
@app.route('/api/products', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products ORDER BY name')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

#Use to retrieved products for home
@app.route('/api/products/home', methods=['GET'])
def home():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM products 
    WHERE name = 'YONEX ASTROX 99 PRO' 
    OR name = 'YONEX JAPAN STRING EXBOLT 63' 
    OR name = 'YONEX 75TH SAFERUN 200' 
    OR name = 'YONEX PRO TROLLEY BAG 92232EX' 
    OR name = 'YONEX MEN’S POLO SHIRT 10482EX' ''')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

#use id to retrieve data
@app.route('/api/products/<int:product>', methods=['GET'])
def show(product):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products WHERE id=?', (str(product),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

#use category to retrieve data
@app.route('/api/products/<category>', methods=['GET'])
def categoryShow(category):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products WHERE category=?', (category,))
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

#Adding new product 
@app.route('/api/products', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_product = (
        request.json['name'],
        request.json['image'],
        request.json['price'],
        request.json['category'],
        request.json['description'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO products(name,image,price,category,description)
        VALUES(?,?,?,?,?)
    ''', new_product)

    product_id = cursor.lastrowid

    db.commit()

    response = {
        'id': product_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

#Update product using product id
@app.route('/api/products/<int:product>', methods=['PUT'])
def update(product):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != product:
        abort(400)

    update_product = (
        request.json['name'],
        request.json['image'],
        request.json['price'],
        request.json['category'],
        request.json['description'],
        str(product),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE products SET
            name=?,image=?,price=?,category=?,description=?
        WHERE id=?
    ''', update_product)

    db.commit()

    response = {
        'id': product,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

#Delete product using product id
@app.route('/api/products/<int:product>', methods=['DELETE'])
def delete(product):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != product:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM products WHERE id=?', (str(product),))

    db.commit()

    response = {
        'id': product,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


#Cart functions
#Adding new product into cart
@app.route('/api/carts', methods=['POST'])
def addCart():
    if not request.json:
        abort(404)

    new_item = (
        request.json['name'],
        request.json['image'],
        request.json['price'],
        request.json['quantity'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO carts(name,image,price,quantity)
        VALUES(?,?,?,?)
    ''', new_item)

    cart_id = cursor.lastrowid

    db.commit()

    response = {
        'id': cart_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

#Get all data from cart
@app.route('/api/carts', methods=['GET'])
def getCart():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM carts')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_cartRow_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

#Get sum from cart
@app.route('/api/carts/sum', methods=['GET'])
def getSum():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT SUM(price) FROM carts')
    row = cursor.fetchone()
    db.close()

    if row:
        return jsonify(row), 200
    else:
        return jsonify(None), 200

#Delete all carts
@app.route('/api/<table>', methods=['DELETE'])
def deleteAll(table):
    if not request.json:
        abort(401)

    if 'table' not in request.json:
        abort(402)

    if request.json['table'] != table:
        abort(403)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE * FROM ?', (table))

    db.commit()

    response = {
        'table': table,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)