# README-client.md

## Client Application Part B

Ο φάκελος αυτός περιέχει το **client (frontend)** της εφαρμογής
Ο client είναι μια **Single Page Application (SPA)** και είναι υπεύθυνος για το γραφικό περιβάλλον του χρήστη. Επικοινωνεί με το backend μέσω **REST API**.

---

## Προαπαιτούμενα

- Node.js (v18 ή νεότερο)
- npm
- Backend server σε λειτουργία

---

## Εγκατάσταση Dependencies (μέσω Command Prompt)

```bash
npm install
```

## Εκκίνηση της εφαρμογής
1. Εκκίνηση της βάσης δεδομένων MongoDB
2. npm install / npm start
3. Εκτέλεση των seeds scripts για αρχικοποιηση βάσης με : npm run seed:books, npm run seed:courses, npm run seed:team για φωτογραφίες μελών.
4. Για εμφάνιση του site όπως διαμορφώθηκε στο Μέρος Α : npm i -D sirv
5. npm run dev 

## URL Client
http://localhost:5173 (Μέρος Β)
http://localhost:5173/parta/  (Μέρος Α)


## Το backend εκτελείται στο Backend URL:
http://localhost:5000


Ο client συνδέεται με το backend μέσω REST API. 
Στέλνει HTTP αιτήματα (GET, POST, PUT, DELETE) προς το backend server 
(http://localhost:5000) και λαμβάνει δεδομένα σε μορφή JSON.




