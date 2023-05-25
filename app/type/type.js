export const TypePage = (name, id, url) => {
  return `<html lang="ru">

  <head>
    <title>${name} | Интернет-магазин Северяночка</title>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="${url}/assets/libs/Swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="${url}/assets/libs/Choices/choices.min.css">
    <link rel="stylesheet" href="${url}/assets/libs/nouiSlider/nouislider.min.css">
    <link rel="stylesheet" href="${url}/css/style.min.css">
    <link rel="shortcut icon" href="${url}/img/favicon/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body class="webp">
    <div class="wrapper">
      <header class="header">
        <div class="header__admin">
          <a href="${url}/admin.html" class="header__admin-link">Администрирование</a>
        </div>
        <div class="container">
          <div class="header-wrapper">
            <div class="header-logo">
              <a href="${url}/index.html" class="link-logo">
                <img src="${url}/img/logo.png" alt="Лого Серебряночка" class="logo-img">
                <span class="header-logo__span">Северяночка</span>
              </a>
            </div>
            <div class="wrpper-catalog__button">
              <a href="${url}/catalog.html" class="header-catalog__button">
                <div class="header-catalog__icon">
                  <span></span>
                </div>
                <span class="header-catalog__span">Каталог</span>
              </a>
            </div>
            <div class="header-serch__block">
              <form action="#" class="header-search">
                <input id="header-input" type="text" name="search" class="header-search__input" placeholder="Найти товар">
                <button for="header-input" class="_icon-search btn-search"></button>
              </form>
              <div class="search_result">
                <ul class="search_list">
                </ul>
                <a href="${url}/search-result.html" class="search-all">Все результаты</a>
              </div>
            </div>
            <div class="header-menu__wrpper">
              <div class="header-menu" data-da=".menu-fixed, 768, 0">
                <a href="${url}/catalog.html" class="header-menu__item header-menu__catalog">
                  <span class="icon icon-shape _icon-menu"></span>
                  <span class="text">Каталог</span>
                </a>
                <a href="${url}/favourites.html" class="header-menu__item header-menu__favourites">
                  <span class="icon icon-menu _icon-shape"><span id="menu-favourite" class="cart-quantity">4</span></span>
                  <span class="text">Избраное</span>
                </a>
                <a href="${url}/orders.html" class="header-menu__item header-menu__orders">
                  <span class="icon icon-menu _icon-orders"><span id="menu-order" class="cart-quantity">0</span></span>
                  <span class="text">Заказы</span>
                </a>
                <a href="${url}/basket.html" class="header-menu__item header-menu__cart">
                  <span class="icon icon-menu _icon-cart"><span id="menu-basket" class="cart-quantity">3</span></span>
                  <span class="text">Корзина</span>
                </a>
              </div>
            </div>
  
            <div class="header-profil" data-da=".header-menu, 440, last">
              <div class="profile">
                <a href="${url}/profile.html" class="profile__item">
                  <div class="profile__wrapper-img">
                    <img src="" alt="Аватарка" class="profile__img">
                  </div>
                  <label class="profile__name _icon-arrow"></label>
                </a>
                <ul class="profile__menu opacity">
                  <li class="profile__li"><a href="${url}/profile.html" class="profile__link">Мой кабинет</a></li>
                  <li class="profile__li"><a href="${url}/profile.html#personal-data" class="profile__link">Профиль</a></li>
                  <li class="profile__li"><a href="${url}/profile.html#history-purchas" class="profile__link">Покупки</a></li>
                  <li class="profile__li"><button class="profile__link exit-account">Выйти</button></li>
                </ul>
              </div>
              <div class="profil-btn">
                <div class="login-enter">Войти</div>
                <span class="login-icon _icon-log-in"></span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="header-catalog">
          <div class="container">
            <div class="header-catalog__wrapper">
              <nav class="header-catalog__menu">
                
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main class="main">
        <div class="container">
          <div class="main-body">
            <nav class="main__navigation">
              <ul class="main__navigation-list">
                <a href="${url}/index.html" class="main__navigation-link">Главная</a>
                <span class="main__navigation-span _icon-arrow"></span>
                <a href="catalog.html" class="main__navigation-link">Каталог</a>
                <span class="main__navigation-span _icon-arrow"></span>
                <a href="catalog__milk-cheese-egg.html" class="main__navigation-link">${name}</a>
              </ul>
            </nav>
            <div class="main__content">
              <h1 class="main__title-catalog">${name}</h1>
              <div class="catalog-products">
                <div class="catalog-products__quick-filters">
                  <button class="catalog-products__quick-filters_btn catalog-products-btn">Товары нашего
                    производства</button>
                  <button class=" catalog-products__quick-filters_btn catalog-products-btn">Полезное питание</button>
                  <button class=" catalog-products__quick-filters_btn catalog-products-btn">Без ГМО</button>
                </div>
  
                <div class=" catalog-products__body">
                  <aside class="catalog-products__filters">
                    <div class="catalog-products__filters_body">
                      <div class="catalog-products__filters_wrapper-title">
                        <h3 class="catalog-products__filters_title">Фильтр</h3>
                        <div class="catalog-products__filters_close-filtres filtres-close"></div>
                      </div>
  
                      <div class="filters_box-paramets">
                        <div class="filters_box-paramets__header">
                          <span class="filters_box-paramets__price">Цена</span>
                          <button class="filters_box-paramets__btn catalog-products-btn">Очистить</button>
                        </div>
                        <div class="filters_box-paramets__body">
                          <input class="filters_box-paramets__input" type="number" id="min-price">
                          <span></span>
                          <input class="filters_box-paramets__input" type="number" id="max-price">
                        </div>
                        <div class="filters_box-paramets__sliders">
  
                        </div>
                      </div>
  
                      <div class="filters-products">
  
                      </div>
  
                      <div class="filters__wrapper-checkbox">
                        <label for="checkbox" class="filters__wrapper-checkbox__lable">
                          <input id="checkbox" class="filters__wrapper-checkbox__checkbox" type="checkbox" checked="">
                          <div class="filters__wrapper-checkbox__checkbox-item"></div>
                        </label>
                        <span class="filters__wrapper-checkbox__span">В наличие</span>
                      </div>
  
                      <button class="catalog-products__filters_button">Применить<!--и-->
  
                      </button>
                    </div>
                  </aside>
                  <div class="catalog-products__content">
                    <nav class="filter-menu">
                      <button class="filter-adaptive-active">Фильтр</button>
                      <select name="sorting" class="filter__select">
                        <option value="price-ASC">По цене 👇</option>
                        <option value="price-DESC">По цене 👆</option>
                        <option value="rating-DESC">По рейтингу</option>
                        <option value="rating-DESC" selected="">По популярности</option>
                      </select>
                      <!-- selected -->
                      <menu class="filter__menu" data-da=".catalog-products__filters_body, 768, 1">
                        <ul class="filter-menu__list">
                        </ul>
                        <button class="filter-menu__item filter-menu__item-clear none">
                          <span class="filter-menu__item-span">Очистить фильтры</span>
                          <span class="filter-menu__item-close"></span>
                        </button>
                      </menu>
                    </nav>
  
                    <div id="products-container" class="catalog-products__wrapper" data-typeid="${id}">
  
                    </div>
  
                    <div class="catalog-products__footer novisible">
                      <div class="more-wrapper">
                        <button class="products__more-btn disable">Показать ещё</button>
                      </div>
                      <div class="module-pagination">
                        <nav class="module-pagination__nav">
                          <div class="module-pagination__prev-block module-pagination__block">
                            <span class="module-pagination__duble-prev module-pagination__span _icon-duble-arrows disable"
                              data-page="first"></span>
                            <span class="module-pagination__prev module-pagination__span _icon-arrow disable"
                              data-page="prev"></span>
                          </div>
                          <ul class="module-pagination__list">
                            <li class="module-pagination__item _active" data-page="1">1</li>
                          </ul>
                          <div class="module-pagination__next-block module-pagination__block">
                            <span class="module-pagination__next module-pagination__span _icon-arrow disable"
                              data-page="next"></span>
                            <span class="module-pagination__duble-next module-pagination__span _icon-duble-arrows disable"
                              data-page="last"></span>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="footer">
        <div class="container">
          <div class="footer__content">
            <nav class="footer__menu">
              <a href="${url}/index.html" class="footer__logo-link"><img src="${url}/img/logo-footer.png" alt=""
                  class="footer__logo"></a>
              <ul class="footer__menu-list">
                <li class="footer__menu-item"><a href="${url}/about.html" class="footer__menu-link">О компании</a></li>
                <li class="footer__menu-item"><a href="${url}/contacts.html" class="footer__menu-link">Контакты</a></li>
                <li class="footer__menu-item"><a href="${url}/openings.html" class="footer__menu-link">Вакансии</a></li>
                <li class="footer__menu-item"><a href="${url}/articles.html" class="footer__menu-link">Статьи</a></li>
                <li class="footer__menu-item"><a href="${url}/discount.html" class="footer__menu-link">Акции</a></li>
              </ul>
            </nav>
            <nav class="footer__contact">
              <ul class="footer__contact-list">
                <li class="footer__contact-item"><a href="" class="footer__contact-link"><img
                      src="${url}/img/svg/instagram.svg" alt=""></a></li>
                <li class="footer__contact-item"><a href="" class="footer__contact-link"><img src="${url}/img/svg/vk.svg"
                      alt=""></a></li>
                <li class="footer__contact-item"><a href="" class="footer__contact-link"><img
                      src="${url}/img/svg/facebook.svg" alt=""></a></li>
                <li class="footer__contact-item"><a href="" class="footer__contact-link"><img
                      src="${url}/img/svg/odnaklasshiki.svg" alt=""></a></li>
              </ul>
              <a href="tel:+88007773333" class="footer__contact-tel _icon-phone">8 800 777 33 33</a>
            </nav>
          </div>
        </div>
      </footer>
      <div class="menu-fixed"></div>
      <div class="btn-up">↑</div>
    </div>
  
    <script src="${url}/assets/libs/inputMask/inputmask.min.js"></script>
    <script src="${url}/js/main.min.js"></script>
    <script src="${url}/js/catalog_product.min.js"></script>
  
  </body>
  
  </html>`
}