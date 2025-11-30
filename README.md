# Dev8 IDE

> Dev8 IDE is crafted to give developers a no-setup, browser-based coding experience with support for multiple languages. Whether you're learning, testing snippets, or building small apps, Dev8 IDE offers a smooth and distraction-free interface.
> Dev8 IDE is free and open to everyone. However, to make the most of your experience—like saving your work, accessing past projects, and managing code across devices—you'll need to sign up or log in. Signing up is quick and easy. Once you're in, you can create, edit, and save unlimited projects securely in your account.

## 🚀 Live Demo

Check out the deployed version on **Vercel**:

👉 [dev8.pradeepx.me](https://dev8.pradeepx.me)<br>
👉 [dev8-ide.vercel.app](https://dev8-ide.vercel.app)

---

## 📌 Features

- 🧠 **Monaco Editor** – Visual Studio Code experience in the browser
- 🧾 **Create, Edit, Save, Delete Projects** – Manage your personal code projects
- 💾 **Save Button** – Persist your code in real-time
- 🧼 **Reset Output** – Clear output panel without page reload
- 🖥️ **Responsive Design** – Mobile and tablet-friendly UI
- 🔐 **JWT-based Authentication** – Secure login/logout
- 📦 **Language Detection Icons** – Python, C++, Java, JavaScript, Bash support
- 🔄 **Run Code** – Backend executes code and returns output (Python, Bash, etc.)

---

## 🧑‍💻 Tech Stack

### Frontend

- **React** + **React Router**
- **Monaco Editor**
- **Tailwind CSS**
- **React Icons**

### Backend

- **Node.js** + **Express.js**
- **CORS** & **body-parser**
- **Child Process** (for code execution)
- **MongoDB** (optional for persistence)

---

## 📸 Screenshots
<img width="3198" height="1660" alt="image" src="https://github.com/user-attachments/assets/8c4ade92-4f00-4db4-a82c-16b13150dc86" />
<img width="3199" height="1656" alt="image" src="https://github.com/user-attachments/assets/eab3f35e-7bdd-459d-899a-59c6aebf013b" />
<img width="3199" height="1663" alt="image" src="https://github.com/user-attachments/assets/89a87ad5-a2ed-4972-9e31-e53f2e12a906" />


--- 

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dev8-ide.git
cd dev8-ide
```

### 2. Install Frontend & Backend Dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Environment Setup
#### Create .env files in both frontend and backend (for API base URL, DB config, etc.).

```bash
# backend/.env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

### 4. Run Locally

#### Backend
```bash
cd backend
npm start
```
#### Frontend
```bash
cd frontend
npm run dev
```

---

## 🛠️ Deployment

- **Frontend:** Vercel
- **Backend:** Render

---

## 🙋‍♂️ Author

**Pradeep Kumar Maurya**

📧 [pradeepx135@gmail.com](mailto:pradeepx135@gmail.com)  
🔗 [https://linkedin.com/in/pradeepx](https://linkedin.com/in/pradeepx)  
🐙 [https://github.com/pradeepx-dev](https://github.com/pradeepx-dev)

---

## 📌 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to [open an issue](https://github.com/pradeepx-dev/Dev8-IDE/issues) or [submit a pull request](https://github.com/pradeepx-dev/Dev8-IDE/pulls).

### 🧩 How to Contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add your feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

---

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Made with ❤️ by **Pradeep Kumar Maurya**
