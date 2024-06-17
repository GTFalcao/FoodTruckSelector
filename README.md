# Food Truck Selector

This is an API built with Node.js, Express and Typescript, with a MongoDB database.

It has one main endpoint, `GET /foodTrucks`, which will list the [San Francisco food truck data](https://data.sfgov.org/api/views/rqzj-sfat/rows.csv) with a slight adaptation where food items are provided as an array. If the query parameter `foodItems` is passed, including one or more comma-separated food items, the result will be filtered to include only locations that include at least one of the given items (or similarly-named, case-insensitive).

Data from the original source is cached for 24 hours by default to optimize response times. The cache can be cleared with `DELETE /foodTrucks`.

# Running the application

With NodeJS installed, you should `npm install` the dependencies and `npm start` to run the application locally (defaults to port `3000`).

You can then open `http://localhost:3000/foodTrucks` on your browser or Postman.

# Examples

`http://localhost:3000/foodTrucks?foodItems=chicken`
This will list all locations that have at least one food item with "chicken" in their name - such as "Fried Chicken" or "chicken burritos".

`http://localhost:3000/foodTrucks?foodItems=fried%20chicken,fries`
This will list locations that have at least one item matching either of the two filters - such as "fried chicken leg" or "bowl of fries".
