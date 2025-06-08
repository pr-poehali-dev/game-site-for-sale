
# 🚀 Руководство по развертыванию GameStore

## 📋 Системные требования

### Минимальные:
- Node.js 18.0+
- npm 8.0+ или yarn 1.22+
- 1 GB RAM
- 500 MB свободного места

### Рекомендуемые:
- Node.js 20.0+
- npm 10.0+
- 2 GB RAM
- 1 GB свободного места

## ⚡ Быстрый старт

### 1. Установка зависимостей
```bash
# Клонирование проекта
git clone [your-repo-url]
cd gamestore

# Установка пакетов
npm install
```

### 2. Запуск разработки
```bash
# Запуск dev сервера
npm run dev

# Проект будет доступен на http://localhost:5173
```

### 3. Сборка для production
```bash
# Создание production build
npm run build

# Превью production версии
npm run preview
```

## 🌐 Развертывание в облаке

### Vercel (Рекомендуется)
1. Создайте аккаунт на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Vercel автоматически развернет проект
4. Домен будет вида: `your-project.vercel.app`

### Netlify
1. Зарегистрируйтесь на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий
3. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages
```bash
# Установка gh-pages
npm install --save-dev gh-pages

# Добавьте в package.json scripts:
"homepage": "https://yourusername.github.io/gamestore",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Развертывание
npm run deploy
```

## ⚙️ Настройка и кастомизация

### 1. Изменение брендинга
Отредактируйте файл `src/components/Header.tsx`:
```typescript
// Строка 26-28
<h1 className="text-2xl font-bold text-white font-montserrat">
  ВАШ_БРЕНД  {/* Замените GameStore */}
</h1>
```

### 2. Настройка каталога игр
Файл `src/components/GameCatalog.tsx`, массив `MOCK_GAMES`:
```typescript
// Добавьте ваши игры
const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: "Ваша игра",
    price: 1999,
    image: "ссылка_на_изображение",
    genre: "Жанр",
    rating: 4.5,
  },
  // ... остальные игры
];
```

### 3. Цветовая схема
Измените цвета в `tailwind.config.ts`:
```typescript
colors: {
  primary: "#your-color",      // Основной цвет
  secondary: "#your-color",    // Вторичный цвет
  accent: "#your-color",       // Акцентный цвет
}
```

### 4. Подключение к базе данных
Для интеграции с backend API:
1. Установите axios: `npm install axios`
2. Создайте API клиент в `src/lib/api.ts`
3. Замените MOCK_GAMES на реальные запросы

## 🔧 Интеграция платежей

### Stripe
```bash
npm install @stripe/stripe-js
```

```typescript
// Создайте src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('your-publishable-key');
```

### PayPal
```bash
npm install @paypal/react-paypal-js
```

### Другие платежные системы
- **Robokassa** (для России)
- **Yandex.Checkout**
- **Sberbank**

## 📱 Адаптация под мобильные

Проект уже адаптивен, но для улучшения:

### PWA (Progressive Web App)
```bash
npm install vite-plugin-pwa
```

Добавьте в `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    // ... другие плагины
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

## 🔍 SEO оптимизация

### 1. Мета-теги
Добавьте в `index.html`:
```html
<meta name="description" content="Ваше описание магазина игр">
<meta name="keywords" content="игры, покупка игр, геймер">
<meta property="og:title" content="GameStore - Магазин игр">
<meta property="og:description" content="Лучшие игры по доступным ценам">
```

### 2. React Helmet
```bash
npm install react-helmet-async
```

### 3. Карта сайта
Создайте `public/sitemap.xml` с основными страницами

## 📊 Аналитика

### Google Analytics
```bash
npm install gtag
```

### Yandex Metrika
Добавьте код счетчика в `index.html`

## 🔒 Безопасность

### 1. Переменные окружения
Создайте `.env`:
```
VITE_API_URL=https://your-api.com
VITE_STRIPE_KEY=your-stripe-key
```

### 2. Валидация форм
Используйте Zod для валидации:
```typescript
import { z } from 'zod';

const gameSchema = z.object({
  title: z.string().min(1),
  price: z.number().positive(),
});
```

## 🐛 Отладка и мониторинг

### Логирование ошибок
```bash
npm install @sentry/react
```

### Производительность
```bash
npm install web-vitals
```

## 📞 Техническая поддержка

При возникновении проблем:

1. **Проверьте консоль браузера** на наличие ошибок
2. **Убедитесь в актуальности Node.js** версии
3. **Очистите кэш**: `npm clean-install`
4. **Проверьте переменные окружения**

### Частые проблемы:

**Не запускается dev сервер:**
```bash
# Очистка и переустановка
rm -rf node_modules package-lock.json
npm install
```

**Ошибки сборки:**
```bash
# Проверка TypeScript
npm run type-check
```

**Проблемы с изображениями:**
- Убедитесь, что пути к изображениям корректны
- Для production используйте CDN

---

**🎯 Поздравляем! Ваш GameStore готов к работе!**

Не забудьте настроить домен и SSL-сертификат для production использования.
