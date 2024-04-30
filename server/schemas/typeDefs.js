const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookings: [Booking]
  }

  type Auth {
    token: ID
    user: User
  }

type Tour {
    _id: ID
    title: String
    description: String
    price: Float
    destination: Destination
}

type Package {
    _id: ID
    generalTitle: String
    generalDescription: String
    image: String
    price: Float
}

type Destination {
    name: String
}

type Booking {
    purchaseDate: String
    people: Int
    amount: Float
    packages: [Package]
}

type Query {
    destinations: [Destination]
    destination: Destination
    tours: [Tour]
    tour: Tour
    packages: [Package]
    package: Package
    booking(_id: ID!): Booking
    users: [User]
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(_id: ID!): Boolean

    addDestination(name: String!): Destination
    updateDestination(_id: ID!, name: String!): Destination
    deleteDestination(_id: ID!): Boolean

    addPackage(generalTitle: String!, generalDescription: String!, image: String, tours: [ID]!): Package
    updatePackage(_id: ID!, generalTitle: String!, generalDescription: String!, image: String, tours: [ID]!): Package
    deletePackage(_id: ID!): Boolean

    addBooking(people: Int, packages: [ID]!): Booking
    updateBooking(_id: ID!, people: Int, packages: [ID]!): Booking
    deleteBooking(_id: ID!): Boolean
}
`;

module.exports = typeDefs;
