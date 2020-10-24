import * as functions from 'firebase-functions';

const cors = require("cors");
const express = require("express");
var stripe = require('stripe')('sk_test_51HUbFjJ1ZaNMwlyfzuniZXsQBWQmeG7HU5gKdBKvtwmzCtDZm6ay84JhJq0V0cobySSJPhM1LKBumPoXiqsEAtP300dwXjKuAs');
const uuid = require("uuid/v4");


const app = express();


app.use(express.json());
app.use(cors());



app.post("/checkout", async ( req:any , res :any ) => {
    console.log("Request: " + req.body );
    let status;
    let message;

    try{
        const {product , token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email , 
            source : token.id
        });

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100 ,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
        }
        ,{
            idempotencyKey
        }
        );

        console.log("Charge: ", { charge } );
        status = "success";
        message = charge;
    }catch (error){
        console.error("Error:" , { error } );
        status = "failure";
        message = error;
    }
    res.json({ message , status });
})






















exports.app = functions.https.onRequest(app);



// app.listen(8080);


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });


// export const checkout = functions.https.onRequest((request, response) => {
//     // response.send("Hello from Firebase!");
// });

// exports.CheckoutSession = functions.https.onRequest((request, response) => {
//     //  response.send("Hello from Firebase!");
//     stripe.checkout.sessions.create(
//         {
//             success_url: 'https://example.com/success',
//             cancel_url: 'https://example.com/cancel',
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     name: 'T-shirt',
//                     description: 'Comfortable cotton t-shirt',
//                     amount: 1500,
//                     currency: 'usd',
//                     quantity: 2,
//                 },
//             ],
//         },function(session: any){
//             // asynchronously called
//             response.send(session)
//         }
//     );


// });
