JWT Authentication Flow - Step by Step
Login:

User enters username and password
Frontend sends credentials to /login endpoint
Server checks if username exists in database
Server compares password hash with stored hash
If match ✓, server creates JWT token:
Creates header (algorithm info)
Creates payload (userId, email, isAdmin, expiry)
Creates signature using SECRET_KEY
Combines: header.payload.signature
Server returns JWT token to frontend
Frontend stores JWT in localStorage
Accessing Protected Endpoints:
8. User makes request to protected endpoint (e.g., /expenses)
9. Frontend attaches JWT in request header: Authorization: Bearer {token}
10. Server receives request
11. Server extracts JWT from Authorization header
12. Server splits JWT into: header, payload, signature
13. Server recalculates signature using SECRET_KEY + header + payload
NOTE: If payload has been tampered with, the recalculated signature will differ. Example of tampering: changing "isAdmin": false to "isAdmin": true.
Recalculated signature = Header + Payload + secret key. If payload is changed, recalculated signature will not match original signature. look at bottom of file on how i undeersood this
14. Server compares recalculated signature with received signature
15. If signatures match ✓:
- Token is valid
- Server reads user info from payload (userId, isAdmin, etc.)
- Server allows access to endpoint
16. If signatures don't match ✗:
- Token was tampered with or invalid
- Server returns 401 Unauthorized
- Frontend redirects to login

Logout:
17. Frontend deletes JWT from localStorage
18. User is logged out (no token = no access)



*************** How i understood step 13: ***********************

frontend stores Header + payload + signature

Attacker modified payload

Backend receives signature (original)

Backend recalculates signature using header + payload + secret

Wont be same, because when signature was calculated originally, and when signature was recalculated, they use different payloads. so reject.