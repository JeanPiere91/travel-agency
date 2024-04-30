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
          package: async (parent, { packId }) => {
            return Package.findOne({ _id: packId });
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
          }    
    }
};

module.exports = resolvers;