import {writable} from "svelte/store";



export const cart = writable( { products: [], amountOfProd: 0 } );