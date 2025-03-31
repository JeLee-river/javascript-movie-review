var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _id, _title, _onClick, _type, _status, _message, _element, _ErrorUI_instances, handleClickRoutingHome_fn, _instance, _id2, _title2, _voteAverage, _posterPath, _id3, _rate, _details, _element2, _MovieItemDetails_instances, createContainer_fn, createPoster_fn, createDescription_fn, createTitle_fn, createCategory_fn, createRate_fn, createOverview_fn, createDivider_fn, createVotingRate_fn, onRateBoxClick_fn, onInitialRateClick_fn, handleRateHover_fn, _movieList, _totalItems, _container, _element3, _query, _SearchBar_instances, onSearch_fn, updateMovieList_fn, onSearchTriggerBar_fn, getInputElement_fn, getImageButton_fn, changeTitleStyle_fn, createResultMovieItems_fn, getSearchResults_fn, _SkeletonUl_instances, createSkeletonLi_fn, _element4, _Modal_instances, close_fn, onClickCloseButton_fn, onClickBackground_fn, onKeydownEscape_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const IMAGE = {
  prefix: "https://media.themoviedb.org/t/p/w440_and_h660_face",
  backdropPrefix: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"
};
const ITEMS = {
  perPage: 20,
  initialCount: 0
};
const DETAILS = {
  defaultOverview: "줄거리 정보가 없습니다."
};
const VOTE = {
  rateDegit: 1,
  defaultRate: 0,
  MaximumRate: 10,
  maximumIconCount: 5,
  unitRate: 2,
  noticeMessage: "평점 없음",
  filledStarImage: "./images/star_filled.png",
  emptyStarImage: "./images/star_empty.png"
};
const RATING_SCORE = {
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10
};
const RATING_MESSAGE = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요"
};
const calculatePageNumber = (totalMovies) => {
  return Math.ceil(totalMovies / ITEMS.perPage) + 1;
};
const selectElement = (selector, ancestor = document) => {
  const element = ancestor.querySelector(selector);
  if (!element) {
    throw new Error(`selector가 ${selector}인 엘리먼트를 찾을 수 없습니다.`);
  }
  return element;
};
const selectElementAll = (selector, ancestor = document) => {
  const elements = ancestor.querySelectorAll(selector);
  if (!elements) {
    throw new Error(`selector가 ${selector}인 엘리먼트들을 찾을 수 없습니다.`);
  }
  return elements;
};
const toggleElementVisibility = (selector, option) => {
  const element = selectElement(selector);
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};
const fetchMovies = async ({
  currentItemCount,
  apiFetcher,
  query
}) => {
  toggleElementVisibility(".skeleton-list", "show");
  const pageNumber = calculatePageNumber(
    currentItemCount ?? ITEMS.initialCount
  );
  const { results, totalResults } = await apiFetcher(pageNumber, query);
  if (totalResults === 0) {
    toggleElementVisibility(".no-thumbnail", "show");
  }
  toggleElementVisibility(".skeleton-list", "hidden");
  return results;
};
class TextButton {
  constructor({ id, title, onClick, type }) {
    __privateAdd(this, _id);
    __privateAdd(this, _title);
    __privateAdd(this, _onClick);
    __privateAdd(this, _type);
    __privateSet(this, _id, id);
    __privateSet(this, _title, title);
    __privateSet(this, _onClick, onClick);
    __privateSet(this, _type, type);
  }
  create() {
    const buttonElement = document.createElement("button");
    buttonElement.id = __privateGet(this, _id);
    buttonElement.classList.add(__privateGet(this, _type));
    buttonElement.textContent = __privateGet(this, _title);
    buttonElement.onclick = __privateGet(this, _onClick);
    return buttonElement;
  }
}
_id = new WeakMap();
_title = new WeakMap();
_onClick = new WeakMap();
_type = new WeakMap();
class ErrorUI {
  constructor({ status, message }) {
    __privateAdd(this, _ErrorUI_instances);
    __privateAdd(this, _status);
    __privateAdd(this, _message);
    __privateAdd(this, _element);
    __privateSet(this, _status, status ?? null);
    __privateSet(this, _message, message);
    __privateSet(this, _element, document.createElement("div"));
    __privateGet(this, _element).classList.add("error-box-container");
  }
  create() {
    const template = (
      /*html*/
      `
      <h2 class="error-status">${__privateGet(this, _status) ?? ""}</h2>
      <p class="error-message">${__privateGet(this, _message)}</p>
    `
    );
    __privateGet(this, _element).insertAdjacentHTML("beforeend", template);
    this.createButton();
  }
  createButton() {
    const button = new TextButton({
      id: "redirect-route-button",
      title: "메인 페이지로 돌아가기",
      type: "primary",
      onClick: __privateMethod(this, _ErrorUI_instances, handleClickRoutingHome_fn).bind(this)
    }).create();
    __privateGet(this, _element).insertAdjacentElement("beforeend", button);
  }
  renderError() {
    const main = selectElement("main");
    const target = selectElement(".search-container");
    main.replaceChildren();
    target.remove();
    main.insertAdjacentElement("beforeend", __privateGet(this, _element));
  }
}
_status = new WeakMap();
_message = new WeakMap();
_element = new WeakMap();
_ErrorUI_instances = new WeakSet();
handleClickRoutingHome_fn = function() {
  window.location.reload();
};
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjQxN2MwZDNkYmUzMjA5NGI5MjI2OTk2MzljNGQ4YSIsIm5iZiI6MTc0MjI3OTY4MS41NTgsInN1YiI6IjY3ZDkxNDAxZTFlM2NkY2JmOWM2YTQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U1Ea23_icQxUqe9m-t80lX49HV6QQJlFrMAGZJjpIvk";
const BASE_URL = "https://api.themoviedb.org/3";
const OPTION = {
  language: "ko-KR",
  region: "KR"
};
const ERROR = {
  DEFAULT: "문제가 발생했습니다. 관리자에게 문의해 주세요.",
  NETWORK_ERROR_MESSAGE: "Failed to fetch"
};
const STATUS_MESSAGE = {
  404: "페이지를 찾을 수 없습니다. 잠시 후에 다시 시도해주세요.",
  500: "서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.",
  503: "서비스를 이용할 수 없습니다. 잠시 후에 다시 시도해주세요."
};
const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};
const api = {
  async GETWithAuth(endpoint) {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes(ERROR.NETWORK_ERROR_MESSAGE)) {
          const errorUI = new ErrorUI({ message: ERROR.DEFAULT });
          errorUI.create();
          errorUI.renderError();
        } else {
          throw error;
        }
      }
    }
  }
};
const defaultParams = {
  language: OPTION.language,
  region: OPTION.region
};
const movieApi = {
  async getMovieData(pageNumber) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
        page: pageNumber.toString()
      }).toString();
      const endpoint = `/movie/popular?${params}`;
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  },
  async getSearchData(pageNumber, query) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
        page: pageNumber.toString(),
        query
      }).toString();
      const endpoint = `/search/movie?${params}`;
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  },
  async getMovieDetailsData(id) {
    try {
      const params = new URLSearchParams({
        ...defaultParams
      }).toString();
      const endpoint = `/movie/${id}?${params}`;
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  }
};
const KEY = {
  movieList: "movieList"
};
const getMovieRate = (movieId) => {
  const totalRates = movieService.getRateList();
  const targetRate = totalRates.find(({ id }) => {
    return id === movieId;
  });
  return targetRate ? targetRate.rate : VOTE.defaultRate;
};
const ratingMovie = (id, rate) => {
  const movieRate = { id, rate };
  const isRated = movieService.checkHasRated(id);
  if (isRated) {
    movieService.updateRateById(id, movieRate);
    return;
  }
  movieService.addRate(movieRate);
};
const calculateFilledStar = (rate) => {
  return rate / VOTE.unitRate;
};
const extractTotalMovies = (totalData) => {
  const { results, total_pages, total_results } = totalData;
  const movies = results.map((movieData) => extractMovie(movieData));
  return {
    results: movies,
    totalPages: total_pages,
    totalResults: total_results
  };
};
const extractMovie = (movieData) => {
  const { id, backdrop_path, poster_path, title, vote_average } = movieData;
  const backdropPath = IMAGE.backdropPrefix + backdrop_path;
  const posterPath = IMAGE.prefix + poster_path;
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));
  return {
    id,
    backdropPath,
    posterPath,
    title,
    voteAverage
  };
};
const extractMovieDetails = (movieDetailsData) => {
  const {
    genres,
    id,
    overview,
    poster_path,
    release_date,
    title,
    vote_average
  } = movieDetailsData;
  const genreNames = genres.map(({ name }) => name);
  const formattedOverview = overview === "" ? DETAILS.defaultOverview : overview;
  const posterPath = IMAGE.prefix + poster_path;
  const releaseYear = new Date(release_date).getFullYear();
  const voteAverage = Number(vote_average.toFixed(VOTE.rateDegit));
  const rate = getMovieRate(id);
  return {
    genres: genreNames,
    id,
    overview: formattedOverview,
    posterPath,
    releaseYear,
    title,
    voteAverage,
    rate
  };
};
const store = {
  storage: window.localStorage,
  getData(key) {
    return this.storage.getItem(key);
  },
  setData(key, data) {
    this.storage.setItem(key, data);
  },
  removeData(key) {
    this.storage.removeItem(key);
  }
};
const movieService = {
  async getMovies(pageNumber) {
    const rawData = await movieApi.getMovieData(pageNumber);
    return extractTotalMovies(rawData);
  },
  async searchMovies(pageNumber, query) {
    const rawData = await movieApi.getSearchData(pageNumber, query);
    return extractTotalMovies(rawData);
  },
  async getMovieDetail(movieId) {
    const rawData = await movieApi.getMovieDetailsData(movieId);
    return extractMovieDetails(rawData);
  },
  getRateList() {
    return JSON.parse(store.getData(KEY.movieList) ?? "[]");
  },
  updateRateById(id, newData) {
    const totalMovieRates = this.getRateList();
    const storedMoviesRates = totalMovieRates.filter(
      (data) => {
        return data.id !== id;
      }
    );
    const newMovieList = [...storedMoviesRates, newData];
    const stringifyData = JSON.stringify(newMovieList);
    store.setData(KEY.movieList, stringifyData);
  },
  addRate(data) {
    const totalMovieRates = this.getRateList();
    const newMovieList = [...totalMovieRates, data];
    const stringifyData = JSON.stringify(newMovieList);
    store.setData(KEY.movieList, stringifyData);
  },
  checkHasRated(movieId) {
    const totalMovieRates = this.getRateList();
    return totalMovieRates.filter(({ id }) => id === movieId).length > 0;
  }
};
const _ScrollRenderer = class _ScrollRenderer {
  static getInstance() {
    if (!__privateGet(_ScrollRenderer, _instance)) {
      __privateSet(_ScrollRenderer, _instance, new _ScrollRenderer());
    }
    return __privateGet(_ScrollRenderer, _instance);
  }
  createObserverCallback(fetch2, movieList) {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetch2(movieList, observer, _ScrollRenderer.getInstance());
          observer.unobserve(entry.target);
        }
      });
    };
  }
  setNewObservingTarget(observer, selector) {
    const newTarget = selectElement(selector);
    if (newTarget) {
      observer.observe(newTarget);
    }
  }
};
_instance = new WeakMap();
__privateAdd(_ScrollRenderer, _instance);
let ScrollRenderer = _ScrollRenderer;
class MovieItem {
  constructor({ id, title, voteAverage, posterPath }) {
    __privateAdd(this, _id2);
    __privateAdd(this, _title2);
    __privateAdd(this, _voteAverage);
    __privateAdd(this, _posterPath);
    __privateSet(this, _id2, id);
    __privateSet(this, _title2, title);
    __privateSet(this, _voteAverage, voteAverage);
    __privateSet(this, _posterPath, posterPath);
  }
  create() {
    const content = (
      /*html*/
      `
    <li class="item" data-id="${__privateGet(this, _id2)}">
        <img
        class="thumbnail"
        src=${__privateGet(this, _posterPath)}
        onerror="this.src='./images/null_image.png'"
        alt=${__privateGet(this, _title2)}
        />
        <div class="item-desc">
        <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span>${__privateGet(this, _voteAverage)}</span>
        </p>
        <strong>${__privateGet(this, _title2)}</strong>
        </div>
    </li>
    `
    );
    return content;
  }
}
_id2 = new WeakMap();
_title2 = new WeakMap();
_voteAverage = new WeakMap();
_posterPath = new WeakMap();
class MovieItemDetails {
  constructor({ id, rate, ...details }) {
    __privateAdd(this, _MovieItemDetails_instances);
    __privateAdd(this, _id3);
    __privateAdd(this, _rate);
    __privateAdd(this, _details);
    __privateAdd(this, _element2);
    __privateSet(this, _id3, id);
    __privateSet(this, _rate, rate);
    __privateSet(this, _details, details);
    __privateSet(this, _element2, document.createElement("div"));
  }
  create() {
    __privateMethod(this, _MovieItemDetails_instances, createContainer_fn).call(this);
    __privateMethod(this, _MovieItemDetails_instances, createPoster_fn).call(this);
    __privateMethod(this, _MovieItemDetails_instances, createDescription_fn).call(this);
    __privateMethod(this, _MovieItemDetails_instances, onRateBoxClick_fn).call(this);
    __privateMethod(this, _MovieItemDetails_instances, onInitialRateClick_fn).call(this);
    __privateGet(this, _element2).classList.add("modal-container");
    return __privateGet(this, _element2);
  }
}
_id3 = new WeakMap();
_rate = new WeakMap();
_details = new WeakMap();
_element2 = new WeakMap();
_MovieItemDetails_instances = new WeakSet();
createContainer_fn = function() {
  const template = (
    /*html*/
    `
    <div class="modal-image"></div>
    <div class="modal-description"></div>
    `
  );
  __privateGet(this, _element2).insertAdjacentHTML("beforeend", template);
};
createPoster_fn = function() {
  const div = selectElement(".modal-image", __privateGet(this, _element2));
  const posterImage = document.createElement("img");
  posterImage.src = __privateGet(this, _details).posterPath;
  posterImage.alt = __privateGet(this, _details).title;
  div.insertAdjacentElement("beforeend", posterImage);
};
createDescription_fn = function() {
  const description = selectElement(
    ".modal-description",
    __privateGet(this, _element2)
  );
  __privateMethod(this, _MovieItemDetails_instances, createTitle_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createCategory_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createRate_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createDivider_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createVotingRate_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createDivider_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createOverview_fn).call(this, description);
};
createTitle_fn = function(description) {
  const title = document.createElement("h2");
  title.textContent = __privateGet(this, _details).title;
  description.insertAdjacentElement("beforeend", title);
};
createCategory_fn = function(description) {
  const category = document.createElement("p");
  category.classList.add("category");
  category.textContent = __privateGet(this, _details).releaseYear + " · " + __privateGet(this, _details).genres.join(", ");
  description.insertAdjacentElement("beforeend", category);
};
createRate_fn = function(description) {
  const rate = document.createElement("p");
  rate.classList.add("rate");
  rate.textContent = "평균";
  const rateContents = (
    /*html*/
    `
      <img src="${VOTE.filledStarImage}" class="star" />
      <span>${__privateGet(this, _details).voteAverage}</span>
    `
  );
  rate.insertAdjacentHTML("beforeend", rateContents);
  description.insertAdjacentElement("beforeend", rate);
};
createOverview_fn = function(description) {
  const h3 = document.createElement("h3");
  h3.textContent = "줄거리";
  const overview = document.createElement("p");
  overview.classList.add("detail");
  overview.textContent = __privateGet(this, _details).overview;
  description.insertAdjacentElement("beforeend", h3);
  description.insertAdjacentElement("beforeend", overview);
};
createDivider_fn = function(description) {
  const hr = document.createElement("hr");
  description.insertAdjacentElement("beforeend", hr);
};
createVotingRate_fn = function(description) {
  const filledIndex = calculateFilledStar(__privateGet(this, _rate)) - 1;
  const starMarks = Array.from({ length: VOTE.maximumIconCount }).map((_, index) => {
    return (
      /*html*/
      `
          <img src="${index <= filledIndex ? VOTE.filledStarImage : VOTE.emptyStarImage}" class="star-mark" data-mark-index="${index + 1}"/>
        `
    );
  }).join("");
  const votingRate = (
    /*html*/
    `
      <div class="voting-rate">
        <div class="star-marks-container">${starMarks}</div>
        <p class="rate-message">${RATING_MESSAGE[__privateGet(this, _rate)] ?? VOTE.noticeMessage}
          <span>(${__privateGet(this, _rate)}/${VOTE.MaximumRate})</span>
        </p>
      </div>
    `
  );
  const h3 = document.createElement("h3");
  h3.textContent = "내 별점";
  description.insertAdjacentElement("beforeend", h3);
  description.insertAdjacentHTML("beforeend", votingRate);
};
onRateBoxClick_fn = function() {
  const starMarksContainer = selectElement(
    ".star-marks-container",
    __privateGet(this, _element2)
  );
  const eventHandler = __privateMethod(this, _MovieItemDetails_instances, handleRateHover_fn).bind(this);
  let isVotingActive = false;
  const handleRateBoxClick = () => {
    if (!isVotingActive) {
      starMarksContainer.addEventListener("mouseover", eventHandler);
      isVotingActive = true;
    } else {
      starMarksContainer.removeEventListener("mouseover", eventHandler);
      ratingMovie(__privateGet(this, _id3), __privateGet(this, _rate));
      isVotingActive = false;
    }
  };
  starMarksContainer.addEventListener("click", handleRateBoxClick);
};
onInitialRateClick_fn = function() {
  const handleInitialRateClick = (event) => {
    const hoveredStar = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const starredIndex = Number(hoveredStar.dataset.markIndex);
    const stars = selectElementAll(".star-mark");
    stars.forEach((star) => {
      const markIndex = Number(star.dataset.markIndex);
      star.src = markIndex <= starredIndex ? VOTE.filledStarImage : VOTE.emptyStarImage;
    });
  };
  const starMarksContainer = selectElement(
    ".star-marks-container",
    __privateGet(this, _element2)
  );
  starMarksContainer.addEventListener("click", handleInitialRateClick);
};
handleRateHover_fn = function(event) {
  const target = event.target;
  if (!target.closest(".star-marks-container")) {
    return;
  }
  const starredIndex = Number(target.dataset.markIndex);
  const stars = selectElementAll(".star-mark");
  stars.forEach((star) => {
    const markIndex = Number(star.dataset.markIndex);
    star.src = markIndex <= starredIndex ? VOTE.filledStarImage : VOTE.emptyStarImage;
  });
  const score = RATING_SCORE[starredIndex];
  __privateSet(this, _rate, score);
  const ratingMessage = selectElement(".rate-message");
  ratingMessage.textContent = RATING_MESSAGE[score];
  const ratingScore = document.createElement("span");
  ratingScore.textContent = `(${__privateGet(this, _rate)}/${VOTE.MaximumRate})`;
  ratingMessage.insertAdjacentElement("beforeend", ratingScore);
};
class MovieList {
  constructor(movieList) {
    __privateAdd(this, _movieList);
    __privateAdd(this, _totalItems);
    __privateAdd(this, _container);
    __privateSet(this, _movieList, movieList);
    __privateSet(this, _totalItems, __privateGet(this, _movieList).length);
    __privateSet(this, _container, selectElement("ul.thumbnail-list"));
  }
  create() {
    const movieItemsContent = __privateGet(this, _movieList).join("");
    __privateGet(this, _container).insertAdjacentHTML("beforeend", movieItemsContent);
  }
  clearList() {
    __privateGet(this, _container).replaceChildren();
  }
  updateList(newMovieItems) {
    __privateSet(this, _movieList, [...__privateGet(this, _movieList), ...newMovieItems]);
    __privateSet(this, _totalItems, __privateGet(this, _movieList).length);
    __privateGet(this, _container).insertAdjacentHTML("beforeend", newMovieItems.join(""));
  }
  getTotalItems() {
    return __privateGet(this, _totalItems);
  }
  onMovieClick(getDetail2, modal) {
    const handleMovieClick = async (event) => {
      const target = event.target;
      if (!target.closest("ul.thumbnail-list > li")) {
        return;
      }
      const movieContainer = target.closest(
        "ul.thumbnail-list > li"
      );
      const id = Number(movieContainer.dataset.id);
      const details = await getDetail2(id);
      const modalDetails = new MovieItemDetails(details).create();
      modal.open(modalDetails);
    };
    __privateGet(this, _container).addEventListener("click", handleMovieClick);
  }
}
_movieList = new WeakMap();
_totalItems = new WeakMap();
_container = new WeakMap();
class SearchBar {
  constructor() {
    __privateAdd(this, _SearchBar_instances);
    __privateAdd(this, _element3);
    __privateAdd(this, _query);
    __privateSet(this, _element3, document.createElement("div"));
    __privateSet(this, _query, "");
  }
  create() {
    __privateGet(this, _element3).classList.add("search-container");
    __privateGet(this, _element3).appendChild(__privateMethod(this, _SearchBar_instances, getInputElement_fn).call(this));
    __privateGet(this, _element3).appendChild(__privateMethod(this, _SearchBar_instances, getImageButton_fn).call(this));
    return __privateGet(this, _element3);
  }
  async setEvent() {
    const searchBar2 = selectElement(".search-bar");
    const searchButton = selectElement("#search");
    const apiFetcher = __privateMethod(this, _SearchBar_instances, getSearchResults_fn).bind(this);
    searchButton.onclick = () => {
      __privateMethod(this, _SearchBar_instances, onSearchTriggerBar_fn).call(this, apiFetcher);
    };
    const handleEnterKeyDown = async (event) => {
      if (event.isComposing) {
        return;
      }
      if (event.key === "Enter") {
        __privateMethod(this, _SearchBar_instances, onSearchTriggerBar_fn).call(this, apiFetcher);
        searchBar2.blur();
      }
    };
    searchBar2.onfocus = () => {
      window.addEventListener("keydown", handleEnterKeyDown);
    };
    searchBar2.onblur = () => {
      window.removeEventListener("keydown", handleEnterKeyDown);
    };
  }
}
_element3 = new WeakMap();
_query = new WeakMap();
_SearchBar_instances = new WeakSet();
onSearch_fn = async function(movieList, getSearchResults) {
  const totalItems = movieList.getTotalItems();
  const newMovieData = await getSearchResults(__privateGet(this, _query), totalItems);
  const movieItems = __privateMethod(this, _SearchBar_instances, createResultMovieItems_fn).call(this, newMovieData);
  movieList.updateList(movieItems);
  const scrollRenderer = ScrollRenderer.getInstance();
  const updateList = __privateMethod(this, _SearchBar_instances, updateMovieList_fn).bind(this);
  const lastMovieItemObserver = new IntersectionObserver(
    scrollRenderer.createObserverCallback(updateList, movieList),
    { threshold: 1 }
  );
  const targetElement = selectElement(
    "ul.thumbnail-list > li:last-child"
  );
  lastMovieItemObserver.observe(targetElement);
};
updateMovieList_fn = async function(movieList, observer, scrollRenderer) {
  const totalItems = movieList.getTotalItems();
  const newMovieData = await __privateMethod(this, _SearchBar_instances, getSearchResults_fn).call(this, __privateGet(this, _query), totalItems);
  const movieItems = __privateMethod(this, _SearchBar_instances, createResultMovieItems_fn).call(this, newMovieData);
  movieList.updateList(movieItems);
  scrollRenderer.setNewObservingTarget(
    observer,
    "ul.thumbnail-list > li:last-child"
  );
};
onSearchTriggerBar_fn = async function(getSearchResults) {
  const movieList = new MovieList([]);
  movieList.clearList();
  const searchBar2 = selectElement(".search-bar");
  __privateSet(this, _query, searchBar2.value);
  __privateMethod(this, _SearchBar_instances, changeTitleStyle_fn).call(this);
  await __privateMethod(this, _SearchBar_instances, onSearch_fn).call(this, movieList, getSearchResults);
};
getInputElement_fn = function() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("search-bar");
  searchInput.placeholder = "검색어를 입력하세요";
  return searchInput;
};
getImageButton_fn = function() {
  const imgButton = document.createElement("img");
  imgButton.id = "search";
  imgButton.src = "./images/search_button.png";
  imgButton.alt = "SearchButton";
  return imgButton;
};
changeTitleStyle_fn = function() {
  const overlay = selectElement(".overlay");
  const topRatedContainer = selectElement(".top-rated-movie");
  const backgroundContainer = selectElement(
    ".background-container"
  );
  const subTitle = selectElement(".subTitle");
  subTitle.textContent = `"${__privateGet(this, _query)}" 검색 결과`;
  overlay.style.display = "none";
  topRatedContainer.style.display = "none";
  backgroundContainer.style.height = "auto";
};
createResultMovieItems_fn = function(movies) {
  return movies.map(({ id, title, posterPath, voteAverage }) => {
    const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
    return movieItem.create();
  });
};
getSearchResults_fn = async function(query, currentItemCount) {
  return await fetchMovies({
    currentItemCount,
    apiFetcher: (page, query2) => movieService.searchMovies(page, query2 ?? ""),
    query
  });
};
class SkeletonUl {
  constructor() {
    __privateAdd(this, _SkeletonUl_instances);
  }
  create() {
    const skeletonUlElement = document.createElement("ul");
    skeletonUlElement.classList.add("skeleton-list");
    Array.from({ length: ITEMS.perPage }).forEach(
      () => skeletonUlElement.appendChild(__privateMethod(this, _SkeletonUl_instances, createSkeletonLi_fn).call(this))
    );
    return skeletonUlElement;
  }
}
_SkeletonUl_instances = new WeakSet();
createSkeletonLi_fn = function() {
  const skeletonLiElement = document.createElement("li");
  const content = (
    /*html*/
    `
    <div class="item skeleton-item">
      <div class="thumbnail"></div>
    </div>
    `
  );
  skeletonLiElement.insertAdjacentHTML("beforeend", content);
  return skeletonLiElement;
};
class Modal {
  constructor() {
    __privateAdd(this, _Modal_instances);
    __privateAdd(this, _element4);
    __privateSet(this, _element4, this.create());
    this.setEvent();
  }
  create() {
    const template = (
      /*html*/
      `
    <div class="modal-background" id="modalBackground">
      <div class="modal" id="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
      </div>
    </div>
    `
    );
    const body = selectElement("body");
    body.insertAdjacentHTML("beforeend", template);
    return selectElement("#modal");
  }
  open(contents) {
    const prevContents = __privateGet(this, _element4).querySelector(".modal-container");
    if (prevContents) {
      prevContents.remove();
    }
    __privateGet(this, _element4).insertAdjacentElement("beforeend", contents);
    const modalBackground = selectElement("#modalBackground");
    modalBackground.classList.add("active");
  }
  setEvent() {
    __privateMethod(this, _Modal_instances, onClickCloseButton_fn).call(this);
    __privateMethod(this, _Modal_instances, onClickBackground_fn).call(this);
    __privateMethod(this, _Modal_instances, onKeydownEscape_fn).call(this);
  }
}
_element4 = new WeakMap();
_Modal_instances = new WeakSet();
close_fn = function() {
  const modalBackground = selectElement("#modalBackground");
  modalBackground.classList.remove("active");
};
onClickCloseButton_fn = function() {
  const closeModalButton = selectElement("#closeModal");
  closeModalButton.addEventListener("click", __privateMethod(this, _Modal_instances, close_fn));
};
onClickBackground_fn = function() {
  const handleBackdropClick = (event) => {
    const target = event.target;
    if (target.closest("#modalBackground") && !target.closest(".modal")) {
      __privateMethod(this, _Modal_instances, close_fn).call(this);
    }
  };
  const modalBackground = selectElement("#modalBackground");
  modalBackground.addEventListener("click", handleBackdropClick);
};
onKeydownEscape_fn = function() {
  const handleEscapeKeydown = (event) => {
    if (event.key === "Escape") {
      __privateMethod(this, _Modal_instances, close_fn).call(this);
    }
  };
  document.addEventListener("keydown", handleEscapeKeydown);
};
const getDetail = async (id) => {
  return await movieService.getMovieDetail(id);
};
const renderTitleMovie = (movieData) => {
  const topMovieData = movieData[0];
  const movieTitle = topMovieData.title;
  const movieRate = topMovieData.voteAverage;
  const movieBackdropUrl = IMAGE.backdropPrefix + topMovieData.backdropPath;
  const topMovieTitle = selectElement(
    ".top-rated-movie .title"
  );
  const topMovieRateValue = selectElement(
    ".top-rated-movie .rate-value"
  );
  const backgroundOverlay = selectElement(
    ".background-container .overlay"
  );
  topMovieTitle.textContent = movieTitle;
  topMovieRateValue.textContent = String(movieRate);
  backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
};
const createMovieItems = (movieData) => {
  return movieData.map(({ id, title, posterPath, voteAverage }) => {
    const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
    return movieItem.create();
  });
};
const createMovieList = (movieData) => {
  const movieItems = createMovieItems(movieData);
  return new MovieList(movieItems);
};
const updateMovieList = async (movieList, observer, scrollRenderer) => {
  const totalItems = movieList.getTotalItems();
  const newMovieData = await fetchMovies({
    currentItemCount: totalItems,
    apiFetcher: movieService.getMovies
  });
  const movieItems = createMovieItems(newMovieData);
  movieList.updateList(movieItems);
  scrollRenderer.setNewObservingTarget(
    observer,
    "ul.thumbnail-list > li:last-child"
  );
};
const mainSection = selectElement("main section");
const skeletonUl = new SkeletonUl();
const searchBar = new SearchBar();
const logo = selectElement(".logo");
const logoImage = selectElement(".logo img");
const app = async () => {
  logoImage.addEventListener("click", () => {
    window.location.reload();
  });
  logo.appendChild(searchBar.create());
  mainSection.appendChild(skeletonUl.create());
  searchBar.setEvent();
  const scrollRenderer = ScrollRenderer.getInstance();
  const movieData = await fetchMovies({ apiFetcher: movieService.getMovies });
  const movieList = createMovieList(movieData);
  const detailsModal = new Modal();
  renderTitleMovie(movieData);
  movieList.create();
  movieList.onMovieClick(getDetail, detailsModal);
  const lastMovieItemObserver = new IntersectionObserver(
    scrollRenderer.createObserverCallback(updateMovieList, movieList),
    { threshold: 1 }
  );
  const targetElement = selectElement(
    "ul.thumbnail-list > li:last-child"
  );
  lastMovieItemObserver.observe(targetElement);
};
app();
