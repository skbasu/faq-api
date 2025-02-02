# FAQ Management API

A Node.js-based FAQ Management API that supports multilingual FAQs using Express, MongoDB, Redis for caching, and Google Translate API for automatic translations.

## Features
- CRUD operations for FAQs
- Automatic translation of FAQs into Hindi and Bengali
- Redis caching for improved performance
- MongoDB for persistent storage
- Dockerized setup for easy deployment

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Docker & Docker Compose](https://www.docker.com/) (if using Docker)

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/faq-management-api.git
   cd faq-management-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/faqs
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4. **Start MongoDB and Redis (if not using Docker):**
   ```sh
   mongod --dbpath ./data/db &
   redis-server
   ```

5. **Run the server:**
   ```sh
   npm start
   ```

6. **Access the API:**
   Open your browser or use Postman to access:
   ```
   http://localhost:3000/api/faqs
   ```

---

## Docker Setup

1. **Build and start the services:**
   ```sh
   docker-compose up --build -d
   ```

2. **Stop the services:**
   ```sh
   docker-compose down
   ```

---

## API Usage

### 1. Get all FAQs
```http
GET /api/faqs?lang=en
```
#### Response:
```json
[
  {
    "_id": "12345",
    "question": "What is Node.js?",
    "answer": "Node.js is a runtime environment for executing JavaScript on the server."
  }
]
```

### 2. Create a new FAQ
```http
POST /api/faqs
```
#### Request Body:
```json
{
  "question": "What is Express?",
  "answer": "Express is a web framework for Node.js."
}
```
#### Response:
```json
{
  "message": "FAQ created successfully"
}
```

### 3. Get FAQs in a different language (e.g., Hindi)
```http
GET /api/faqs?lang=hi
```

---

## Contribution Guidelines

We welcome contributions! Follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Submit a Pull Request**

Please ensure your code follows the existing style and includes necessary tests.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions, open an issue or reach out at `your-email@example.com`.

---

