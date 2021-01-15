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
    
    return render_template("login.html")

#logout route
@app.route("/logout")
def logout():
    #remove the token setting the user to None
    auth.current_user = None
    #also remove the session
    #session['usr'] = ""
    #session["email"] = ""
    session.clear()
    return redirect("/");

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


@app.route("/post/<id>")
def post(id):
    orderedDict = db.child("Posts").order_by_key().equal_to(id).limit_to_first(1).get()
    print(orderedDict, file=sys.stderr)
        
    return render_template("post.html", data=orderedDict)

@app.route("/edit/<id>", methods=["GET", "POST"])
def edit(id):
    if request.method == "POST":

      title = request.form["title"]
      content = request.form["content"]

      post = {
        "title": title,
        "content": content,
       }

      #update the post
      db.child("Posts").child(id).update(post)
      return redirect("/post/" + id) 
    
    
    orderedDict =  db.child("Posts").order_by_key().equal_to(id).limit_to_first(1).get()
    return render_template("edit.html", data=orderedDict)

@app.route("/delete/<id>", methods=["POST"])
def delete(id):
    db.child("Posts").child(id).remove()
    return redirect("/")


#run the main script
if __name__ == "__main__":
    app.run(debug=True)
