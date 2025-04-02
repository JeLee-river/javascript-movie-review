var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _id, _title, _onClick, _type, _status, _message, _element, _ErrorUI_instances, handleClickRoutingHome_fn, _instance, _topMovie, _id2, _title2, _voteAverage, _posterPath, _title3, _releaseYear, _genres, _voteAverage2, _MovieDetailsHeader_instances, createTitle_fn, createCategory_fn, createRate_fn, _overview, _posterPath2, _title4, _id3, _rate, _element2, _UserRating_instances, init_fn, createStars_fn, createRateMessage_fn, onRateBoxClick_fn, onInitialRateClick_fn, handleRateHover_fn, _ratingMovie, _id4, _rate2, _details, _element3, _MovieItemDetails_instances, createPoster_fn, createDescription_fn, createHeader_fn, createOverview_fn, createDivider_fn, createVotingRate_fn, _movieList, _totalItems, _container, _parent, _element4, _instance2, _NonResultUI_instances, create_fn, createImage_fn, createMessage_fn, _element5, _instance3, _SkeletonUl_instances, create_fn2, createSkeletonLi_fn, _element6, _query, _SearchBar_instances, onSearch_fn, updateMovieList_fn, onSubmitQuery_fn, createInputBar_fn, createInputImage_fn, changeTitleStyle_fn, createResultMovieItems_fn, getSearchResults_fn, _element7, _Modal_instances, close_fn, onClickCloseButton_fn, onClickBackground_fn, onKeydownEscape_fn;
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
const ERROR = {
  DEFAULT: "문제가 발생했습니다. 관리자에게 문의해 주세요.",
  NETWORK_ERROR_MESSAGE: "Failed to fetch"
};
const STATUS_MESSAGE = {
  404: "페이지를 찾을 수 없습니다. 잠시 후에 다시 시도해주세요.",
  500: "서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.",
  503: "서비스를 이용할 수 없습니다. 잠시 후에 다시 시도해주세요."
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
const toggleElementVisibility = (element, option) => {
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
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
    const target = selectElement("#search-container");
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
        throw error;
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
        throw error;
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
        throw error;
      }
    }
  }
};
const KEY = {
  movieList: "movieList"
};
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
const getMovieRate = (movieRate) => {
  return movieRate ? movieRate.rate : VOTE.defaultRate;
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
const extractMovieDetails = (movieDetailsData, movieRate) => {
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
  const rate = getMovieRate(movieRate);
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
const storage = {
  localStorage: window.localStorage,
  getData(key) {
    return this.localStorage.getItem(key);
  },
  setData(key, data) {
    this.localStorage.setItem(key, data);
  },
  removeData(key) {
    this.localStorage.removeItem(key);
  }
};
const movieService = {
  async getMovies(totalCount) {
    const pageNumber = calculatePageNumber(totalCount);
    const rawData = await movieApi.getMovieData(pageNumber);
    return extractTotalMovies(rawData);
  },
  async searchMovies(totalCount, query) {
    const pageNumber = calculatePageNumber(totalCount);
    const rawData = await movieApi.getSearchData(pageNumber, query);
    return extractTotalMovies(rawData);
  },
  async getMovieDetail(movieId) {
    const rawData = await movieApi.getMovieDetailsData(movieId);
    const movieRate = this.getRateById(movieId);
    return extractMovieDetails(rawData, movieRate);
  },
  getRateList() {
    const rate = storage.getData(KEY.movieList) ?? "[]";
    return JSON.parse(rate);
  },
  getRateById(movieId) {
    const totalMovieRates = this.getRateList();
    const targetRate = totalMovieRates.find(({ id }) => {
      return id === movieId;
    });
    return targetRate ?? null;
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
    storage.setData(KEY.movieList, stringifyData);
  },
  addRate(data) {
    const totalMovieRates = this.getRateList();
    const newMovieList = [...totalMovieRates, data];
    const stringifyData = JSON.stringify(newMovieList);
    storage.setData(KEY.movieList, stringifyData);
  },
  checkHasRated(movieId) {
    const totalMovieRates = this.getRateList();
    return totalMovieRates.filter(({ id }) => id === movieId).length > 0;
  },
  getRateStars(rate) {
    return calculateFilledStar(rate);
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
class Banner {
  constructor(topMovie) {
    __privateAdd(this, _topMovie);
    __privateSet(this, _topMovie, topMovie);
  }
  renderTitleMovie() {
    const { title, voteAverage, backdropPath } = __privateGet(this, _topMovie);
    const movieBackdropUrl = IMAGE.backdropPrefix + backdropPath;
    const topMovieTitle = selectElement(
      ".top-rated-movie .title"
    );
    const topMovieRateValue = selectElement(
      ".top-rated-movie .rate-value"
    );
    const backgroundOverlay = selectElement(
      ".background-container .overlay"
    );
    topMovieTitle.textContent = title;
    topMovieRateValue.textContent = String(voteAverage);
    backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
  }
  static hiddenTitleMovie() {
    const overlay = selectElement(".overlay");
    const topRatedContainer = selectElement(".top-rated-movie");
    const backgroundContainer = selectElement(
      ".background-container"
    );
    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }
}
_topMovie = new WeakMap();
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
class MovieDetailsHeader {
  constructor({ title, releaseYear, genres, voteAverage }) {
    __privateAdd(this, _MovieDetailsHeader_instances);
    __privateAdd(this, _title3);
    __privateAdd(this, _releaseYear);
    __privateAdd(this, _genres);
    __privateAdd(this, _voteAverage2);
    __privateSet(this, _title3, title);
    __privateSet(this, _releaseYear, releaseYear);
    __privateSet(this, _genres, genres);
    __privateSet(this, _voteAverage2, voteAverage);
  }
  create() {
    const movieTitle = __privateMethod(this, _MovieDetailsHeader_instances, createTitle_fn).call(this);
    const category = __privateMethod(this, _MovieDetailsHeader_instances, createCategory_fn).call(this);
    const rate = __privateMethod(this, _MovieDetailsHeader_instances, createRate_fn).call(this);
    return {
      movieTitle,
      category,
      rate
    };
  }
}
_title3 = new WeakMap();
_releaseYear = new WeakMap();
_genres = new WeakMap();
_voteAverage2 = new WeakMap();
_MovieDetailsHeader_instances = new WeakSet();
createTitle_fn = function() {
  const title = document.createElement("h2");
  title.textContent = __privateGet(this, _title3);
  return title;
};
createCategory_fn = function() {
  const category = document.createElement("p");
  category.classList.add("category");
  category.textContent = __privateGet(this, _releaseYear) + " · " + __privateGet(this, _genres).join(", ");
  return category;
};
createRate_fn = function() {
  const rate = document.createElement("p");
  rate.classList.add("rate");
  rate.textContent = "평균";
  const rateContents = (
    /*html*/
    `
        <img src="${VOTE.filledStarImage}" class="star" />
        <span>${__privateGet(this, _voteAverage2)}</span>
      `
  );
  rate.insertAdjacentHTML("beforeend", rateContents);
  return rate;
};
class MovieOverview {
  constructor({ overview }) {
    __privateAdd(this, _overview);
    __privateSet(this, _overview, overview);
  }
  create() {
    const overview = document.createElement("p");
    overview.classList.add("detail");
    overview.textContent = __privateGet(this, _overview);
    return overview;
  }
}
_overview = new WeakMap();
class MoviePoster {
  constructor({ posterPath, title }) {
    __privateAdd(this, _posterPath2);
    __privateAdd(this, _title4);
    __privateSet(this, _posterPath2, posterPath);
    __privateSet(this, _title4, title);
  }
  create() {
    const poster = document.createElement("div");
    poster.classList.add("modal-image");
    const posterImage = document.createElement("img");
    posterImage.src = __privateGet(this, _posterPath2);
    posterImage.alt = __privateGet(this, _title4);
    poster.appendChild(posterImage);
    return poster;
  }
}
_posterPath2 = new WeakMap();
_title4 = new WeakMap();
class UserRating {
  constructor({ id, rate }) {
    __privateAdd(this, _UserRating_instances);
    __privateAdd(this, _id3);
    __privateAdd(this, _rate);
    __privateAdd(this, _element2);
    __privateAdd(this, _ratingMovie, (id, rate) => {
      const movieRate = { id, rate };
      const isRated = movieService.checkHasRated(id);
      if (isRated) {
        movieService.updateRateById(id, movieRate);
        return;
      }
      movieService.addRate(movieRate);
    });
    __privateSet(this, _id3, id);
    __privateSet(this, _rate, rate);
    __privateSet(this, _element2, document.createElement("div"));
    __privateGet(this, _element2).classList.add("voting-rate");
  }
  create() {
    __privateMethod(this, _UserRating_instances, init_fn).call(this);
    return __privateGet(this, _element2);
  }
}
_id3 = new WeakMap();
_rate = new WeakMap();
_element2 = new WeakMap();
_UserRating_instances = new WeakSet();
init_fn = function() {
  const starMarks = __privateMethod(this, _UserRating_instances, createStars_fn).call(this);
  const rateMessage = __privateMethod(this, _UserRating_instances, createRateMessage_fn).call(this);
  __privateGet(this, _element2).insertAdjacentElement("beforeend", starMarks);
  __privateGet(this, _element2).insertAdjacentHTML("beforeend", rateMessage);
  __privateMethod(this, _UserRating_instances, onRateBoxClick_fn).call(this, starMarks);
  __privateMethod(this, _UserRating_instances, onInitialRateClick_fn).call(this, starMarks);
};
createStars_fn = function() {
  const starMarksContainer = document.createElement("div");
  starMarksContainer.classList.add("star-marks-container");
  const filledIndex = movieService.getRateStars(__privateGet(this, _rate)) - 1;
  const starMarks = Array.from({ length: VOTE.maximumIconCount }).map((_, index) => {
    return (
      /*html*/
      `
          <img src="${index <= filledIndex ? VOTE.filledStarImage : VOTE.emptyStarImage}" class="star-mark" data-mark-index="${index + 1}"/>
        `
    );
  }).join("");
  starMarksContainer.insertAdjacentHTML("beforeend", starMarks);
  return starMarksContainer;
};
createRateMessage_fn = function() {
  const rateMessage = (
    /*html*/
    `
        <p class="rate-message">${RATING_MESSAGE[__privateGet(this, _rate)] ?? VOTE.noticeMessage}
          <span>(${__privateGet(this, _rate)}/${VOTE.MaximumRate})</span>
        </p>
    `
  );
  return rateMessage;
};
onRateBoxClick_fn = function(eventContainer) {
  const eventHandler = __privateMethod(this, _UserRating_instances, handleRateHover_fn).bind(this);
  let isVotingActive = false;
  const handleRateBoxClick = (event) => {
    eventHandler(event);
    if (!isVotingActive) {
      eventContainer.addEventListener("mouseover", eventHandler);
      isVotingActive = true;
    } else {
      eventContainer.removeEventListener("mouseover", eventHandler);
      __privateGet(this, _ratingMovie).call(this, __privateGet(this, _id3), __privateGet(this, _rate));
      isVotingActive = false;
    }
  };
  eventContainer.addEventListener("click", handleRateBoxClick);
};
onInitialRateClick_fn = function(eventContainer) {
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
  eventContainer.addEventListener("click", handleInitialRateClick);
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
_ratingMovie = new WeakMap();
class MovieItemDetails {
  constructor({ id, rate, ...details }) {
    __privateAdd(this, _MovieItemDetails_instances);
    __privateAdd(this, _id4);
    __privateAdd(this, _rate2);
    __privateAdd(this, _details);
    __privateAdd(this, _element3);
    __privateSet(this, _id4, id);
    __privateSet(this, _rate2, rate);
    __privateSet(this, _details, details);
    __privateSet(this, _element3, document.createElement("div"));
    __privateGet(this, _element3).classList.add("modal-container");
  }
  create() {
    __privateGet(this, _element3).insertAdjacentElement("beforeend", __privateMethod(this, _MovieItemDetails_instances, createPoster_fn).call(this));
    __privateGet(this, _element3).insertAdjacentElement("beforeend", __privateMethod(this, _MovieItemDetails_instances, createDescription_fn).call(this));
    return __privateGet(this, _element3);
  }
}
_id4 = new WeakMap();
_rate2 = new WeakMap();
_details = new WeakMap();
_element3 = new WeakMap();
_MovieItemDetails_instances = new WeakSet();
createPoster_fn = function() {
  const { posterPath, title } = __privateGet(this, _details);
  const poster = new MoviePoster({ posterPath, title });
  return poster.create();
};
createDescription_fn = function() {
  const description = document.createElement("div");
  description.classList.add("modal-description");
  __privateMethod(this, _MovieItemDetails_instances, createHeader_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createDivider_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createVotingRate_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createDivider_fn).call(this, description);
  __privateMethod(this, _MovieItemDetails_instances, createOverview_fn).call(this, description);
  return description;
};
createHeader_fn = function(description) {
  const { title, releaseYear, genres, voteAverage } = __privateGet(this, _details);
  const { movieTitle, category, rate } = new MovieDetailsHeader({
    title,
    releaseYear,
    genres,
    voteAverage
  }).create();
  description.insertAdjacentElement("beforeend", movieTitle);
  description.insertAdjacentElement("beforeend", category);
  description.insertAdjacentElement("beforeend", rate);
};
createOverview_fn = function(description) {
  const h3 = document.createElement("h3");
  h3.textContent = "줄거리";
  const { overview } = __privateGet(this, _details);
  const movieOverview = new MovieOverview({
    overview
  }).create();
  description.insertAdjacentElement("beforeend", h3);
  description.insertAdjacentElement("beforeend", movieOverview);
};
createDivider_fn = function(description) {
  const hr = document.createElement("hr");
  description.insertAdjacentElement("beforeend", hr);
};
createVotingRate_fn = function(description) {
  const h3 = document.createElement("h3");
  h3.textContent = "내 별점";
  const userRating = new UserRating({
    id: __privateGet(this, _id4),
    rate: __privateGet(this, _rate2)
  }).create();
  description.insertAdjacentElement("beforeend", h3);
  description.insertAdjacentElement("beforeend", userRating);
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
  onMovieClick(modal) {
    const handleMovieClick = async (event) => {
      const target = event.target;
      if (!target.closest("ul.thumbnail-list > li")) {
        return;
      }
      const movieContainer = target.closest(
        "ul.thumbnail-list > li"
      );
      const id = Number(movieContainer.dataset.id);
      const details = await movieService.getMovieDetail(id);
      const modalDetails = new MovieItemDetails(details).create();
      modal.open(modalDetails);
    };
    __privateGet(this, _container).addEventListener("click", handleMovieClick);
  }
}
_movieList = new WeakMap();
_totalItems = new WeakMap();
_container = new WeakMap();
const _NonResultUI = class _NonResultUI {
  constructor() {
    __privateAdd(this, _NonResultUI_instances);
    __privateAdd(this, _parent);
    __privateAdd(this, _element4);
    __privateSet(this, _parent, selectElement("main section"));
    __privateSet(this, _element4, document.createElement("div"));
    __privateGet(this, _element4).classList.add("no-thumbnail", "hidden");
    __privateMethod(this, _NonResultUI_instances, create_fn).call(this);
  }
  static getInstance() {
    if (!__privateGet(_NonResultUI, _instance2)) {
      __privateSet(_NonResultUI, _instance2, new _NonResultUI());
    }
    return __privateGet(_NonResultUI, _instance2);
  }
  toggle(totalItems) {
    if (totalItems === 0) {
      toggleElementVisibility(__privateGet(this, _element4), "show");
    } else {
      toggleElementVisibility(__privateGet(this, _element4), "hidden");
    }
  }
};
_parent = new WeakMap();
_element4 = new WeakMap();
_instance2 = new WeakMap();
_NonResultUI_instances = new WeakSet();
create_fn = function() {
  const image = __privateMethod(this, _NonResultUI_instances, createImage_fn).call(this);
  const message = __privateMethod(this, _NonResultUI_instances, createMessage_fn).call(this);
  __privateGet(this, _element4).insertAdjacentElement("beforeend", image);
  __privateGet(this, _element4).insertAdjacentElement("beforeend", message);
  __privateGet(this, _parent).insertAdjacentElement("beforeend", __privateGet(this, _element4));
};
createImage_fn = function() {
  const image = document.createElement("img");
  image.src = "./images/no_result_icon.png";
  image.alt = "결과없음";
  return image;
};
createMessage_fn = function() {
  const message = document.createElement("h2");
  message.textContent = "검색 결과가 없습니다.";
  return message;
};
__privateAdd(_NonResultUI, _instance2);
let NonResultUI = _NonResultUI;
const _SkeletonUl = class _SkeletonUl {
  constructor() {
    __privateAdd(this, _SkeletonUl_instances);
    __privateAdd(this, _element5);
    __privateSet(this, _element5, document.createElement("ul"));
    __privateGet(this, _element5).classList.add("skeleton-list");
    __privateMethod(this, _SkeletonUl_instances, create_fn2).call(this);
  }
  static getInstance() {
    if (!__privateGet(_SkeletonUl, _instance3)) {
      __privateSet(_SkeletonUl, _instance3, new _SkeletonUl());
    }
    return __privateGet(_SkeletonUl, _instance3);
  }
  async getLoadingResult(callback) {
    toggleElementVisibility(__privateGet(this, _element5), "show");
    try {
      return await callback();
    } catch (error) {
      throw error;
    } finally {
      toggleElementVisibility(__privateGet(this, _element5), "hidden");
    }
  }
};
_element5 = new WeakMap();
_instance3 = new WeakMap();
_SkeletonUl_instances = new WeakSet();
create_fn2 = function() {
  const mainSection = selectElement("main section");
  Array.from({ length: ITEMS.perPage }).forEach(
    () => __privateGet(this, _element5).insertAdjacentElement("beforeend", __privateMethod(this, _SkeletonUl_instances, createSkeletonLi_fn).call(this))
  );
  mainSection.insertAdjacentElement("beforeend", __privateGet(this, _element5));
};
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
__privateAdd(_SkeletonUl, _instance3);
let SkeletonUl = _SkeletonUl;
class SearchBar {
  constructor() {
    __privateAdd(this, _SearchBar_instances);
    __privateAdd(this, _element6);
    __privateAdd(this, _query);
    __privateSet(this, _element6, document.createElement("form"));
    __privateGet(this, _element6).id = "search-container";
    __privateSet(this, _query, "");
  }
  create() {
    __privateGet(this, _element6).appendChild(__privateMethod(this, _SearchBar_instances, createInputBar_fn).call(this));
    __privateGet(this, _element6).appendChild(__privateMethod(this, _SearchBar_instances, createInputImage_fn).call(this));
    return __privateGet(this, _element6);
  }
  setEvent() {
    __privateGet(this, _element6).addEventListener(
      "submit",
      (event) => __privateMethod(this, _SearchBar_instances, onSubmitQuery_fn).call(this, event)
    );
  }
}
_element6 = new WeakMap();
_query = new WeakMap();
_SearchBar_instances = new WeakSet();
onSearch_fn = async function(movieList) {
  const totalItems = movieList.getTotalItems();
  const results = await __privateMethod(this, _SearchBar_instances, getSearchResults_fn).call(this, totalItems, __privateGet(this, _query));
  if (results) {
    const movieItems = __privateMethod(this, _SearchBar_instances, createResultMovieItems_fn).call(this, results);
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
  }
};
updateMovieList_fn = async function(movieList, observer, scrollRenderer) {
  const totalItems = movieList.getTotalItems();
  const results = await __privateMethod(this, _SearchBar_instances, getSearchResults_fn).call(this, totalItems, __privateGet(this, _query));
  if (results) {
    const movieItems = __privateMethod(this, _SearchBar_instances, createResultMovieItems_fn).call(this, results);
    movieList.updateList(movieItems);
    scrollRenderer.setNewObservingTarget(
      observer,
      "ul.thumbnail-list > li:last-child"
    );
  }
};
onSubmitQuery_fn = async function(event) {
  event.preventDefault();
  const target = event.target;
  const formData = new FormData(target);
  __privateSet(this, _query, formData.get("query"));
  const movieList = new MovieList([]);
  movieList.clearList();
  __privateMethod(this, _SearchBar_instances, changeTitleStyle_fn).call(this);
  await __privateMethod(this, _SearchBar_instances, onSearch_fn).call(this, movieList);
};
createInputBar_fn = function() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.name = "query";
  searchInput.classList.add("search-bar");
  searchInput.placeholder = "검색어를 입력하세요";
  return searchInput;
};
createInputImage_fn = function() {
  const inputImage = document.createElement("input");
  inputImage.type = "image";
  inputImage.id = "search";
  inputImage.src = "./images/search_button.png";
  inputImage.alt = "SearchButton";
  return inputImage;
};
changeTitleStyle_fn = function() {
  const subTitle = selectElement(".subTitle");
  subTitle.textContent = `"${__privateGet(this, _query)}" 검색 결과`;
  Banner.hiddenTitleMovie();
};
createResultMovieItems_fn = function(movies) {
  return movies.map(({ id, title, posterPath, voteAverage }) => {
    const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
    return movieItem.create();
  });
};
getSearchResults_fn = async function(totalItems, query) {
  try {
    const { results, totalResults } = await SkeletonUl.getInstance().getLoadingResult(
      () => movieService.searchMovies(totalItems, query)
    );
    NonResultUI.getInstance().toggle(totalResults);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      const status = Number(error.message);
      const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
      const errorUI = new ErrorUI({ status, message });
      errorUI.create();
      errorUI.renderError();
    }
  }
};
class Modal {
  constructor() {
    __privateAdd(this, _Modal_instances);
    __privateAdd(this, _element7);
    __privateSet(this, _element7, this.create());
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
    const prevContents = __privateGet(this, _element7).querySelector(".modal-container");
    if (prevContents) {
      prevContents.remove();
    }
    __privateGet(this, _element7).insertAdjacentElement("beforeend", contents);
    const modalBackground = selectElement("#modalBackground");
    modalBackground.classList.add("active");
  }
  setEvent() {
    __privateMethod(this, _Modal_instances, onClickCloseButton_fn).call(this);
    __privateMethod(this, _Modal_instances, onClickBackground_fn).call(this);
    __privateMethod(this, _Modal_instances, onKeydownEscape_fn).call(this);
  }
}
_element7 = new WeakMap();
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
const getMovieData = async (totalItems) => {
  try {
    return await SkeletonUl.getInstance().getLoadingResult(
      () => movieService.getMovies(totalItems)
    );
  } catch (error) {
    if (error instanceof Error) {
      const status = Number(error.message);
      const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
      const errorUI = new ErrorUI({ status, message });
      errorUI.create();
      errorUI.renderError();
    }
  }
};
const renderTitleMovie = (movieData) => {
  const topMovieData = movieData[0];
  const banner = new Banner(topMovieData);
  banner.renderTitleMovie();
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
  const movieData = await getMovieData(totalItems);
  if (movieData) {
    const { results } = movieData;
    const movieItems = createMovieItems(results);
    movieList.updateList(movieItems);
    scrollRenderer.setNewObservingTarget(
      observer,
      "ul.thumbnail-list > li:last-child"
    );
  }
};
const searchBar = new SearchBar();
const logo = selectElement(".logo");
const logoImage = selectElement(".logo img");
const app = async () => {
  logoImage.addEventListener("click", () => {
    window.location.reload();
  });
  logo.appendChild(searchBar.create());
  searchBar.setEvent();
  const movieData = await getMovieData(ITEMS.initialCount);
  if (movieData) {
    const { results } = movieData;
    const movieList = createMovieList(results);
    renderTitleMovie(results);
    movieList.create();
    const detailsModal = new Modal();
    movieList.onMovieClick(detailsModal);
    const scrollRenderer = ScrollRenderer.getInstance();
    const lastMovieItemObserver = new IntersectionObserver(
      scrollRenderer.createObserverCallback(updateMovieList, movieList),
      { threshold: 1 }
    );
    const targetElement = selectElement(
      "ul.thumbnail-list > li:last-child"
    );
    lastMovieItemObserver.observe(targetElement);
  }
};
app();
