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
    days: Int
}

type Package {
    _id: ID
    generalTitle: String
    generalDescription: String
    image: String
    totalAmount: Float
    totalDays: Int
    tours: [Tour]
}

type Destination {
    _id: ID
    name: String
}

type Booking {
    _id: ID
    purchaseDate: String
    people: Int
    amount: Float
    packages: [Package]
}

input PackageFilter{
    destination: String!
}

type Checkout {
    session: ID
}

input PackageInput {
    _id: ID
    purchaseQuantity: Int
    generalTitle: String
    generalDescription: String
    image: String
    totalAmount: Float
  }

type Query {
    destinations: [Destination]
    destination(_id: ID!): Destination
    tours: [Tour]
    tour(_id: ID!): Tour
    packages: [Package]
    packagesfiltered1(input: PackageFilter): [Package]
    packagesfiltered(destination: String!): [Package]
    package(packageId: ID!): Package
    booking(_id: ID!): Booking
    users: [User]
    user(_id: ID!): User
    checkout(packages: [PackageInput]): Checkout
}

type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(_id: ID!): User

    addDestination(name: String!): Destination
    updateDestination(_id: ID!, name: String!): Destination
    deleteDestination(_id: ID!): Destination

    addPackage(generalTitle: String!, generalDescription: String!, image: String, tours: [ID]): Package
    updatePackage(_id: ID!, generalTitle: String!, generalDescription: String!, image: String, tours: [ID]!): Package
    deletePackage(_id: ID!): Package

    addBooking(people: Int, packages: [ID]!): Booking
    updateBooking(_id: ID!, people: Int, packages: [ID]!): Booking
    deleteBooking(_id: ID!): Boolean
}
`;

module.exports = typeDefs;
