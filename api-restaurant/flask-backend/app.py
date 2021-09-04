from mongo import *
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask import jsonify

app = Flask(__name__)
CORS(app)

restaurantDB_backend = {
    #key value
    #value is an array
    'restaurants_backend': []
}

@app.route('/', methods = ["GET", "POST", "DELETE"])
def home():
    i=0
    if request.method == "GET":
        for resty in restaurants.find():
            resty["_id"] = str(resty["_id"])
            if resty in restaurantDB_backend['restaurants_backend']:
                continue
            restaurantDB_backend['restaurants_backend'].append(resty)
        return restaurantDB_backend
    elif request.method == "POST":
        restaurantToAdd = request.get_json()
        addRestaurant(createRestaurant(restaurantToAdd["data"]["name"], restaurantToAdd["data"]["style"], restaurantToAdd["data"]["tags"]), restaurants)
        return restaurantDB_backend
    elif request.method == "DELETE":
        restaurantToDelete = request.args.get('name')
        toBeDeleted = removeRestaurant(restaurants, restaurantToDelete)
        for resty in restaurantDB_backend['restaurants_backend']:
            if resty['name'] == restaurantToDelete:
                restaurantDB_backend['restaurants_backend'].pop(i)
            i += 1
        return restaurantDB_backend
    #return dummy(restaurantDB_backend['restaurants_backend'])
