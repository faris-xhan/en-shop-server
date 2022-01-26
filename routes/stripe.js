const express = require('express');
const constants = require('../constants');
const stripe = require('stripe')(constants.stripeKey);

const router = express.Router();

router.post('/payment', (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },

    (stripError, stripeRes) => {
      if (stripError) {
        next(stripError);
      } else {
        res.status.json(stripeRes);
      }
    }
  );
});
module.exports = router;
