import { createUsersTables } from "../users/users.models.js";
import { createTokenTable } from "../tokens/tokens.models.js";
import { createProductsTable } from "../products/products.models.js";
import { createCartTable } from "../cart/carts.models.js";
import { createOrdersTbale } from "../orders/orders.models.js";
import { createReviewsTable } from "../reviews/reviews.models.js";

export const tables = async () => {

    await createUsersTables();
    await createTokenTable();
    await createProductsTable();
    await createCartTable();
    await createOrdersTbale();
    await createReviewsTable();

};