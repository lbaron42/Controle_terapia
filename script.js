// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load data from Firestore instead of local JSON
function loadData() {
  db.collection("todos").get().then((querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push(doc.data());
    });
    renderTodos(todos);
  });
}

// Save data to Firestore
function saveData(todos) {
  // Clear collection first (simple approach)
  db.collection("todos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });
    
    // Add new todos
    todos.forEach((todo) => {
      db.collection("todos").add(todo);
    });
  });
}

// Update your existing code to use these functions
// ... existing code ... 