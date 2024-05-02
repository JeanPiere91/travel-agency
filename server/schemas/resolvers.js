const { User, Booking, Destination, Package, Tour } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
          },
             
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate('bookings');
      
              return user;
            }
      
            throw AuthenticationError;
          },
          booking: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate('bookings');
      
              return user.booking.id(_id);
            }
      
            throw AuthenticationError;
          },
          destinations: async () => {
            return Destination.find();
          },
          destination: async (parent, { destId }) => {
            return Destination.findOne({ _id: destId });
          },
          tours: async () => {
            return Tour.find();
          },
          tour: async (parent, { tourId }) => {
            return Tour.findOne({ _id: tourId });
          },
          packages: async () => {
            return Package.find();
          },
          package: async (parent, { _id }) => {
            return Package.findById(_id);
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
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw AuthenticationError;
          },
          deleteUser: async (parent, { userId }) => {
            return User.findOneAndDelete({ _id: userId });
          },
      
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
          updateDestination: async (parent, { id, name }) => {
            return await Destination.findOneAndUpdate(
              { _id: id }, 
              { name },
              { new: true }
            );
          },
          deleteDestination: async (parent, { destId }) => {
            Tour.updateMany({destination: destId}, {"$pull":{destination}});
            return Destination.findOneAndDelete({ _id: destId });
          },
          addPackage: async (parent, { generalTitle, generalDescription, image, tours }) => {
            return Package.create({ generalTitle, generalDescription, image, tours });
          },
          updatePackage: async (parent, { id, generalTitle, generalDescription, image, tours }) => {
            //const update = {generalTitle: generalTitle};
            return await Package.findOneAndUpdate(
              { _id: id }, 
              { generalTitle },
              //update,
              // {
              //   $addToSet: { comments: { commentText } },
              // },
      
              { new: true }
            );
          },
          deletePackage: async (parent, { packageId }) => {
            return Package.findOneAndDelete({ _id: packageId });
          },
             
    }
};

module.exports = resolvers;