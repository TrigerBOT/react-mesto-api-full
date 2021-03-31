const router = require('express').Router();

const {
  createCard,
  getAllCards,
  deleteCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getAllCards);
router.delete('/:_id', deleteCard);
router.put('/likes/:_id', addLikeCard);
router.delete('/likes/:_id', removeLikeCard);

module.exports = router;
