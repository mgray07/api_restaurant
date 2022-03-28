import pymongo 
from pymongo import MongoClient
import datetime
from pprint import pprint

myRestaurants = MongoClient()
myRestaurants = MongoClient('localhost', 27017)

def createRestaurant(name, style, tags, rating):
    newRestaurant = {"name": name,
                     "style": style,
                     "tags": tags,
                     "rating": rating}
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
    #lowerName = name.lower()
    toBeDeleted = restaurantCollection.find({'name': name})

    restaurantCollection.delete_many({"name": name})
    return toBeDeleted


def updateUserCollection(userID):
    print(userID)
    global restaurantDB
    currentCollection = restaurantDB[userID]
    return currentCollection

restaurantDB = myRestaurants.restaurantDB
#restaurants = updateUserCollection('restaurants')
restaurants = restaurantDB.restaurants
print('hello')


#populateRestaurants(5)
#depopulateRestaurants(5)
#populateRestaurants(100)
