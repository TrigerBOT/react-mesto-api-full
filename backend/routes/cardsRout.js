const router = require('express').Router();

const {
  createCard,
  getAllCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required().min(2)
      .max(30),
    link: Joi.string().trim().uri().required(),
  }),
}), createCard);



router.get('/', getAllCards);
router.delete('/:_id',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
router.put('/likes/:_id',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), addLikeCard);
router.delete('/likes/:_id',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), removeLikeCard);

module.exports = router;
