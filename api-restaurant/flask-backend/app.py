import pymongo
from pymongo import MongoClient
import datetime
import pprint

myRestaurants = MongoClient()
myRestaurants = MongoClient('localhost', 27017)

restaurantDB = myRestaurants.restaurantDB
#myCollection = restaurantDB.test_collection

restaurant1 = {"name": "Chipotle",
         "style": "mexican",
         "tags": ["burrito", "queso", "beans"],
         "dateAdded": datetime.datetime.utcnow()}

restaurant2 = {"name": "Taco Bell",
         "style": "mexican",
         "tags": ["burrito", "queso", "beans", "taco"],
         "dateAdded": datetime.datetime.utcnow()}

restaurants = restaurantDB.restaurants

post_id = restaurants.insert_one(restaurant1)
restaurants.insert_one(restaurant2)
#print(myCollection.restaurant1)
print(post_id)
print(restaurant1["style"])
pprint.pprint(restaurants.find_one())
pprint.pprint(restaurants.find_one({"name": "Taco Bell"}))