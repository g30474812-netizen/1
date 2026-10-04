(() => {
  const storageKey = "fast-food-kg-language";
  const translations = {
    ky: {
      "meta.title": "FIREBITE KG — Street Food",
      "meta.description": "FIREBITE KG — Кыргызстандын күчтүү street food жайы: бургерлер, кытырак тоок, фри, суусундуктар жана жаңы комбо.",
      "country.name": "Кыргызстан",
      "image.burger": "Ширелүү реалисттик бургер",
      "image.promoBurger": "Ширелүү бургер",
      "image.fries": "Кытырак картошка фри",
      "image.drink": "Сергитүүчү суусундук",
      "nav.label": "Башкы навигация",
      "nav.menuButton": "MENU",
      "nav.menuOpen": "Башкы менюну ачуу",
      "nav.menuClose": "Башкы менюну жабуу",
      "nav.home": "Башкы бет",
      "nav.menu": "Меню",
      "nav.offers": "Акциялар",
      "nav.about": "Биз жөнүндө",
      "nav.contact": "Байланыш",
      "header.order": "Буйрутма берүү",
      "cart.title": "Корзина",
      "cart.open": "Корзинаны ачуу",
      "cart.close": "Корзинаны жабуу",
      "cart.summary": "Жыйынтык",
      "cart.subtotal": "Аралык сумма",
      "cart.delivery": "Жеткирүү",
      "cart.free": "Акысыз",
      "cart.total": "Жалпы сумма",
      "cart.order": "Заказ берүү",
      "cart.clear": "Корзинаны тазалоо",
      "cart.empty": "Корзина бош",
      "cart.emptyDescription": "Менюдан өзүңүзгө жаккан тамактарды тандаңыз.",
      "cart.menu": "Менюну көрүү",
      "cart.itemOne": "товар",
      "cart.itemFew": "товар",
      "cart.itemMany": "товар",
      "cart.perItem": "бир даана",
      "cart.removeItem": "{name} корзинадан алып салуу",
      "cart.decreaseItem": "{name} санын азайтуу",
      "cart.increaseItem": "{name} санын көбөйтүү",
      "cart.quantity": "Саны: {count}",
      "cart.countLabel": "Корзинада: {count} {items}",
      "checkout.title": "Жеткирүү үчүн маалымат",
      "checkout.name": "Аты-жөнү",
      "checkout.namePlaceholder": "Аты-жөнүңүздү жазыңыз",
      "checkout.phone": "Телефон",
      "checkout.phonePlaceholder": "+996 ___ ___ ___",
      "checkout.address": "Дарек",
      "checkout.addressPlaceholder": "Көчө, үй, батир",
      "checkout.comment": "Комментарий",
      "checkout.commentPlaceholder": "Кошумча маалымат",
      "checkout.submit": "Заказды ырастоо",
      "checkout.nameRequired": "Аты-жөнүңүздү жазыңыз.",
      "checkout.phoneRequired": "Телефон номериңизди жазыңыз.",
      "checkout.addressRequired": "Жеткирүү дарегин киргизиңиз.",
      "checkout.invalid": "Жеткирүү маалыматын текшериңиз.",
      "checkout.noItems": "Алгач корзинага товар кошуңуз.",
      "checkout.accepted": "Заказ ийгиликтүү кабыл алынды.",
      "checkout.failed": "Заказды жөнөтүү мүмкүн болгон жок. Кайра аракет кылыңыз.",
      "checkout.connectionError": "Заказ серверине туташуу мүмкүн болгон жок. Кийинчерээк аракет кылыңыз.",
      "hero.badge": "Жаңы • Тез • Даамдуу",
      "hero.titleLine1": "Ширелүү ысык",
      "hero.titleLine2": "Даамдуу",
      "hero.titleAria": "Ширелүү ысык даамдуу",
      "hero.description": "Мыкты бышырылган бургерлер, кытырак фри, ширелүү сэндвичтер, өзгөчө соустар жана фирмалык суусундуктар — ачкачылыгыңызды бир заматта басат.",
      "hero.menuButton": "Менюну көрүү",
      "hero.offersButton": "Акциялар",
      "hero.happyCustomers": "ыраазы кардарлар",
      "hero.averageRating": "орточо рейтинг",
      "hero.delivery": "жеткирүү",
      "hero.visualAria": "Негизги тамак",
      "hero.burgerAria": "Айланган 3D бургер модели",
      "hero.comboLabel": "🔥 Эки сүйүктүү тамак",
      "hero.comboPrice": "Болгону 1599 сом",
      "hero.bestSeller": "⭐ Эң көп сатылган",
      "menu.eyebrow": "Популярдуу",
      "menu.title": "Сүйүктүү тамактар",
      "menu.all": "Бардык тамактар",
      "menu.goToCart": "Корзинага өтүү",
      "menu.foodCategory": "Тамактар",
      "menu.drinksCategory": "Суусундуктар",
      "search.label": "Тамактарды издөө",
      "search.placeholder": "Тамак же суусундук издөө...",
      "search.empty": "Эч нерсе табылган жок",
      "search.clear": "Издөөнү тазалоо",
      "product.add": "Корзинага кошуу",
      "rating.open": "Товарды баалоо",
      "rating.close": "Баалоо терезесин жабуу",
      "rating.eyebrow": "Пикирлер",
      "rating.prompt": "Товарды баалоо",
      "rating.starsLabel": "1ден 5ке чейинки баа",
      "rating.selection": "Сиздин бааңыз: {rating}/5",
      "rating.comment": "Комментарий",
      "rating.commentPlaceholder": "Пикириңиз…",
      "rating.login": "Баалоо үчүн аккаунтка кириңиз",
      "rating.submit": "Баалоону жөнөтүү",
      "rating.reviews": "Пикирлер",
      "rating.count": "баа",
      "rating.star": "{rating} жылдыз",
      "rating.noComment": "Комментарийсиз баа",
      "rating.ariaSummary": "Орточо баа: {average}, {count} баа. Товарды баалоо",
      "rating.loginRequired": "Баалоо үчүн аккаунтка кириңиз.",
      "rating.empty": "Бааны тандаңыз",
      "rating.tooLong": "Комментарий өтө узун",
      "rating.sent": "Баалоо жөнөтүлдү",
      "rating.alreadyRated": "Бул товарга мурда баа бергенсиз.",
      "rating.noReviews": "Азырынча пикир жок.",
      "rating.storageError": "Баалоону сактоо мүмкүн болгон жок.",
      "rating.apiError": "Баалоону жөнөтүү мүмкүн болгон жок. Кайра аракет кылыңыз.",
      "product.deluxe.tag": "Классика",
      "product.deluxe.name": "Делюкс бургер",
      "product.deluxe.description": "Даярдоо: грилде бышкан эки котлет, кош чеддер, пияз джеми жана жаңы салат жумшак булочкада.",
      "product.fire.tag": "Ачуу",
      "product.fire.name": "Ачуу тоок",
      "product.fire.description": "Даярдоо: кытырак тоок филеси, ачуу соус, жаңы бадыраң жана капуста жылуу булочкада.",
      "product.hearty.tag": "Тоюмдуу",
      "product.loaded.name": "Сыр соусу кошулган фри",
      "product.loaded.description": "Даярдоо: алтын түстө куурулган фри, ысык сыр соусу, кытырак пияз жана жаңы көк чөп.",
      "product.crispy.tag": "Кытырак",
      "product.fries.name": "Картошка фри",
      "product.fries.description": "Даярдоо: фри картошкасы кытырак болгонго чейин куурулуп, туз жана фирмалык соус менен берилет.",
      "product.tender.tag": "Жумшак",
      "product.nuggets.name": "Тоок наггетстери",
      "product.nuggets.description": "Даярдоо: ширелүү тоок бөлүктөрү алтын панировкада куурулуп, барбекю соусу менен берилет.",
      "product.hotdog.name": "Классикалык хот-дог",
      "product.hotdog.description": "Даярдоо: грилде кызартылган сосиска, жаңы жашылчалар жана ачуу фирмалык соус жумшак булочкада.",
      "product.bbqMelt.tag": "Фирмалык",
      "product.bbqMelt.name": "BBQ Melt бургер",
      "product.bbqMelt.description": "Даярдоо: ширелүү котлет, ышталган BBQ соусу, эриген чеддер жана кытырак пияз шакекчелери.",
      "product.wings.tag": "Кытырак",
      "product.wings.name": "Тоок канаттары",
      "product.wings.description": "Даярдоо: тоок канаттары алтын түскө чейин бышырылып, ачуу фирмалык соус менен аралаштырылат.",
      "product.shake.tag": "Десерт",
      "product.shake.name": "Карамель шейк",
      "product.shake.description": "Даярдоо: муздак сүт коктейли коюу болгонго чейин аралаштырылып, карамель менен толукталат.",
      "product.pizza.tag": "Жаңы",
      "product.pizza.name": "Пепперони пиццасы",
      "product.pizza.description": "Даярдоо: жука камырга томат соусу, эриген сыр жана пепперони салынып, меште кызартылат.",
      "product.wrap.tag": "Сыттуу",
      "product.wrap.name": "Кытырак тоок роллу",
      "product.wrap.description": "Даярдоо: кытырак тоок, жаңы жашылчалар жана каймактуу соус жылуу лавашка оролот.",
      "product.sandwich.tag": "Жаңы",
      "product.sandwich.name": "Тоок сэндвичи",
      "product.sandwich.description": "Даярдоо: кызартылган нанга тоок, эриген сыр, жаңы жашылчалар жана каймактуу соус кошулат.",
      "product.taco.tag": "Мексикалык",
      "product.taco.name": "Уй эти кошулган тако",
      "product.taco.description": "Даярдоо: татымал кошулган уй эти, жашылчалар жана жаңы сальса жумшак тортильяга салынат.",
      "product.onionRings.tag": "Жеңил тамак",
      "product.onionRings.name": "Пияз шакекчелери",
      "product.onionRings.description": "Даярдоо: пияз шакекчелери панировкага оролуп, алтын түскө чейин куурулуп, соус менен берилет.",
      "product.brownie.tag": "Десерт",
      "product.brownie.name": "Шоколад брауни",
      "product.brownie.description": "Даярдоо: какаосу күчтүү жумшак шоколад брауниси калың текстурасы менен жаңы берилет.",
      "product.mangoSmoothie.tag": "Смузи",
      "product.mangoSmoothie.name": "Манго смузи",
      "product.mangoSmoothie.description": "Даярдоо: бышкан манго, йогурт жана муз бир калыпта коюу болгонго чейин аралаштырылат.",
      "product.icedLatte.tag": "Муздак кофе",
      "product.icedLatte.name": "Айс латте",
      "product.icedLatte.description": "Даярдоо: кош эспрессо муздак сүт жана муз менен кошулуп, жумшак сергиткен латте даярдалат.",
      "product.quesadilla.tag": "Мексикалык",
      "product.quesadilla.name": "Тоок эти кошулган кесадилья",
      "product.quesadilla.description": "Даярдоо: тоок, сыр жана жашылчалар тортильяга салынып, сыр эригенче эки бетинен кызартылат.",
      "product.cheeseSticks.tag": "Жеңил тамак",
      "product.cheeseSticks.name": "Сыр таякчалары",
      "product.cheeseSticks.description": "Даярдоо: сыр таякчалары кытырак панировкада куурулуп, ысык маринара соусу менен берилет.",
      "product.strawberryLemonade.tag": "Лимонад",
      "product.strawberryLemonade.name": "Кулпунай лимонады",
      "product.strawberryLemonade.description": "Даярдоо: кулпунай, лимон жана муз кошулуп, жеңил жана сергиткен лимонад даярдалат.",
      "product.peachTea.tag": "Муздак чай",
      "product.peachTea.name": "Шабдалы кошулган муздак чай",
      "product.peachTea.description": "Даярдоо: муздатылган кара чайга бышкан шабдалы, лимон жана муз кошулат.",
      "product.fireBeef.tag": "Фирмалык",
      "product.fireBeef.name": "Fire Beef Burger",
      "product.fireBeef.description": "Даярдоо: грилде бышкан уй эти, кош чеддер, кытырак пияз жана ачуу соус күчтүү даамды бириктирет.",
      "product.chickenBox.tag": "Кытырак",
      "product.chickenBox.name": "Crispy Chicken Box",
      "product.chickenBox.description": "Даярдоо: кытырак тоок тилкелери, алтын түстүү фри, жаңы салат жана сарымсак соусу бир чоң порцияда.",
      "product.berryPower.tag": "Жаңы",
      "product.berryPower.name": "Berry Power",
      "product.berryPower.description": "Даярдоо: мөмөлөр, лимон жана муз аралаштырылып, күчтүү даамы бар муздак сергитүүчү суусундук даярдалат.",
      "features.eyebrow": "Биздин артыкчылыктар",
      "features.title": "Ырахат менен даярдайбыз",
      "features.fast.title": "Тез жеткирүү",
      "features.fast.description": "Жаңы даярдалган тамакты шаар боюнча бат жеткиребиз.",
      "features.fresh.title": "Жаңы азыктар",
        "features.fresh.description": "Сапаттуу азыктардан күн сайын жаңы тамак даярдайбыз.",
      "features.order.title": "Ыңгайлуу заказ",
      "features.order.description": "Оңой заказ, тез эсептөө жана эшигиңизге чейин жеткирүү.",
      "promo.eyebrow": "Аптанын акциясы",
      "promo.title": "Эң сүйүктүү эки тамак бир комбо!",
      "promo.description": "Делюкс бургер жана сыр соусу кошулган фри — болгону 1599 сом.",
      "promo.button": "Акцияны алуу",
      "promo.combo": "Делюкс бургер + сыр соусу кошулган фри",
      "promo.price": "1599 сом",
      "promo.platterAria": "Делюкс бургер жана сыр соусу кошулган фри",
      "special.eyebrow": "Атайын сунуш",
      "special.burger.name": "BBQ Melt бургер",
      "special.burger.description": "Ышталган соус, чеддер, пияз шакекчелери жана ачуу кошулма.",
      "special.shake.category": "Десерт",
      "special.shake.name": "Карамель шейк",
      "special.wings.category": "Кытырак",
      "special.wings.name": "Тоок канаттары",
      "footer.tagline": "Жаркын көз ирмемдер үчүн тез тамак.",
      "footer.socialTitle": "Социалдык тармактарда биз",
      "footer.phoneLabel": "Телефон",
      "footer.emailLabel": "Электрондук почта",
      "footer.instagram": "Instagram баракчасы maratbekkow",
      "footer.instagramName": "Instagram",
      "footer.tiktok": "TikTok",
      "footer.tiktokName": "TikTok",
      "footer.tiktokDescription": "Жаңылыктарды көрүңүз",
      "toast.region": "Билдирмелер",
      "auth.login": "Кирүү",
      "auth.welcome": "Кайра келиңиз",
      "auth.description": "Заказ берүү үчүн аккаунтуңузга кириңиз.",
      "auth.email": "Электрондук почта",
      "auth.emailPlaceholder": "name@example.com",
      "auth.password": "Сырсөз",
      "auth.passwordPlaceholder": "Сырсөздү киргизиңиз",
      "auth.forgot": "Сырсөздү унуттуңузбу?",
      "auth.showPassword": "Сырсөздү көрсөтүү",
      "auth.hidePassword": "Сырсөздү жашыруу",
      "auth.loading": "Кирүүдө…",
      "auth.successTitle": "Сиз кирдиңиз",
      "auth.successDescription": "Кош келиңиз!",
      "auth.successPrefix": "Аккаунтка кирдиңиз:",
      "auth.continue": "Улантуу",
      "auth.logout": "Чыгуу",
      "auth.logoutToast": "Аккаунттан ийгиликтүү чыктыңыз.",
      "auth.logoutError": "Аккаунттан чыктыңыз, бирок сервер сессияны ырастай алган жок.",
      "auth.close": "Кирүү терезесин жабуу",
      "auth.signedIn": "Аккаунт: {name}",
      "auth.emailRequired": "Электрондук почтаңызды киргизиңиз.",
      "auth.emailInvalid": "Электрондук почтанын форматын текшериңиз.",
      "auth.passwordRequired": "Сырсөздү киргизиңиз.",
      "auth.validation": "Белгиленген талааларды текшериңиз.",
      "auth.invalidCredentials": "Электрондук почта же сырсөз туура эмес.",
      "auth.requestFailed": "Кирүү мүмкүн болгон жок. Кийинчерээк аракет кылыңыз.",
      "auth.connectionError": "Серверге туташуу мүмкүн болгон жок. Кийинчерээк аракет кылыңыз.",
      "auth.timeout": "Сервер жооп берген жок. Кайра аракет кылыңыз.",
      "auth.unknownError": "Ката кетти. Кайра аракет кылыңыз.",
      "auth.successToast": "Ийгиликтүү кирдиңиз",
      "auth.forgotInfo": "Сырсөздү калыбына келтирүү функциясы кийинчерээк кошулат.",
      "toast.cartAdded": "{name} корзинага кошулду",
      "toast.cartRemoved": "{name} корзинадан алынды",
      "toast.cartCleared": "Корзина тазаланды",
      "toast.close": "Билдирүүнү жабуу",
      "toast.checkoutInvalid": "Жеткирүү үчүн милдеттүү талааларды толтуруңуз",
      "toast.checkoutNoItems": "Алгач корзинага товар кошуңуз",
      "toast.orderAccepted": "Заказыңыз кабыл алынды",
      "toast.orderFailed": "Заказды тариздөө мүмкүн болгон жок.",
      "toast.orderConnection": "Заказ серверине туташуу мүмкүн эмес. Кийинчерээк аракет кылыңыз.",
      "toast.languageChanged": "Тил кыргызчага өзгөртүлдү",
    },
    ru: {
      "meta.title": "FIREBITE KG — Street Food",
      "meta.description": "FIREBITE KG — мощный street food в Кыргызстане: бургеры, хрустящая курица, фри, напитки и свежие комбо.",
      "country.name": "Кыргызстан",
      "image.burger": "Сочный реалистичный бургер",
      "image.promoBurger": "Сочный бургер",
      "image.fries": "Хрустящий картофель фри",
      "image.drink": "Освежающий напиток",
      "nav.label": "Главная навигация",
      "nav.menuButton": "МЕНЮ",
      "nav.menuOpen": "Открыть главное меню",
      "nav.menuClose": "Закрыть главное меню",
      "nav.home": "Главная",
      "nav.menu": "Меню",
      "nav.offers": "Акции",
      "nav.about": "О нас",
      "nav.contact": "Контакты",
      "header.order": "Оформить заказ",
      "cart.title": "Корзина",
      "cart.open": "Открыть корзину",
      "cart.close": "Закрыть корзину",
      "cart.summary": "Итого",
      "cart.subtotal": "Промежуточная сумма",
      "cart.delivery": "Доставка",
      "cart.free": "Бесплатно",
      "cart.total": "Итого",
      "cart.order": "Заказать",
      "cart.clear": "Очистить корзину",
      "cart.empty": "Корзина пуста",
      "cart.emptyDescription": "Выберите любимые блюда из меню.",
      "cart.menu": "Перейти в меню",
      "cart.itemOne": "товар",
      "cart.itemFew": "товара",
      "cart.itemMany": "товаров",
      "cart.perItem": "за шт.",
      "cart.removeItem": "Удалить {name}",
      "cart.decreaseItem": "Уменьшить количество: {name}",
      "cart.increaseItem": "Увеличить количество: {name}",
      "cart.quantity": "Количество: {count}",
      "cart.countLabel": "В корзине {count} {items}",
      "checkout.title": "Данные для доставки",
      "checkout.name": "Имя",
      "checkout.namePlaceholder": "Введите имя",
      "checkout.phone": "Телефон",
      "checkout.phonePlaceholder": "+996 ___ ___ ___",
      "checkout.address": "Адрес",
      "checkout.addressPlaceholder": "Улица, дом, квартира",
      "checkout.comment": "Комментарий",
      "checkout.commentPlaceholder": "Дополнительная информация",
      "checkout.submit": "Подтвердить заказ",
      "checkout.nameRequired": "Введите имя.",
      "checkout.phoneRequired": "Введите номер телефона.",
      "checkout.addressRequired": "Введите адрес доставки.",
      "checkout.invalid": "Проверьте данные для доставки.",
      "checkout.noItems": "Сначала добавьте товары в корзину.",
      "checkout.accepted": "Заказ успешно принят.",
      "checkout.failed": "Не удалось отправить заказ. Попробуйте ещё раз.",
      "checkout.connectionError": "Не удалось связаться с сервером заказов. Попробуйте позже.",
      "hero.badge": "Свежо • Быстро • Вкусно",
      "hero.titleLine1": "Сочно горячо",
      "hero.titleLine2": "вкусно",
      "hero.titleAria": "Сочно горячо вкусно",
      "hero.description": "Бургеры с идеальной прожаркой, хрустящий фритюр, сочные сэндвичи, вкусные соусы и фирменные напитки — всё готово, чтобы твой голод исчез за минуту.",
      "hero.menuButton": "Смотреть меню",
      "hero.offersButton": "Акции",
      "hero.happyCustomers": "довольных клиентов",
      "hero.averageRating": "средний рейтинг",
      "hero.delivery": "доставка",
      "hero.visualAria": "Главное блюдо",
      "hero.burgerAria": "Вращающаяся 3D-модель бургера",
      "hero.comboLabel": "🔥 Два любимых блюда",
      "hero.comboPrice": "Всего 1599 сом",
      "hero.bestSeller": "⭐ Лидер продаж",
      "menu.eyebrow": "Популярное",
      "menu.title": "Любимые блюда",
      "menu.all": "Все блюда",
      "menu.goToCart": "Перейти в корзину",
      "menu.foodCategory": "Блюда",
      "menu.drinksCategory": "Напитки",
      "search.label": "Поиск по меню",
      "search.placeholder": "Найти блюдо или напиток...",
      "search.empty": "Ничего не найдено",
      "search.clear": "Очистить поиск",
      "product.add": "Добавить в корзину",
      "rating.open": "Оценить товар",
      "rating.close": "Закрыть окно оценки",
      "rating.eyebrow": "Отзывы",
      "rating.prompt": "Оценить товар",
      "rating.starsLabel": "Оценка от 1 до 5",
      "rating.selection": "Ваша оценка: {rating}/5",
      "rating.comment": "Комментарий",
      "rating.commentPlaceholder": "Ваш комментарий…",
      "rating.login": "Войти, чтобы оценить",
      "rating.submit": "Отправить оценку",
      "rating.reviews": "Отзывы",
      "rating.count": "оценок",
      "rating.star": "{rating} из 5",
      "rating.noComment": "Без комментария",
      "rating.ariaSummary": "Средняя оценка: {average}, оценок: {count}. Оценить товар",
      "rating.loginRequired": "Войдите в аккаунт, чтобы оценить товар.",
      "rating.empty": "Выберите оценку",
      "rating.tooLong": "Комментарий слишком длинный",
      "rating.sent": "Оценка отправлена",
      "rating.alreadyRated": "Вы уже оценили этот товар.",
      "rating.noReviews": "Пока нет отзывов.",
      "rating.storageError": "Не удалось сохранить оценку.",
      "rating.apiError": "Не удалось отправить оценку. Попробуйте ещё раз.",
      "product.deluxe.tag": "Классика",
      "product.deluxe.name": "Бургер Deluxe",
      "product.deluxe.description": "Рецепт: две говяжьи котлеты на гриле, двойной чеддер, луковый джем и свежий салат в мягкой булочке.",
      "product.fire.tag": "Острое",
      "product.fire.name": "Острая курица",
      "product.fire.description": "Рецепт: хрустящее куриное филе, острый соус, свежий огурец и капуста в тёплой булочке.",
      "product.hearty.tag": "Сытное",
      "product.loaded.name": "Loaded Fries",
      "product.loaded.description": "Рецепт: золотистый картофель фри, горячий сырный соус, хрустящий лук и свежая зелень.",
      "product.crispy.tag": "Хрустящее",
      "product.fries.name": "Картофель фри",
      "product.fries.description": "Рецепт: картофель фри обжариваем до хрустящей корочки, солим и подаём с фирменным соусом.",
      "product.tender.tag": "Нежное",
      "product.nuggets.name": "Куриные наггетсы",
      "product.nuggets.description": "Рецепт: сочные кусочки курицы в золотистой панировке, обжаренные и поданные с соусом барбекю.",
      "product.hotdog.name": "Хот-дог Classic",
      "product.hotdog.description": "Рецепт: сосиска на гриле, свежие овощи и пикантный фирменный соус в мягкой булочке.",
      "product.bbqMelt.tag": "Фирменный",
      "product.bbqMelt.name": "BBQ Melt Burger",
      "product.bbqMelt.description": "Рецепт: сочная котлета, копчёный BBQ-соус, расплавленный чеддер и хрустящие луковые кольца.",
      "product.wings.tag": "Хрустящее",
      "product.wings.name": "Куриные крылышки",
      "product.wings.description": "Рецепт: куриные крылышки запекаем до золотистой корочки и покрываем пикантным фирменным соусом.",
      "product.shake.tag": "Десерт",
      "product.shake.name": "Карамельный шейк",
      "product.shake.description": "Рецепт: холодный молочный коктейль взбиваем до густоты и дополняем мягким карамельным вкусом.",
      "product.pizza.tag": "Новинка",
      "product.pizza.name": "Пицца Пепперони",
      "product.pizza.description": "Рецепт: тонкое тесто, томатный соус, расплавленный сыр и пикантная пепперони — всё запекаем до румяной корочки.",
      "product.wrap.tag": "Сытное",
      "product.wrap.name": "Куриный ролл",
      "product.wrap.description": "Рецепт: хрустящую курицу, свежие овощи и сливочный соус заворачиваем в тёплую лепёшку.",
      "product.sandwich.tag": "Новинка",
      "product.sandwich.name": "Куриный сэндвич",
      "product.sandwich.description": "Рецепт: поджаренный хлеб, курица, расплавленный сыр, свежие овощи и сливочный соус.",
      "product.taco.tag": "Мексиканское",
      "product.taco.name": "Тако с говядиной",
      "product.taco.description": "Рецепт: пряную говядину, свежие овощи и сальсу собираем в мягкой тортилье.",
      "product.onionRings.tag": "Закуска",
      "product.onionRings.name": "Луковые кольца",
      "product.onionRings.description": "Рецепт: луковые кольца покрываем хрустящей панировкой, обжариваем до золота и подаём с соусом.",
      "product.brownie.tag": "Десерт",
      "product.brownie.name": "Шоколадный брауни",
      "product.brownie.description": "Рецепт: мягкий шоколадный брауни с насыщенным какао-вкусом и плотной, нежной текстурой.",
      "product.mangoSmoothie.tag": "Смузи",
      "product.mangoSmoothie.name": "Манго смузи",
      "product.mangoSmoothie.description": "Рецепт: спелое манго, йогурт и лёд взбиваем до густой однородной текстуры.",
      "product.icedLatte.tag": "Холодный кофе",
      "product.icedLatte.name": "Айс латте",
      "product.icedLatte.description": "Рецепт: двойной эспрессо смешиваем с холодным молоком и льдом — мягко, бодро и без лишней сладости.",
      "product.quesadilla.tag": "Мексиканское",
      "product.quesadilla.name": "Кесадилья с курицей",
      "product.quesadilla.description": "Рецепт: курица, сыр и овощи внутри тортильи; обжариваем с двух сторон до золотистой корочки.",
      "product.cheeseSticks.tag": "Закуска",
      "product.cheeseSticks.name": "Сырные палочки",
      "product.cheeseSticks.description": "Рецепт: сырные палочки в золотистой панировке, обжаренные до хруста и поданные с горячей маринарой.",
      "product.strawberryLemonade.tag": "Лимонад",
      "product.strawberryLemonade.name": "Клубничный лимонад",
      "product.strawberryLemonade.description": "Рецепт: клубника, лимон и лёд соединяются в лёгком, ярком и освежающем лимонаде.",
      "product.peachTea.tag": "Холодный чай",
      "product.peachTea.name": "Персиковый холодный чай",
      "product.peachTea.description": "Рецепт: охлаждённый чёрный чай, спелый персик, лимон и лёд — чистый свежий вкус.",
      "product.fireBeef.tag": "Фирменный",
      "product.fireBeef.name": "Fire Beef Burger",
      "product.fireBeef.description": "Рецепт: говядина на гриле, двойной чеддер, хрустящий лук и острый соус — мощный вкус в каждой детали.",
      "product.chickenBox.tag": "Хрустящий",
      "product.chickenBox.name": "Crispy Chicken Box",
      "product.chickenBox.description": "Рецепт: хрустящие куриные полоски, золотистый фри, свежий салат и чесночный соус — большая порция без компромиссов.",
      "product.berryPower.tag": "Новинка",
      "product.berryPower.name": "Berry Power",
      "product.berryPower.description": "Рецепт: сочные ягоды, лимон и лёд взбиваем в яркий освежающий напиток с насыщенным вкусом.",
      "features.eyebrow": "Почему мы",
      "features.title": "Готовим с удовольствием",
      "features.fast.title": "Быстрая доставка",
      "features.fast.description": "Свежая еда и быстрая доставка по городу в кратчайшие сроки.",
      "features.fresh.title": "Свежие продукты",
      "features.fresh.description": "Качественные ингредиенты и ежедневная подготовка блюд.",
      "features.order.title": "Удобный заказ",
      "features.order.description": "Простой заказ, быстрый расчёт и доставка до двери.",
      "promo.eyebrow": "Акция недели",
      "promo.title": "Два любимых блюда в одном комбо!",
      "promo.description": "Бургер Deluxe и Loaded Fries — всего 1599 сом.",
      "promo.button": "Получить акцию",
      "promo.combo": "Бургер Deluxe + Loaded Fries",
      "promo.price": "1599 сом",
      "promo.platterAria": "Бургер Deluxe и Loaded Fries",
      "special.eyebrow": "Спецпредложение",
      "special.burger.name": "BBQ Melt Burger",
      "special.burger.description": "Копчёный соус, чеддер, луковые кольца и пикантная начинка.",
      "special.shake.category": "Десерт",
      "special.shake.name": "Карамельный шейк",
      "special.wings.category": "Хрустящее",
      "special.wings.name": "Крылышки",
      "footer.tagline": "Быстрая еда для ярких впечатлений.",
      "footer.socialTitle": "Мы в социальных сетях",
      "footer.phoneLabel": "Телефон",
      "footer.emailLabel": "Электронная почта",
      "footer.instagram": "Instagram maratbekkow",
      "footer.instagramName": "Instagram",
      "footer.tiktok": "TikTok",
      "footer.tiktokName": "TikTok",
      "footer.tiktokDescription": "Смотрите новинки",
      "toast.region": "Уведомления",
      "auth.login": "Войти",
      "auth.welcome": "С возвращением",
      "auth.description": "Войдите, чтобы продолжить и оформить заказ.",
      "auth.email": "Электронная почта",
      "auth.emailPlaceholder": "name@example.com",
      "auth.password": "Пароль",
      "auth.passwordPlaceholder": "Введите пароль",
      "auth.forgot": "Забыли пароль?",
      "auth.showPassword": "Показать пароль",
      "auth.hidePassword": "Скрыть пароль",
      "auth.loading": "Входим…",
      "auth.successTitle": "Вы вошли",
      "auth.successDescription": "Добро пожаловать обратно.",
      "auth.successPrefix": "Вы вошли как",
      "auth.continue": "Продолжить",
      "auth.logout": "Выйти",
      "auth.logoutToast": "Вы успешно вышли из аккаунта.",
      "auth.logoutError": "Вы вышли из аккаунта, но сервер не подтвердил завершение сессии.",
      "auth.close": "Закрыть окно входа",
      "auth.signedIn": "Вы вошли как {name}",
      "auth.emailRequired": "Введите электронную почту.",
      "auth.emailInvalid": "Проверьте формат электронной почты.",
      "auth.passwordRequired": "Введите пароль.",
      "auth.validation": "Проверьте отмеченные поля.",
      "auth.invalidCredentials": "Неверная почта или пароль.",
      "auth.requestFailed": "Не удалось выполнить вход. Попробуйте позже.",
      "auth.connectionError": "Не удалось связаться с сервером. Попробуйте позже.",
      "auth.timeout": "Сервер не ответил вовремя. Попробуйте ещё раз.",
      "auth.unknownError": "Произошла ошибка. Попробуйте ещё раз.",
      "auth.successToast": "Вы успешно вошли",
      "auth.forgotInfo": "Восстановление пароля появится после подключения соответствующего API.",
      "toast.cartAdded": "{name} добавлен в корзину",
      "toast.cartRemoved": "{name} удалён из корзины",
      "toast.cartCleared": "Корзина очищена",
      "toast.close": "Закрыть уведомление",
      "toast.checkoutInvalid": "Заполните обязательные поля для доставки",
      "toast.checkoutNoItems": "Сначала добавьте товары в корзину",
      "toast.orderAccepted": "Заказ успешно принят",
      "toast.orderFailed": "Не удалось оформить заказ.",
      "toast.orderConnection": "Не удалось связаться с сервером заказов. Попробуйте позже.",
      "toast.languageChanged": "Язык изменён на русский",
    },
  };

  const supportedLanguages = new Set(["ky", "ru"]);
  const switcher = document.querySelector("#language-switcher");
  const trigger = document.querySelector("#language-trigger");
  const menu = document.querySelector("#language-menu");

  if (!switcher || !trigger || !menu) return;

  menu.querySelectorAll("[data-language-option]").forEach((option) => {
    if (!supportedLanguages.has(option.dataset.languageOption)) option.remove();
  });

  const options = [...menu.querySelectorAll("[data-language-option]")];
  const flag = trigger.querySelector("[data-language-flag]");
  const name = trigger.querySelector("[data-language-name]");
  let closeTimer = 0;

  function getSavedLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (supportedLanguages.has(saved)) return saved;
    } catch {}

    const browserLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language ?? ""];

    for (const browserLanguage of browserLanguages) {
      const normalized = browserLanguage.toLowerCase();
      if (normalized.startsWith("ru")) return "ru";
      if (normalized.startsWith("ky") || normalized.startsWith("kg")) return "ky";
    }

    return "ky";
  }

  let language = getSavedLanguage();

  function t(key, variables = {}) {
    const template = translations[language]?.[key] ?? translations.ky[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (match, variable) => String(variables[variable] ?? match));
  }

  function applyTranslations() {
    document.documentElement.lang = language;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAria));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      element.setAttribute("alt", t(element.dataset.i18nAlt));
    });

    document.querySelectorAll("[data-suffix-ky], [data-suffix-ru]").forEach((element) => {
      const suffix = language === "ru"
        ? element.dataset.suffixRu ?? ""
        : element.dataset.suffixKy ?? "";

      element.dataset.suffix = suffix;
      const value = Number(element.dataset.count);

      if (Number.isFinite(value)) {
        const decimals = Number(element.dataset.decimals ?? (String(value).split(".")[1]?.length ?? 0));
        element.textContent = `${value.toFixed(decimals)}${suffix}`;
      }
    });

    document.querySelectorAll(".product-meta strong").forEach((element) => {
      const price = Number(element.textContent.replace(/\D/g, ""));
      if (!Number.isSafeInteger(price)) return;
      element.textContent = `${new Intl.NumberFormat("ru-RU").format(price)} сом`;
    });

    const languagePresentation = {
      ky: {
        flag: '<svg class="language-flag-svg" viewBox="0 0 20 14" aria-hidden="true" focusable="false"><rect width="20" height="14" rx="2" fill="#d52b1e"/><g fill="#ffd34e"><circle cx="10" cy="7" r="3.9"/><path d="M10 1.35 10.5 3.8 10 4.35 9.5 3.8ZM10 9.65l.5.55-.5 2.45-.5-2.45ZM4.35 7l2.45-.5.55.5-.55.5ZM13.2 7l.55-.5 2.45.5-2.45.5Z"/></g><g fill="none" stroke="#d52b1e" stroke-width=".6" stroke-linecap="round"><circle cx="10" cy="7" r="1.45"/><path d="M8.55 5.55 10 7l1.45-1.45M8.55 8.45 10 7l1.45 1.45M10 5.55v2.9M8.55 7h2.9"/></g></svg>',
        name: "Кыргызча",
        selectLabel: "Тилди тандоо",
      },
      ru: {
        flag: '<svg class="language-flag-svg" viewBox="0 0 20 14" aria-hidden="true" focusable="false"><rect width="20" height="14" rx="2" fill="#fff"/><path d="M0 4.67h20v4.66H0Z" fill="#2455a4"/><path d="M0 9.33h20V14H0Z" fill="#d52b1e"/></svg>',
        name: "Русский",
        selectLabel: "Выбрать язык",
      },
    }[language] ?? {
      flag: '<svg class="language-flag-svg" viewBox="0 0 20 14" aria-hidden="true" focusable="false"><rect width="20" height="14" rx="2" fill="#d52b1e"/><circle cx="10" cy="7" r="3.9" fill="#ffd34e"/></svg>',
      name: "Кыргызча",
      selectLabel: "Тилди тандоо",
    };

    if (flag) flag.innerHTML = languagePresentation.flag;
    if (name) name.textContent = languagePresentation.name;

    options.forEach((option) => {
      const selected = option.dataset.languageOption === language;
      option.setAttribute("aria-selected", String(selected));
      option.classList.toggle("is-selected", selected);
    });

    trigger.setAttribute("aria-label", languagePresentation.selectLabel);
    menu.setAttribute("aria-label", languagePresentation.selectLabel);
  }

  function closeMenu(restoreFocus = false) {
    if (menu.hidden) {
      if (restoreFocus) trigger.focus();
      return;
    }

    menu.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      menu.hidden = true;
    }, 240);

    if (restoreFocus) trigger.focus();
  }

  function openMenu(focusSelected = false) {
    window.clearTimeout(closeTimer);
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    void menu.offsetWidth;
    menu.classList.add("is-open");

    if (focusSelected) {
      const selected = options.find((option) => option.dataset.languageOption === language);
      selected?.focus();
    }
  }

  function setLanguage(nextLanguage) {
    if (!supportedLanguages.has(nextLanguage)) {
      closeMenu(true);
      return;
    }

    language = nextLanguage;

    try {
      localStorage.setItem(storageKey, language);
    } catch {}

    applyTranslations();
    document.dispatchEvent(new CustomEvent("app:languagechange", { detail: { language } }));
    closeMenu(true);
  }

  trigger.addEventListener("click", () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  menu.addEventListener("click", (event) => {
    const option = event.target.closest("[data-language-option]");
    if (!option || !menu.contains(option)) return;
    event.preventDefault();
    setLanguage(option.dataset.languageOption);
  });

  options.forEach((option) => {
    option.addEventListener("keydown", (event) => {
      const index = options.indexOf(option);

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        options[(index + direction + options.length) % options.length].focus();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        options[event.key === "Home" ? 0 : options.length - 1].focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    });
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(true);
    } else if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      closeMenu(true);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!menu.hidden && !switcher.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === "Tab" && !menu.hidden && !switcher.contains(event.target)) {
      closeMenu();
    }
  });

  window.t = t;
  window.getLanguage = () => language;
  window.setLanguage = setLanguage;
  applyTranslations();
})();
