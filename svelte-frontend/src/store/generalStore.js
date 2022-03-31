import { writable } from "svelte/store";

export const store = writable({
    products: [
        {
            id: 1,
            name: "Big Doink",
            price: 50,
            imgPath: "./big-doink.webp"
        },
        {
            id: 3,
            name: "Big Doink",
            price: 50,
            imgPath: "./big-doink.webp"
        },
        {
            id: 2,
            name: "Big Doink",
            price: 50,
            imgPath: "./big-doink.webp"
        },
        {
            id: 4,
            name: "Big Doink",
            price: 50,
            imgPath: "./big-doink.webp"
        }
    ]
});