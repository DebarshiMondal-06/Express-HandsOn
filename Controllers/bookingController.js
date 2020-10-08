const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/Tour_models');
const AppError = require('../Classes/appError');

exports.getCheckout = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.tourID)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourID}
      &user=${req.user.id}&price=${tour.price}`,

      cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourID,
      line_items: [
        {
          name: `${tour.name} Tour`,
          description: tour.summary,
          amount: tour.price * 100,
          currency: 'usd',
          quantity: 1
        }
      ]
    });

    res.status(200).json({
      status: 'success',
      session
    });
  } catch (error) {
    return next(new AppError(`${error}`, 501));
  }
}

exports.createBookingCheckout = (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();


}


