// import React, { useState } from 'react';
// import './App.css';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';

// import {useAuthState} from 'react-firebase-hooks/auth';
// import {useCollectionData} from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   apiKey: "AIzaSyA4C1OwF1a2Mdsf_WnWICVGSOG07NTmFfw",
//   authDomain: "fireship-demos-84e2e.firebaseapp.com",
//   projectId: "fireship-demos-84e2e",
//   storageBucket: "fireship-demos-84e2e.appspot.com",
//   messagingSenderId: "805988154694",
//   appId: "1:805988154694:web:b73814ed6bedbe957b7947"
// })

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

// const[user]= useAuthState (auth);

// function App() {
//   return (
//     <div className="App">
//       <header>
       
//       </header>
//       <section>
//         {user ? <ChatRoom/> : <SignIn/>}
//       </section>
//     </div>
//   );
// }

// function SignIn(){
//   const  SignInwithGoogle = ()=>{
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.SignInwithGoogle(provider);
//   }

//   function SighOut(){
//     return auth.currentUser && (
//       <button onClick={()=>auth.SighOut}>SighOut</button>
//     )
//   }
// return(
//   <button onClick={SignInwithGoogle}>SignIn with Google</button>
// )
// }

// function ChatRoom(){

// const dummy = useRef()
// const messagesRef = firestore.collection('messages');
// const query = messagesRef.orderBy('createdAt').limit(25);

// const[messages] = useCollectionData(query,{idField :'id'});
//  const [formValue,setFormValue] = useState('')

//  const sendMessage = async(e)=>{
//    e.preventDefault();

//    const {uid,photoURL} = auth.currentUser;

//    await messagesRef.add({
//      text:formValue,
//      createdAt : firebase.firestore.FieldValue.serverTimestamp(),
//      uid,
//      photoURL
//    });

//    setFormValue('');

//    dummy.current.scrollIntoView({behavior: 'smooth'});
//  }

// return(
// <>
//   <main>
// {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

// <div ref={dummy}></div>
// </main>

// <form onSubmit={sendMessage}>
//   <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}/>
//   <button type="submit">Submit</button>
  
// </form>
// </>
// )
// }


// function ChatMessage(props){
//   const {text , uid , photoURL} = props.message;

//   const messageClass =uid === auth.currentUser.uid ? 'sent' : 'received';

//   return(
//   <div className={`message $ {messageClass}`}>
//     <img src={photoURL}/>
//     <p>{text} </p>
//   </div>
//   )
// }

// export default App;

import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA4C1OwF1a2Mdsf_WnWICVGSOG07NTmFfw",
   authDomain: "fireship-demos-84e2e.firebaseapp.com",
   projectId: "fireship-demos-84e2e",
   storageBucket: "fireship-demos-84e2e.appspot.com",
   messagingSenderId: "805988154694",
   appId: "1:805988154694:web:b73814ed6bedbe957b7947"
})

 export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    console.log("====>>" , formValue  , "    " , query)
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
