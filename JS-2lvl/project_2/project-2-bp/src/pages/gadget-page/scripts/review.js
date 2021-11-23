import {findReviewHash} from './deleteReview';

export const createReview = (hash, card) => {
  const userReviews = document.getElementById('userReviews');
  let reviewsTitle = document.querySelector('div[class="feedback_list"]');
  while (reviewsTitle.children.length > 1) {
    reviewsTitle.removeChild(reviewsTitle.firstChild);
  }
  userReviews.innerHTML = null;
  if (card.reviews.length === 0){
    reviewsTitle.insertAdjacentHTML('afterbegin', `<h2><span>Отзывы отсутствуют</span>
        &nbsp;<span></span></h2>`);
  } else {
    reviewsTitle.insertAdjacentHTML('afterbegin', `<h2><span>${card.reviews.length}</span>
        &nbsp;<span>отзыва</span></h2>`);
    for (let i = 0; i < card.reviews.length; i++) {
      userReviews.insertAdjacentHTML('beforeend', `<article>
      <p class="name">${card.reviews[i].name}<img src="img/icon/close-red.svg" class="close-icon"  data-id="${i}" alt="Close icon"></p>
      <div class="feedback_info pros">
          <p class="feedback_title">Преимущества</p>
          <p class="feedback_content">${card.reviews[i].pros}</p>
      </div>
      <div class="feedback_info cons">
          <p class="feedback_title">Недостатки</p>
          <p class="feedback_content">${card.reviews[i].cons}</p>
      </div>
    </article>`);
    }
  }
  findReviewHash(hash, card);
};
