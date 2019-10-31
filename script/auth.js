// Sign-up
const signupForm = document.querySelector("#signup-form");
const logOut = document.querySelectorAll(".loggedout");
const logIn = document.querySelector("#login-form");
const createGuide = document.querySelector("#create-form");
//Listen for auth status change
auth.onAuthStateChanged(user => {
  //navbar update
  setUpUi(user);
  if (user) {
    db.collection("guide").onSnapshot(
      snapshot => {
        setUpGuides(snapshot.docs);
      },
      err => {
        console.log(err);
      }
    );
  } else {
    setUpGuides([]);
  }
});

signupForm.addEventListener("submit", e => {
  e.preventDefault();
  //getting user info'
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const bio = signupForm["signup-bio"].value;

  //console.log(email, password);
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      //console.log("Signed In");
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          bio
        });
      //console.log(cred);
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => console.log(err));
});
logOut.forEach(elm =>
  elm.addEventListener("click", e => {
    e.preventDefault();
    //console.log("login started running");
    auth.signOut().catch(err => console.log(err));
  })
);
logIn.addEventListener("submit", e => {
  e.preventDefault();
  const email = logIn["login-email"].value;
  const password = logIn["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      // console.log(cred.user);
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      logIn.reset();
    })
    .catch(err => {
      console.log(err);
    });
  //console.log({ email, password });
});
createGuide.addEventListener("submit", e => {
  e.preventDefault();
  let title = createGuide["title"].value;
  let content = createGuide["content"].value;
  db.collection("guide")
    .add({ title, content })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createGuide.reset();
    })
    .catch(err => console.log(err));
});
