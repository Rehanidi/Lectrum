import {deleteReview} from './delRevRequest';
import {updateCard} from './index';
import {getProductByHash} from './getProductByHash';

export const findReviewHash = async (hash, card) => {
  let userReviews = document.getElementById('userReviews');
  let deleteReviews = userReviews.querySelectorAll('img[class="close-icon"]');
  deleteReviews.forEach(button => button.addEventListener('click', async function () {
    const hashID = Number(event.target.dataset.id);
    const reviewHash = card.reviews[hashID].hash;
    await deleteReview(hash, reviewHash);
    await updateCard();
    await getProductByHash(hash); // обновляем данные о комментариях
    userReviews = document.getElementById('userReviews');
    deleteReviews = userReviews.querySelectorAll('img[class="close-icon"]');
  }));
};
