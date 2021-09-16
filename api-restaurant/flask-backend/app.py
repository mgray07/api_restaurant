from mongo import *
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask import jsonify
import string

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
        # restaurantDB_backend['restaurants_backend'].append()
        return restaurantDB_backend
    elif request.method == "DELETE":
        restaurantToDelete = request.args.get('name')
        for resty in restaurantDB_backend['restaurants_backend']:
            if str(resty["name"]).lower() == str(restaurantToDelete).lower():
                restaurantToDelete = resty["name"]
        toBeDeleted = removeRestaurant(restaurants, restaurantToDelete)
        for resty in restaurantDB_backend['restaurants_backend']:
            if resty['name'] == restaurantToDelete:
                restaurantDB_backend['restaurants_backend'].pop(i)
            i += 1
        return restaurantDB_backend
    #return dummy(restaurantDB_backend['restaurants_backend'])




#restaurantDB_backend['restaurants_backend'].append(temp)

def populateRestaurants(x):
    for i in range(x):
        temp = createRestaurant(i, i, [i])
        addRestaurant(temp, restaurants)
        #restaurantDB_backend['restaurants_backend'].append(temp)

def depopulateRestaurants(x):
    for i in range(x):
        removeRestaurant(restaurants, i)
        

#populateRestaurants(200)
depopulateRestaurants(200)
