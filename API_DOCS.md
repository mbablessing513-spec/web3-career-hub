# Web3 Career Hub - API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

All endpoints that require user context should include the user ID. The API uses wallet addresses as the primary identifier.

### Common Error Responses

```json
{
  "error": "User not found" // 404
}
```

```json
{
  "error": "Database error" // 500
}
```

---

## Authentication Endpoints

### Login with Wallet

```
POST /api/auth/login
```

Creates or logs in a user with their wallet address.

**Request:**
```json
{
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "username": null,
    "email": null,
    "profileImage": null,
    "xp": 0,
    "badges": "[]",
    "createdAt": "2024-02-27T10:30:00Z",
    "isPro": false,
    "proExpiresAt": null
  },
  "token": "uuid-token-string"
}
```

### Get User Profile

```
GET /api/auth/user/:walletAddress
```

Retrieves user profile information.

**Response (200):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "username": "web3_dev",
    "email": "user@example.com",
    "xp": 150
  }
}
```

### Update User Profile

```
PUT /api/auth/user/:userId
```

Updates user profile information.

**Request:**
```json
{
  "username": "web3_developer",
  "email": "dev@example.com",
  "profileImage": "ipfs://QmHash..."
}
```

**Response (200):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "web3_developer",
    "email": "dev@example.com",
    "xp": 150
  }
}
```

---

## Learning Tracks Endpoints

### Get All Tracks

```
GET /api/tracks
```

Retrieves all available learning tracks.

**Response (200):**
```json
{
  "tracks": [
    {
      "id": "track-blockchain-101",
      "title": "Blockchain Fundamentals",
      "description": "Learn the basics of blockchain technology...",
      "category": "Fundamentals",
      "difficulty": "beginner",
      "totalLessons": 8,
      "isPaid": false,
      "price": 0,
      "createdAt": "2024-02-27T10:00:00Z"
    }
  ]
}
```

### Get Track Details

```
GET /api/tracks/:trackId
```

Retrieves specific track with all lessons.

**Parameters:**
- `trackId` (string) - Track identifier

**Response (200):**
```json
{
  "track": {
    "id": "track-blockchain-101",
    "title": "Blockchain Fundamentals",
    "description": "...",
    "difficulty": "beginner",
    "totalLessons": 8
  },
  "lessons": [
    {
      "id": "lesson-1",
      "trackId": "track-blockchain-101",
      "title": "What is Blockchain?",
      "description": "Introduction to blockchain...",
      "orderIndex": 1,
      "level": "beginner",
      "duration": 15
    }
  ]
}
```

### Create Track (Admin)

```
POST /api/admin/tracks
```

Creates a new learning track.

**Request:**
```json
{
  "title": "Advanced Solidity",
  "description": "Master advanced Solidity patterns...",
  "category": "Development",
  "difficulty": "advanced",
  "totalLessons": 12,
  "isPaid": true,
  "price": 149.99
}
```

**Response (201):**
```json
{
  "message": "Track created successfully",
  "trackId": "track-uuid"
}
```

### Update Track (Admin)

```
PUT /api/admin/tracks/:trackId
```

Updates track information.

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description...",
  "category": "Development",
  "difficulty": "advanced"
}
```

**Response (200):**
```json
{
  "message": "Track updated successfully"
}
```

---

## Lessons Endpoints

### Get Lesson Details

```
GET /api/lessons/:lessonId
```

Retrieves lesson with associated quiz.

**Response (200):**
```json
{
  "lesson": {
    "id": "lesson-1",
    "trackId": "track-blockchain-101",
    "title": "What is Blockchain?",
    "description": "...",
    "content": "Lesson content...",
    "videoUrl": "https://...",
    "duration": 15,
    "orderIndex": 1,
    "level": "beginner"
  },
  "quiz": {
    "id": "quiz-1",
    "lessonId": "lesson-1",
    "title": "Knowledge Check",
    "questions": "[...]",
    "passingScore": 70
  }
}
```

### Create Lesson (Admin)

```
POST /api/admin/lessons
```

Creates a new lesson within a track.

**Request:**
```json
{
  "trackId": "track-blockchain-101",
  "title": "Understanding Consensus",
  "description": "Learn about different consensus mechanisms...",
  "content": "Full lesson content...",
  "orderIndex": 4,
  "level": "beginner"
}
```

**Response (201):**
```json
{
  "message": "Lesson created successfully",
  "lessonId": "lesson-uuid"
}
```

---

## Progress & Learning Endpoints

### Enroll in Track

```
POST /api/progress/enroll
```

Enrolls a user in a learning track.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "track-blockchain-101"
}
```

**Response (201):**
```json
{
  "message": "Enrolled successfully",
  "progressId": "progress-uuid"
}
```

### Get User Progress

```
GET /api/progress/:userId
```

Retrieves all enrollment progress for a user.

**Response (200):**
```json
{
  "progress": [
    {
      "id": "progress-uuid",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "trackId": "track-blockchain-101",
      "enrolledAt": "2024-02-27T10:30:00Z",
      "completedLessons": "[\"lesson-1\", \"lesson-2\"]",
      "completedQuizzes": "[\"quiz-1\", \"quiz-2\"]",
      "totalXP": 50,
      "isCompleted": false
    }
  ]
}
```

### Complete Lesson

```
POST /api/progress/complete-lesson
```

Marks a lesson as complete and awards XP.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "track-blockchain-101",
  "lessonId": "lesson-1"
}
```

**Response (200):**
```json
{
  "message": "Lesson marked complete",
  "xpEarned": 10
}
```

### Complete Quiz

```
POST /api/progress/complete-quiz
```

Submits a quiz and awards XP based on score.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "track-blockchain-101",
  "quizId": "quiz-1",
  "score": 85
}
```

**Response (200):**
```json
{
  "message": "Quiz completed",
  "xpEarned": 25,
  "totalXP": 75
}
```

**XP Calculation:**
- Quiz score < 70%: +15 XP
- Quiz score 70-79%: +15 XP
- Quiz score 80%+: +25 XP

---

## Certificates Endpoints

### Issue Certificate

```
POST /api/certificates/issue
```

Issues a certificate upon track completion.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "track-blockchain-101"
}
```

**Response (201):**
```json
{
  "certificate": {
    "id": "cert-uuid",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "trackId": "track-blockchain-101"
  }
}
```

### Get User Certificates

```
GET /api/certificates/:userId
```

Retrieves all certificates earned by a user.

**Response (200):**
```json
{
  "certificates": [
    {
      "id": "cert-uuid",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "trackId": "track-blockchain-101",
      "certificateUrl": "ipfs://...",
      "nftTokenId": "12345",
      "issuedAt": "2024-02-27T11:00:00Z"
    }
  ]
}
```

---

## Job Board Endpoints

### Get All Jobs

```
GET /api/jobs
```

Retrieves job listings with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by job category
- `search` (optional) - Search in title, company, description

**Response (200):**
```json
{
  "jobs": [
    {
      "id": "job-1",
      "title": "Solidity Developer",
      "company": "Uniswap",
      "description": "Build smart contracts...",
      "category": "Developer",
      "location": "Remote",
      "salaryMin": 120000,
      "salaryMax": 180000,
      "requiredSkills": "[\"Solidity\", \"Ethereum\"]",
      "applyUrl": "https://...",
      "isSponsored": false,
      "isActive": true,
      "createdAt": "2024-02-27T10:00:00Z"
    }
  ]
}
```

### Get Job Details

```
GET /api/jobs/:jobId
```

Retrieves detailed job information.

**Response (200):**
```json
{
  "job": {
    "id": "job-1",
    "title": "Solidity Developer",
    "company": "Uniswap",
    "description": "...",
    "category": "Developer",
    "salaryMin": 120000,
    "salaryMax": 180000
  }
}
```

### Apply to Job

```
POST /api/jobs/apply
```

Applies user to a job listing.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "jobId": "job-1"
}
```

**Response (201):**
```json
{
  "message": "Applied successfully",
  "applicationId": "app-uuid"
}
```

### Save Job

```
POST /api/jobs/save
```

Saves a job for later reference.

**Request:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "jobId": "job-1"
}
```

**Response (201):**
```json
{
  "message": "Job saved successfully"
}
```

### Get Saved Jobs

```
GET /api/jobs/saved/:userId
```

Retrieves all saved jobs for a user.

**Response (200):**
```json
{
  "savedJobs": [
    {
      "id": "job-1",
      "title": "Solidity Developer",
      "company": "Uniswap",
      "description": "...",
      "category": "Developer"
    }
  ]
}
```

### Post Job (Admin)

```
POST /api/admin/jobs
```

Creates a new job listing.

**Request:**
```json
{
  "title": "Web3 Frontend Engineer",
  "company": "OpenSea",
  "description": "Develop responsive UI...",
  "category": "Developer",
  "salaryMin": 100000,
  "salaryMax": 160000,
  "requiredSkills": ["React", "Web3.js", "JavaScript"]
}
```

**Response (201):**
```json
{
  "message": "Job posted successfully",
  "jobId": "job-uuid"
}
```

---

## Admin Endpoints

### Get Platform Statistics

```
GET /api/admin/stats
```

Retrieves overall platform statistics.

**Response (200):**
```json
{
  "stats": {
    "totalUsers": 150,
    "totalTracks": 5,
    "totalEnrollments": 450,
    "totalJobs": 25
  }
}
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per minute per IP
- 1000 requests per hour per user

## CORS

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

## Pagination

Not currently implemented. Recommended for production when datasets grow large:

```
GET /api/tracks?page=1&limit=20
```

## Versioning

Current API version: v1 (implicit)

For future versions consider:
```
GET /api/v1/tracks
GET /api/v2/tracks
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request format |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Database or server error |

## Testing the API

### Using cURL
```bash
curl -X GET http://localhost:3000/api/tracks
```

### Using Postman
1. Import endpoints above
2. Set variables for userId, trackId, etc.
3. Run pre-request scripts for auth if needed

### Using JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/tracks');
const data = await response.json();
console.log(data);
```

---

## Future Enhancements

- [ ] WebSocket support for real-time notifications
- [ ] GraphQL API option
- [ ] API rate limiting
- [ ] Request signing with wallet
- [ ] Streaming uploads for videos
- [ ] Webhook support for events
- [ ] Analytics endpoints
- [ ] Search API with Elasticsearch

---

**Last Updated:** February 2024
**API Stability:** Beta