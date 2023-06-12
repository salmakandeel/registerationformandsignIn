// Name and Password from the register-form
var firstName = document.getElementsByName("firstName")[0]
var lastName = document.getElementsByName("lastName")[0]
var email = document.getElementsByName("email")[0]
var password = document.getElementsByName("password")[0]
var confirmPassword = document.getElementsByName('confirmPassword')[0];
var signUpForm=document.getElementById('signUpForm')
var signInForm=document.getElementById('signInForm')
let p=document.createElement("p");
let signUpButton=document.getElementById('rgstr_btn')
let signInButton=document.getElementById('login_btn')
let userName=''
let result=true
let flag=true
// function to signup
signUpButton.addEventListener('click',function(event) {
 event.preventDefault()
 let validation= validateForm()
 if(validation){
    

    console.log(validatePassword(password.value));
    if(password.value.length<8)
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML=' password must be at least 8 character '
    password.after(p)
    console.log(validatePassword(password.value))
    return(0)
}
 if(!validatePassword(password.value))
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML=' password must contain at least one capital,small and special character '
    password.after(p)
    console.log(validatePassword(password.value))
    return(0)
}
    if(password.value!=confirmPassword.value){
        p.classList.add('Error')
        p.style.display="block"
        p.innerHTML='confirmPassword and password not equal'
        confirmPassword.after(p)
        return(0)
    }
    console.log(!validateEmail(email.value));
    if(!validateEmail(email.value))
    {p.classList.add('Error')
    p.style.display="block"
    p.innerHTML='Invalid Email'
    email.after(p)
    return (0)
    }
    
    else{
        p.style.display="none"
        let users=localStorage.getItem('users')
        users=JSON.parse(users)
        if(users==null) users=[]

         
            users.forEach(user => {
                if( user.email==email.value)
                {
                    alertify.alert('you logged before')
                    flag=false

                }
        })
        console.log(flag);
        if(flag)
            {userName=firstName.value+ " "+lastName.value
            let newUser=
               {
                   "name":userName,
                   "email":email.value,
                   "pw":password.value,
       
               }
               users.push(newUser)
               console.log(users)
            usersJson = JSON.stringify(users);
       localStorage.setItem("users", usersJson);}
        
     
    }
    // reset form
firstName.value=''
lastName.value=''
email.value=''
password.value=''
confirmPassword.value=''
}
 })
// function to validate data from fprm
const validateForm=()=>{
    console.log(flag);
    if(firstName.value=='')
    {   p.innerHTML='Enter first Name...'
    p.classList.add('Error')
        firstName.after(p)
        flag=false
        

    }
    else if(lastName.value=='')
        {   p.innerHTML='Enter last Name...'
        p.classList.add('Error')
            lastName.after(p)
            flag=false
            
        }
         else if(email.value=='')
            {   p.innerHTML='Enter email...'
            p.classList.add('Error')
                email.after(p)
                flag=false
        
            } 
        
         else if(password.value=='')
        {   p.innerHTML='Enter password...'
        p.classList.add('Error')
            password.after(p)
            flag=false
       
        }
        else if(confirmPassword.value==='')
            {  
                p.innerHTML='Enter confirm Password...'
            p.classList.add('Error')
                confirmPassword.after(p)
                flag=false
            } 
        else {
            flag=true
            p.style.display="none"}
            return (flag) 
}
// check if stored data from register-form is equal to entered data in the   login-form
signInButton.addEventListener('click',function (event) {
    event.preventDefault()

    let users=localStorage.getItem('users')
    users=JSON.parse(users)
console.log(users);
    // entered data from the login-form
    let userEmail= document.getElementById('userEmail');
    let userPw = document.getElementById('userPw');
for (let i=0;i<users.length;i++ ) {

if(users[i].pw==userPw.value && users[i].email==userEmail.value)
{
    result=true 
    userName=users[i].name
    break
   
}
  
else 
{
result=false
}
  
}
if(result){
    alertify.success("You are logged successfully")
    document.getElementById('containearId').style.display='none'
    document.getElementById('welcome').style.display="block" 
    // document.body.style.backgroundColor = 'rgb(255 245 245)';
    document.getElementsByTagName('h2')[1].innerHTML =`Welcome ${userName} !!`
}
else alertify.error("Email or Password are Invaild")
userEmail.value=''
userPw.value='' 
;}) 

// function to validate email
// const validateEmail=(email)=>{
//     let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
//     return pattern.test(String(email).toLowerCase());

// }
function validateEmail(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))/;
    return re.test(text);
}
// function to validate password
const validatePassword=(pw)=>{
   

    let pattern=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    // let v=pw.match(pattern)
    return (pattern.test(pw))

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