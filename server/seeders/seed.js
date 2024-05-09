const db = require('../config/connection');
const { Booking, Destination, Package, Tour, User } = require('../models');
const cleanDB = require('./cleanDB');
// Requires data from the json files for User, Destination, Package and Tour
const userData = require('./userData.json');
const destinationData = require('./destinationData.json');
const packageData = require('./packageData.json');
const tourData = require('./tourData.json');

db.once('open', async () => {
  // clean database
  await cleanDB("Booking", "bookings");
  await cleanDB("Destination", "destinations");
  await cleanDB("Package", "packages");
  await cleanDB("Tour", "tours");
  await cleanDB("User", "users");

  // Insetrts multiple documents into the User, Destination, Tour and Package collections
  const users = await User.insertMany(userData);
  const destinations = await Destination.insertMany(destinationData);
  const tours = await Tour.insertMany(tourData);
  const packages = await Package.insertMany(packageData);
  let tempDest = destinations[destinations.length - 1];
  for (let i = 0; i < tours.length; i++){
    let tour = tours[i];
    switch (i)
    {
      case 0:
        tempDest = destinations[0];
        break;
      case 1:
        tempDest = destinations[2];
        break;
      case 2:
        tempDest = destinations[3];
        break;
      case 3:
        tempDest = destinations[5];
        break;
      case 4:
        tempDest = destinations[3];
        break;
      case 5:
        tempDest = destinations[0];
        break;
    }
    // Sets proper destination id to the tour.destination
    tour.destination = tempDest._id;
    await tour.save();
    // Pushes proper tour to the package.tours collection
    if (i < packages.length){
      let pack = packages[i];
      pack.tours.push(tour._id);
      await pack.save();
    }
  }

  console.log('all done!');
  process.exit(0);
});
