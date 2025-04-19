# 🧾 Receipt Processor API

A RESTful API built with Node.js and TypeScript to process receipts and calculate reward points based on a set of rules. This project is a solution to the [Fetch Rewards Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge).

---

## 📌 Features

- Process receipt data and return a unique ID
- Retrieve reward points for a processed receipt
- Input validation with Joi and custom middleware
- Clean, modular structure using services and routes
- Fully typed with TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation & Execution

```bash
npm install

### Run in Development
npm run dev

## Docker Setup
You can run the application using Docker.

### Build the Docker Image
docker build -t receipt-processor .

### Run the Docker Image
docker run -p 3000:3000 receipt-processor