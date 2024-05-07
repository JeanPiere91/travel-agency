const { User, Booking, Destination, Package, Tour } = require("../models");

const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("bookings");
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bookings");

        return user;
      }

      throw AuthenticationError;
    },
    booking: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("bookings");

        return user.booking.id(_id);
      }

      throw AuthenticationError;
    },
    destinations: async () => {
      return Destination.find();
    },
    destination: async (parent, { _id }) => {
      return Destination.findById({ _id });
    },
    tours: async () => {
      return Tour.find({}).populate("destination");
    },
    tour: async (parent, { _id }) => {
      return Tour.findById({ _id }).populate("destination");
    },
    packages: async () => {
      return Package.find().populate({
        path: "tours",
        populate: { path: "destination" },
      });
    },
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
            //if (tour.destination.name === destination) {
              found = true;
              return;
            }
          });
        }
        return found;
      });
    },
    package: async (parent, { _id }) => {
      return Package.findById(_id).populate("tours").populate("destination");
    },
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
            unit_amount: package.totalAmount,// * 100,
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
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    //???
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    // deleteUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId });
    // },

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
    addDestination: async (parent, { name }) => {
      return Destination.create({ name });
    },
    updateDestination: async (parent, { _id, name }) => {
      const updateDest = { name: name };
      return await Destination.findByIdAndUpdate(_id, updateDest, {
        new: true,
      });
    },
    deleteDestination: async (parent, { _id }) => {
      Tour.updateMany({ destination: _id }, { $set: { destination: null } });
      return Destination.findByIdAndDelete(_id);
    },
    addPackage: async (
      parent,
      { generalTitle, generalDescription, image, tours }
    ) => {
      return Package.create({ generalTitle, generalDescription, image, tours });
    },
    updatePackage: async (
      parent,
      { _id, generalTitle, generalDescription, image, tours }
    ) => {
      // const updatePackage = {generalTitle: generalTitle, generalDescription: generalDescription, image: image, tours: tours};
      //console.log(updatePackage.totalAmount)
      //console.log(updatePackage);
      //  const pack = await Package.findOne({_id: _id});
      //  console.log(pack);
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
      // return await Package.findByIdAndUpdate(
      //   _id,
      //   updatePackage,
      //   //update,
      //   // {
      //   //   $addToSet: { comments: { commentText } },
      //   // },

      //   { new: true }
      // );
    },
    deletePackage: async (parent, { _id }) => {
      //  const pack = await Package.findOne({_id: _id});
      //  console.log(pack);
      return Package.findByIdAndDelete(_id).populate("tours");
      //  return Package.findOneAndDelete({ _id: _id }).populate('tours');
    },
  },
};

module.exports = resolvers;
