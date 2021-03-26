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
router.put('/:_id/likes', addLikeCard);
router.delete('/:_id/likes', removeLikeCard);

module.exports = router;
