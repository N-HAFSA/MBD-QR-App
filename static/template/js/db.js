firebase.auth().onAuthStateChanged(function(user){
    if (user){
        //User is signed in
        // show update page
        // hide login page and createAccount page
    } else {
        // No user is signed in
        // show login page
        // hide update page and createAccount page
    }

});

function login(){
    var userEmail = document.getElementById("logemail").value;
    var userCne = document.getElementById("logcne").value;

    //function signed in with DoB and CNE: 
    firebase.auth().signInWithEmailAndPassword(userEmail,userCne)
    .then((users) => {
        // if login success go to the main page
        var user = users.user;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);

      });

    
}

function logout(){
    firebase.auth().signOut().then(function(){
        // Sign out successful
    }).catch(function(error){
        // An error happened
    });
    // or simply: firebase.auth().signOut()
}

function signup(){
    var userBirth = document.getElementById("dn").value;
    var userCne = document.getElementById("cne").value;
    var userName = document.getElementById("nom").value;
    var userFname = document.getElementById("prenom").value;
    var userPhone = document.getElementById("tel").value;
    var userEmail = document.getElementById("email").value;
    var userAddress = document.getElementById("adrs").value;
    var qrImage = document.getElementById("qrcode").files;  // var for qrImage: 
    var imageName = grImage.name;

    // btns
    const signinbtn = document.getElementById("signinbtn");
    const updatebtn = document.getElementById("updatebtn");

    // firebase storage reference:
    var storage = firebase.storage().ref('images/'+ imageName);
    var uploadTask = storage.put(qrImage);

    const promise = auth.createUserWithEmailAndPassword(userEmail.value, userCne.value); 
    promise.catch(e => alert(e.message)); // catch error

    // reference to the table
    const con = firebase.database().ref('users');

    //alert('Signed up successefully ');
    document.getElementById("createAccount").addEventListener("submit", (e)=>{
        e.preventDefault();

        var studentInfo = con.push();
        studentInfo.set({
            name: userName,
            fname: userFname,
            cne: userCne,
            phone: userPhone,
            Birth: userBirth,
            email: userEmail,
            address: userAddress
            //Image: qrImage

        });
        alert("sent");
        console.log("sent");
        document.getElementById("createAccount").reset();
    });
}

//function update()
    updatebtn.addEventListener('click', e => {
        e.preventDefault();

        const newData = {

            name: userName,
            fname: userFname,
            cne: userCne,
            phone: userPhone,
            Birth: userBirth,
            email: userEmail,
            address: userAddress
        }

        con.child().update(newData);
    });




