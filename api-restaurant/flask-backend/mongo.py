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

def addRestaurant(restaurantSingle, restaurantCollection):
    #for restaurant in restaurantArray:
    restaurantCollection.insert_one(restaurantSingle)

def getRestaurants(restaurantCollection, key, value):
    found = restaurantCollection.find({key: value})
    if found.count() != 0:
        return found
    else:
        return False
        

def removeRestaurant(restaurantCollection, name):
    toBeDeleted = restaurantCollection.find({'name': name})
    restaurantCollection.delete_many({"name": name})
    return toBeDeleted


restaurantDB = myRestaurants.restaurantDB
restaurants = restaurantDB.restaurants

restaurantsToAdd = []
chipotle = createRestaurant("chipotle", "mexican", ["taco", "queso", "burrito", "beans", "rice"])
addRestaurant(chipotle, restaurants)
#restaurantsToAdd.append(chipotle)

chickFilA = createRestaurant("chickFilA", "american", ["chicken", "tea", "nuggets", "mayo", "sauce"])
addRestaurant(chickFilA, restaurants)
#restaurantsToAdd.append(chickFilA)

pandaExpress = createRestaurant("Panda Express", "asian", ["rice", "soy sauce", "orange chicken", "fortune cookie", "seafood"])
addRestaurant(pandaExpress, restaurants)
#restaurantsToAdd.append(pandaExpress)

tacoBell = createRestaurant("Taco Bell", "mexican", ["beans", "doritos", "chalupa", "taco", "baja blast", "sauce"])
addRestaurant(tacoBell, restaurants)
#restaurantsToAdd.append(tacoBell)
#addRestaurants(restaurantsToAdd, restaurants)

'''matchingRestaurants = getRestaurants(restaurants, "tags", "beans")
if matchingRestaurants != False:
    for smallRestaurant in matchingRestaurants:
        pprint(smallRestaurant)'''
        

#removeRestaurant(restaurants, "chickFilA")
#removeRestaurant(restaurants, "Taco Bell")
#removeRestaurant(restaurants, "Panda Express")
