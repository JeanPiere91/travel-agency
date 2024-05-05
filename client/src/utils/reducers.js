import {
ADD_TO_CART,
ADD_MULTIPLE_TO_CART,
REMOVE_FROM_CART,
CLEAR_CART,
UPDATE_CART_QUANTITY,
TOGGLE_CART,
UPDATE_PACKAGES,
UPDATE_DESTINATIONS,
UPDATE_CURRENT_DESTINATION
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PACKAGES:
      return {
        ...state,
        packages: [...action.packages],
      };

    case ADD_TO_CART:
        return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.package]
        };
    case ADD_MULTIPLE_TO_CART:
        return {
            ...state,
            cart: [...state.cart, ...action.packages],
        };
    case UPDATE_CART_QUANTITY:
        return {
            ...state,
            CartOpen: true,
            cart: state.cart.map(package => {
              if (action._id === package._id) {
                package.purchaseQuanitiy = action.purchaseQuanitiy
              }
              return package
            })
        };

    case REMOVE_FROM_CART: 
        let newState = state.cart.filter(product => {
        return package._id !== action._id;
    });

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
        };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        case UPDATE_DESTINATIONS:
            return {
                ...state,
                destinations: [...action.destinations],
            };

        case UPDATE_CURRENT_DESTINATION:
            return {
                ...state,
                currentDestination: action.currentDestination
            }

            default: 
            return state;
  }
};

