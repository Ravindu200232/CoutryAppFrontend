>##IT22098450



> ✅ **Note:** This project is submitted for **SLIIT GitClass**, which restricts Vercel imports.  
> Therefore, I have created  **separate GitHub repositories**: It include commits
>
> - 🔗 **(Vercel) Frontend GitHub Repository**: [https://github.com/Ravindu200232/CoutryAppFrontend.git](https://github.com/Ravindu200232/CoutryAppFrontend.git)
> - 🔗 **Backend GitHub Repository**: [https://github.com/Ravindu200232/CountryBackend.git](https://github.com/Ravindu200232/CountryBackend.git)
>
> - 🔗 **Live Frontend (Vercel)**: [https://coutry-app-frontend.vercel.app/](https://coutry-app-frontend.vercel.app/)
> - 🔗 **Live Backend (Render)**: [https://countrybackend.onrender.com](https://countrybackend.onrender.com)


## 📁 Git Repository Structure
```
CountryApp/
├── countryFrontend/       # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
├── countryBackend/        # Node.js + Express + JWT Auth + Supabase
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── README.md
```


## 🚀 Live Demo Links

- 🔗 **Frontend (Vercel)**: [https://coutry-app-frontend.vercel.app/](https://coutry-app-frontend.vercel.app/)
- 🔗 **Backend (Render)**: [https://countrybackend.onrender.com](https://countrybackend.onrender.com)



## 🌟 Features

### 🌐 Country Features (Frontend)

- 🔎 Search countries by name.
- 🌍 Filter countries by **region**.
- 🗣️ Filter countries by **language**.
- 📄 View detailed country info on a separate page.
- 🔊 Country **audio speaker** (text-to-speech).
- 📌 Mark favorite countries (stored in MongoDB database and linked to the logged-in user).

### 👤 Authentication Features (Backend)

- 🔐 Login, Register, and **JWT-based authentication**.
- 🔑 Change password functionality.
- 🧾 **Email verification** via Nodemailer with a one-time code.
- 🔒 Protected routes using JWT tokens.
- 🔐 Google login using OAuth.
- ☁️ **Profile picture upload** using **Supabase Storage**.
- ✍️ Tailwind CSS & React Icons based UI.
- 🚨 Toast notifications using **react-toastify**.



## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + React Router + Toastify + React Icons
- **Backend**: Node.js + Express + MongoDB + JWT + Nodemailer + Supabase
- **Hosting**: Vercel (Frontend), Render (Backend)
- **Authentication**: JWT, Google OAuth, Email Verification
- **Deployment**: Vercel & Render


## 🖥️ Screenshots

> Add screenshots like these:

### 🔍 Home Page with Search & Filters

![Home Page](./screenshots/home.png)

### 🗺️ Country Details Page

![Country Detail](./screenshots/detail.png)

### 🔐 Login & Google Auth

![Login](./screenshots/login.png)

### 🔐 Signup & Google Auth

![Login](./screenshots/signup.png)



## 📦 How to Run Locally

### Clone Both Repositories

```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-Ravindu200232.git
git clone https://github.com/Ravindu200232/CountryBackend.git
```

### Setup Frontend

```bash
cd countryFrontend
npm install
npm run dev
```

### Setup Backend

```bash
cd countryBackend
npm install
node server.js
```

> Make sure `.env` is configured correctly for your MongoDB URI, JWT secret, and Supabase keys.



## 🧪 Future Improvements

- ✅ Add favorite country support synced with backend.
- 🌍 Multi-language support.
- 🌙 Light/Dark mode toggle.



## 👨‍💻 Author

Created by **Ravindu** — SLIIT SE3010 Assignment  
GitHub: [ravindu200232](https://github.com/Ravindu200232/)



```

