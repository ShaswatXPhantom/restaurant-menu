# Radhe Radhe Restaurant

Full end-to-end pure vegetarian restaurant website — menu, orders, reviews, reservations, and **admin-editable location & info**.

**Repo:** https://github.com/ShaswatXPhantom/restaurant-menu

## Features

| Feature | Description |
|---------|-------------|
| **Menu** | Browse, search, filter by category, sort by price |
| **Orders** | Login → Order dish with portion, qty, phone |
| **Reviews** | Star ratings + comments on any dish; public reviews page |
| **Favourites** | Save dishes (login required) |
| **Reservations** | Contact form for table booking |
| **Location** | Dynamic address, map embed, hours, phone, WhatsApp on Home + Contact |
| **Admin panel** | Upload/edit/delete menu items, manage orders & reviews |
| **Admin Location & Info** | Edit restaurant name, address, map, hours, contact, promo — live on site |
| **Theme** | Maroon + gold royal Indian look |

## Admin login

1. Go to **Login**
2. Email: `admin@radheradhe.com`
3. Password: `radhe123`
4. **Admin** → **Location & Info** to set address / map / hours  
5. **Upload Item** to add dishes

## How to set location (admin)

1. Login as admin → **📍 Location & Info**
2. Fill address, city, phone, hours
3. **Google Maps link**: open Maps → Share → Copy link → paste in “Google Maps link”
4. **Map embed**: use a URL like  
   `https://maps.google.com/maps?q=Your+Restaurant+Name+City&output=embed`  
   or Embed map → copy the `src` from the iframe
5. Click **Save Location & Info** — Home, Contact, and Footer update immediately

## How to view

1. Enable **GitHub Pages**: Settings → Pages → branch `main` → root → Save
2. Live site: `https://shaswatxphantom.github.io/restaurant-menu/`

Or open `index.html` in a browser (data stored in `localStorage`).

## Pages

- `index.html` — Home, specials, reviews, **location block**
- `products.html` — Full menu
- `reviews.html` — Read & write reviews
- `wishlist.html` — Favourites
- `contact.html` — Location + reserve table
- `login.html` / `register.html`
- `admin.html` — Dashboard, menu, orders, reviews, **Location & Info**

## Tech

Pure HTML + CSS + Vanilla JS · Data in `localStorage` (no backend)

---
Radhe Radhe 🙏
