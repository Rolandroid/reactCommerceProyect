import { actionTypes } from "../actions/cart.action"

export const cartInitialState = {
    cartItems: [],
}

export function cartReducer(state, { type, payload = {} }) {
    const { idDrink } = payload

    let drinkInCart = state.cartItems.find((item) => item.idDrink === idDrink)
    switch (type) {
        case actionTypes.ADD_TO_CART:
            // Saber si el producto a agregar esta en el carrito
            if (drinkInCart) {
                // afirmativo, incrementa la cantidad +1
                let cartItemsUpdated = state.cartItems.map((item) => {
                    if (item.idDrink === idDrink) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item
                })

                return {
                    ...state,
                    cartItems: cartItemsUpdated
                }
            } else {

                payload.quantity = 1
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
        case actionTypes.REMOVE_ONE_FROM_CART:
            // Existe producto en el carrito?    

            if (drinkInCart.quantity > 1) {
                //Quantity > 1 ? -> resta 1
                let cartItemsUpdated = state.cartItems.map(item => {
                    if (item.idDrink === idDrink) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item
                });

                return {
                    ...state,
                    cartItems: cartItemsUpdated
                };
            } else {
                //Quantity < 1 -> quitar del carrito
                let cartItemsUpdated = state.cartItems.filter(
                    (item) =>  item.idDrink !== idDrink)

                    return {
                        ...state,
                        cartItems: cartItemsUpdated,
                    };
                }
        case actionTypes.REMOVE_ALL_FROM_CART:
            if (drinkInCart) {
                let cartItemsUpdated = state.cartItems.filter(
                    (item) => item.idDrink !== idDrink
                );

                return {
                    ...state,
                    cartItems: cartItemsUpdated
                };
            }

            return state;
        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
    }
}