const db = require('../config/connection');
const { Booking, Destination, Package, Tour, User } = require('../models');
const cleanDB = require('./cleanDB');

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

  const users = await User.insertMany(userData);
  const destinations = await Destination.insertMany(destinationData);
  const tours = await Tour.insertMany(tourData);
  const packages = await Package.insertMany(packageData);
  const tempDest = destinations[destinations.length - 1];
  for (newTour of tours){
    newTour.destination = tempDest._id;
     await newTour.save();
    for (newPackage of packages){
      newPackage.tours.push(newTour._id);
      await newPackage.save();
    }
  }

  console.log('all done!');
  process.exit(0);
});
