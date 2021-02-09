from functools import wraps
import sys
import os
from flask import Flask, render_template, redirect, request, url_for, session
#coming from pyrebase4
import pyrebase

#firebase config
config = {
	"apiKey": "AIzaSyCx69gQGeTqaKsOmrAuIvPu4nTNVR9JOSo",
    "authDomain": "cbir-60aa4.firebaseapp.com",
    "databaseURL": "https://cbir-60aa4-default-rtdb.firebaseio.com",
    "projectId": "cbir-60aa4",
    "storageBucket": "cbir-60aa4.appspot.com",
    "messagingSenderId": "8303365321",
    "appId": "1:8303365321:web:d8262196ce8f6823479118",
    "measurementId": "G-6MR6B2KHZF"
}

#init firebase
firebase = pyrebase.initialize_app(config)
#auth instance
auth = firebase.auth()
#real time database instance
db = firebase.database();


#new instance of Flask
app = Flask(__name__)
#secret key for the session
app.secret_key = os.urandom(24)

#index route
@app.route("/")
def index():
    allposts = db.child("Posts").get()
    #print(allposts.val(), file=sys.stderr)
    if allposts.val() == None:
      #print(posts, file=sys.stderr)
      return render_template("index.html")
    else:
      return render_template("index.html", posts=allposts)

#signup route
@app.route("/signup", methods=["GET", "POST"])
def signup():
    return render_template("signup.html")


#login route
@app.route("/login", methods=["GET", "POST"])
def login():
  message=""
  if request.method == "POST":
    
    cin = request.form['cin']
    email = request.form['email'] 

    user = db.child('users').order_by_child('email').equal_to(email).limit_to_first(1).get()
    user_data = user.val()
    user_data = list(user_data.values())
    cin_inp = user_data[0].get('cin',"Not Found")
    if cin == cin_inp :
      session['user'] = user_data
      return redirect("/user_profile")
    message ="incorrect email or CIN"
       
  return render_template("login.html",message=message)

@app.route("/user_profile")
def userProfile():
  if session['user'] != None :
    user = session['user']
    return render_template("edit.html",users=user)
  return redirect("/login")

#logout route
@app.route("/logout")
def logout():
    #remove the token setting the user to None
    auth.current_user = None
    #also remove the session
    session['user'] = ""
    session.clear()
    return redirect("/login")

#create form
@app.route("/create", methods=["GET", "POST"])
def create():
 
  if request.method == "POST":
    #get the request data
    title = request.form["title"]
    content = request.form["content"]

    post = {
      "title": title,
      "content": content,
     }

    try:
      #print(title, content, file=sys.stderr)

      #push the post object to the database
      db.child("Posts").push(post)
      return redirect("/")
    except:
      return render_template("create.html", message= "Something wrong happened")  

  return render_template("create.html")


@app.route("/users/")
def read_users():
  import qrcode
  '''
  user = {
    "nom" : "jhon",
    "prenom" : "doe",
    "cin" : "878658",
    "adress" : "dhsuifhuds kjefk london 4545",
    "email" : "jhondoe@gmail.com",
    "birthday" : "11/12/1997" }
  
  qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
  )
  qr.add_data(user["nom"]+user["prenom"]+user["cin"]+user["email"])
  data =qr.make(fit=True)
  qr_img = qr.make_image(fill_color="black", back_color="white")
  path = "static/images/"+user["cin"]+".png"
  img = qr_img.save(path)
  
  user["qr_image_path"] = path
  
  db.child("users").push(user)
  '''
  #get the users
  users = db.child("users").get()
  users_data = users.val()
        
  return render_template("post.html",users =users_data.values() )

@app.route("/profile/", methods=["GET", "POST"])
def get_user():
    if request.method == "POST":
      cin = request.form['cin']
      user =  db.child("users").order_by_child("cin").equal_to(cin).limit_to_first(1).get()
      user_data = user.val()
    return render_template("edit.html", users=user_data.values())

@app.route("/delete/<id>", methods=["POST"])
def delete(id):
    db.child("Posts").child(id).remove()
    return redirect("/")


#run the main script
if __name__ == "__main__":
    app.run(debug=True)
