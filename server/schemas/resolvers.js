const { User, Booking, Destination, Package, Tour } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Query all users
    users: async () => {
      return User.find().populate("bookings");
    },

    // Query user by id and populate user bookings
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bookings");

        return user;
      }

      throw AuthenticationError;
    },

    // Query user by its id and user's booking by booking id.
    booking: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bookings");

        return user.booking.id(_id);
      }

      throw AuthenticationError;
    },

    // Query all destinations
    destinations: async () => {
      return Destination.find();
    },

    // Query one destination by id
    destination: async (parent, { _id }) => {
      return Destination.findById({ _id });
    },

    // Query all tours
    tours: async () => {
      return Tour.find({}).populate("destination");
    },

    // Query tour by id
    tour: async (parent, { _id }) => {
      return Tour.findById({ _id }).populate("destination");
    },

    // Query all packages
    packages: async () => {
      return Package.find().populate({
        path: "tours",
        populate: { path: "destination" },
      });
    },

    // Query packages with filter by destination name, accepts partial destination, for example "Alice" can find "Alice Springs"
    packagesfiltered: async (parent, { destination }, context) => {
      const packs = await Package.find().populate({
        path: "tours",
        populate: { path: "destination" },
      });

      let found = false;
      return packs.filter((pack) => {
        let result = pack.tours.length;
        if (result) {
          pack.tours.forEach((tour) => {
            if (tour.destination.name.indexOf(destination) >= 0) {
              found = true;
              return;
            }
          });
        }
        return found;
      });
    },

    //Query package by id
    package: async (parent, { packageId }) => {
      return Package.findOne({ _id:packageId }).populate("tours");
    },
  },

  Mutation: {
    // Checkout purchase
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log(url);
      await Booking.create({ packages: args.packages.map(({ _id }) => _id) });
      const line_items = [];

      for (const package of args.packages) {
        line_items.push({
          price_data: {
            currency: 'usd',
            package_data: {
              generalTitle: package.generalTitle,
              generalDescription: package.generalDescription,
              image: [`${url}/images/${package.image}`],
            },
            unit_amount: package.totalAmount,
          },
          quantity: package.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },

    // Add user with specific arguments
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Updates user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },

    // Deletes given user
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    // Login to the system with specific email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    // Add new destination
    addDestination: async (parent, { name }) => {
      return Destination.create({ name });
    },

    // Updates destination
    updateDestination: async (parent, { _id, name }) => {
      const updateDest = { name: name };
      return await Destination.findByIdAndUpdate(_id, updateDest, {
        new: true,
      });
    },

    // Deletes destination
    deleteDestination: async (parent, { _id }) => {
      Tour.updateMany({ destination: _id }, { $set: { destination: null } });
      return Destination.findByIdAndDelete(_id);
    },

    // Adds a package with list of tours
    addPackage: async (
      parent,
      { generalTitle, generalDescription, image, tours }
    ) => {
      return Package.create({ generalTitle, generalDescription, image, tours });
    },

    // Updates package using new title, description and so on
    updatePackage: async (
      parent,
      { _id, generalTitle, generalDescription, image, tours }
    ) => {
      return await Package.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            generalTitle: generalTitle,
            generalDescription: generalDescription,
            image: image,
            tours: tours,
          },
        },
        { new: true }
      ).populate("tours");
    },

    // Deletes a package
    deletePackage: async (parent, { _id }) => {
      return Package.findByIdAndDelete(_id).populate("tours");
    },
  },
};

module.exports = resolvers;
