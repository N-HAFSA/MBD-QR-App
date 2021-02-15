var config = {
    "apiKey": "AIzaSyCx69gQGeTqaKsOmrAuIvPu4nTNVR9JOSo",
    "authDomain": "cbir-60aa4.firebaseapp.com",
    "databaseURL": "https://cbir-60aa4-default-rtdb.firebaseio.com",
    "projectId": "cbir-60aa4",
    "storageBucket": "cbir-60aa4.appspot.com",
    "messagingSenderId": "8303365321",
    "appId": "1:8303365321:web:d8262196ce8f6823479118",
    "measurementId": "G-6MR6B2KHZF"
};
//init firebase
firebase = pyrebase.initialize_app(config);
//auth instance
auth = firebase.auth();
//real time database instance
db = firebase.database();
// reference to the table
var con = firebase.database().ref('users');