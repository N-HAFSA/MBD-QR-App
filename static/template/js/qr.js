const nom = document.getElementById('nom'); 
const prenom = document.getElementById('prenom'); 
const cne = document.getElementById('cne'); 
const tel = document.getElementById('tel'); 
const dn = document.getElementById('dn'); 
const email = document.getElementById('email');
const adrs = document.getElementById('adrs'); 

var qrdata=document.getElementById("createAccount");
var qrcode=new QRCode(document.getElementById("qrcode"),{ });

function generateQR(){
	var x = document.getElementById("createAccount");
    var text = "";
	var label=" ";
    var i;
    // var check inputs
    const nomValue = nom.value.trim(); 
    const prenomValue = prenom.value.trim();
    const cneValue = cne.value.trim();
    const emailValue = email.value.trim();
    
    if(nomValue!=="" && prenomValue!=="" && cneValue!=="" && emailValue!=="" && isEmail(emailValue)){ 
        for (i = 0; i < (x.length-1) ;i++) {

            
                    if (i==0)
                    {
                        label="Nom : ";
                    }
                    else if(i==1)
                    {
                        label="Prenom : ";
                    }
                    else if(i==2)
                    {
                        label="CNE : ";
                    }
                    else if(i==3 ) //&& x.elements[3].value!==""
                    {
                        
                        label="Tel : ";
                    }
                    else if(i==4)
                    {
                        label="DOB : ";
                    }
                    else if(i==5 ) // && x.elements[5].value!==""
                    {
                        label="Email : ";
                    }
                    else if(i==6 ) // && x.elements[6].value!==""
                    {
                        label="Adresse : ";
                    }
                    else{
                        label="";
                    }
            
        text +=label+  x.elements[i].value;
        if(x.elements[i].value)
            {
                text += "<br>";
            }

        }
    }
	
    if(!text){
			alert("Remplissez les champs obligatoires: Name, Familly name, CNE & Email Address");
			text.focus();
			return;
			}
		   
			var data=text;
			qrcode.makeCode(data);
			document.getElementById('SaveLink').classList.remove('hide');
			document.getElementById('SaveLink').classList.add('show');
			
} 

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} 