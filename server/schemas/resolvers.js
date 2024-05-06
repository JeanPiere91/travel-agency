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
      return Package.find().populate("tours");
      //return Package.find().populate('tours').populate('destination');
    },
    packagesfiltered: async (parent, { destination },  context) => {
      // console.log(destination);
      console.log(context);
      const packs = await Package.find();
      // console.log(packs.length);
      return packs.filter((pack) => {
        //console.log(pack.tours.length);
        //console.log(pack.tours.destination);
        let result = pack.tours.length;
        // console.log(pack.generalTitle);
        // console.log(result);
        if (result) {
          for (const tourID of pack.tours) {
            //console.log(tourID);
            //const tourID1= "66336dedbff93a4e867892c8";
            //const tour = Tour.findOne({_id: tourID1});
            const tour = Tour.findById({ tourID });
            console.log(tour.title);
            const dest = Destination.findById(tour.destination);
            //  console.log(dest);
            if (dest === destination) return true;
          }
        }
        return false;
      });
      //return Package.find().populate('tours');
    },
    package: async (parent, { _id }) => {
      return Package.findById(_id).populate("tours").populate("destination");
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
