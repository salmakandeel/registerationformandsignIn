// Name and Password from the register-form
var firstName = document.getElementsByName("firstName")[0]
var lastName = document.getElementsByName("lastName")[0]
var email = document.getElementsByName("email")[0]
var password = document.getElementsByName("password")[0]
var confirmPassword = document.getElementsByName('confirmPassword')[0];
var signUpForm=document.getElementById('signUpForm')
var signInForm=document.getElementById('signInForm')
let p=document.createElement("p");

let userName=''
let flag
function store() {
 let validation= validateForm()
 if(validation==false){
   return 0
 }
 else{

 
 if(!validatePassword(password.value))
    {p.classList.add('Error')
    p.innerHTML=(' password not valid')
    password.after(p)
    return 0}
     if(password.value!=confirmPassword.value){
        p.classList.add('Error')
        p.innerHTML=('confirmPassword and password not equal')
        confirmPassword.after(p)
        return 0
    }
    if(!validateEmail(email.value))
    {p.classList.add('Error')
    p.innerHTML=('Invalid Email')
    email.after(p)
    return 0
    }
    
    else{
        let users=localStorage.getItem('users')
        users=JSON.parse(users)
        if(users==null) users=[]

         
            users.forEach(user => {
                if( user.email==email.value)
                {
                    alertify.alert('you logged before')
                    return 0
                }
        })
        
            userName=firstName.value+ " "+lastName.value
            let newUser=
               {
                   "name":userName,
                   "email":email.value,
                   "pw":password.value,
       
               }
               users.push(newUser)
               console.log(users)
            usersJson = JSON.stringify(users);
       localStorage.setItem("users", usersJson);
        
     
    }
} }

const validateForm=()=>{
    if(firstName.value=='')
    {   p.innerHTML='Enter first Name...'
    p.classList.add('Error')
        firstName.after(p)
        return (false)

    }
    if(lastName.value=='')
        {   p.innerHTML='Enter last Name...'
        p.classList.add('Error')
            lastName.after(p)
            return (false)
        }
         if(email.value=='')
            {   p.innerHTML='Enter email...'
            p.classList.add('Error')
                email.after(p)
                return (false)
            } 
        
         if(password.value=='')
        {   p.innerHTML='Enter password...'
        p.classList.add('Error')
            password.after(p)
            return (false)
        }
        if(confirmPassword.value=='')
            {   p.innerHTML='Enter confirm Password...'
            p.classList.add('Error')
                confirmPassword.after(p)
                return (false)   
            } 
        
}
// check if stored data from register-form is equal to entered data in the   login-form
function check() {
    let users=localStorage.getItem('users')
    users=JSON.parse(users)

    // entered data from the login-form
    let userEmail= document.getElementById('userEmail');
    let userPw = document.getElementById('userPw');
users.forEach(user => {
    if(user.pw==userPw.value && user.email==userEmail.value)
    {
        alertify.alert("You are logged successfully ")
    }
    else{
        alertify.alert("Email or Password are not valid") 
    }
});}

const validateEmail=(email)=>{
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    return email.match(pattern)
}
const validatePassword=(pw)=>{
    let pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
    return pw.match(pattern)

}
const signIn=()=>{
   signUpForm.style.display='none'
   signInForm.style.display='flex'
   document.getElementsByTagName('h2')[0].innerHTML='SignIn Form'
}

const signUp=()=>{
    signUpForm.style.display='flex'
   signInForm.style.display='none' 
   document.getElementsByTagName('h2')[0].innerHTML ='Registeration Form'
}
