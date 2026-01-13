# SmartWealth API Documentation

## Base URL
```
Development: http://localhost:8080/api
Production: https://api.smartwealth.example.com/api
```

## Authentication
ปัจจุบันยังไม่มี authentication สำหรับ public endpoints  
Admin endpoints จะต้องมี Bearer token

```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### 📰 Articles

#### Get All Articles
```
GET /articles
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "ทำไม \"ฐานราก\" ของการเงินถึงต้องเป็นประกัน?",
        "category": "การวางแผน",
        "image": "https://...",
        "summary": "...",
        "content": "...",
        "author": "SmartWealth Team",
        "publishedAt": "2026-01-08T00:00:00Z",
        "tags": ["ประกัน", "การเงิน"]
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 10,
    "totalPages": 5
  }
}
```

#### Get Article by ID
```
GET /articles/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "...",
    "category": "...",
    "image": "...",
    "summary": "...",
    "content": "Full article content in markdown...",
    "author": "SmartWealth Team",
    "publishedAt": "2026-01-08T00:00:00Z",
    "tags": ["ประกัน", "การเงิน"],
    "views": 1234,
    "likes": 56
  }
}
```

#### Create Article (Admin)
```
POST /articles
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Article title",
  "category": "Category name",
  "image": "https://...",
  "summary": "Brief summary",
  "content": "Full content in markdown",
  "tags": ["tag1", "tag2"]
}
```

#### Update Article (Admin)
```
PUT /articles/:id
Authorization: Bearer <token>
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "content": "Updated content",
  "tags": ["updated", "tags"]
}
```

#### Delete Article (Admin)
```
DELETE /articles/:id
Authorization: Bearer <token>
```

---

### 💬 Comments

#### Get Comments by Article
```
GET /comments?articleId=:id
```

**Query Parameters:**
- `articleId` (required): Article ID
- `page` (optional): Page number
- `pageSize` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "comment-uuid",
        "articleId": 1,
        "author": "John Doe",
        "content": "Great article!",
        "rating": 5,
        "createdAt": "2026-01-08T10:30:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 10,
    "totalPages": 3
  }
}
```

#### Create Comment
```
POST /comments
```

**Request Body:**
```json
{
  "articleId": 1,
  "author": "John Doe",
  "content": "Great article!",
  "rating": 5
}
```

**Validation:**
- `articleId`: required, must be valid article
- `author`: required, 2-50 characters
- `content`: required, 10-1000 characters
- `rating`: optional, 1-5

#### Delete Comment
```
DELETE /comments/:id
```

**Note:** ในอนาคตอาจต้องมี authentication

---

### 📊 Calculations

#### Calculate Savings Plan
```
POST /calculate/savings
```

**Request Body:**
```json
{
  "age": 35,
  "sumAssured": 1000000,
  "taxRate": 0.10,
  "investYield": 5.0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "premium": 82000,
    "annualTaxSaving": 8200,
    "netOutflow": 73800,
    "breakEvenYear": 12,
    "totalReturn": 1210000,
    "data": [
      {
        "year": 1,
        "investment": 73800,
        "death": 1000000,
        "cashValue": 0,
        "premium": 82000
      }
      // ... 35 years
    ]
  }
}
```

#### Calculate Tax Benefits
```
POST /calculate/tax
```

**Request Body:**
```json
{
  "annualIncome": 600000,
  "premiumPaid": 100000,
  "deductions": {
    "personalAllowance": 60000,
    "spouse": 60000,
    "children": 2
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "taxWithoutInsurance": 50000,
    "taxWithInsurance": 40000,
    "taxSaving": 10000,
    "effectiveRate": 0.10
  }
}
```

---

## Error Codes

### Client Errors (4xx)
- `400 BAD_REQUEST`: Invalid request body
- `401 UNAUTHORIZED`: Missing or invalid authentication
- `403 FORBIDDEN`: Insufficient permissions
- `404 NOT_FOUND`: Resource not found
- `422 VALIDATION_ERROR`: Validation failed

### Server Errors (5xx)
- `500 INTERNAL_ERROR`: Server error
- `503 SERVICE_UNAVAILABLE`: Service temporarily unavailable

## Rate Limiting

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 500 requests/minute

Exceeded requests return `429 Too Many Requests`

## CORS

Allowed origins:
- `http://localhost:5173` (development)
- `https://smartwealth.example.com` (production)

## Data Types

### Article
```typescript
interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  views?: number;
  likes?: number;
}
```

### Comment
```typescript
interface Comment {
  id: string;
  articleId: number;
  author: string;
  content: string;
  rating?: number;
  createdAt: string;
}
```

### Pagination
```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## Example cURL Commands

### Get Articles
```bash
curl -X GET "http://localhost:8080/api/articles?page=1&pageSize=10"
```

### Create Comment
```bash
curl -X POST "http://localhost:8080/api/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "articleId": 1,
    "author": "John Doe",
    "content": "Great article!",
    "rating": 5
  }'
```

### Calculate Savings (with auth)
```bash
curl -X POST "http://localhost:8080/api/calculate/savings" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 35,
    "sumAssured": 1000000,
    "taxRate": 0.10,
    "investYield": 5.0
  }'
```

## Websockets (Future)

สำหรับ real-time updates:

```
ws://localhost:8080/ws
```

Events:
- `article:created`
- `article:updated`
- `comment:created`
