import pymongo 
from pymongo import MongoClient
import datetime
from pprint import pprint

myRestaurants = MongoClient()
myRestaurants = MongoClient('localhost', 27017)

def createRestaurant(name, style, tags):
    newRestaurant = {"name": name,
                     "style": style,
                     "tags": tags}
    return newRestaurant

def addRestaurants(restaurantArray, restaurantCollection):
    for restaurant in restaurantArray:
        restaurantCollection.insert_one(restaurant)

def getRestaurants(restaurantCollection, key, value):
    found = restaurantCollection.find({key: value})
    if len(list(found)) != 0:
        return found
    else:
        return -1

def removeRestaurant(restaurantCollection, name):
    restaurantCollection.delete_many({"name": name})

restaurantDB = myRestaurants.restaurantDB
restaurants = restaurantDB.restaurants

restaurantsToAdd = []
chipotle = createRestaurant("chipotle", "mexican", ["taco", "queso", "burrito", "beans", "rice"])
restaurantsToAdd.append(chipotle)

chickFilA = createRestaurant("chickFilA", "american", ["chicken", "tea", "nuggets", "mayo", "sauce"])
restaurantsToAdd.append(chickFilA)

pandaExpress = createRestaurant("Panda Express", "asian", ["rice", "soy sauce", "orange chicken", "fortune cookie", "seafood"])
restaurantsToAdd.append(pandaExpress)

tacoBell = createRestaurant("Taco Bell", "mexican", ["beans", "doritos", "chalupa", "taco", "baja blast", "sauce"])
restaurantsToAdd.append(tacoBell)
addRestaurants(restaurantsToAdd, restaurants)

matchingRestaurants = getRestaurants(restaurants, "tags", "beans")
if matchingRestaurants != -1:
    for smallRestaurant in matchingRestaurants:
        pprint(smallRestaurant)

removeRestaurant(restaurants, "chickFilA")
removeRestaurant(restaurants, "Taco Bell")
removeRestaurant(restaurants, "Panda Express")

print('hello')