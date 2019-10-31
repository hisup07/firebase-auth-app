const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountsNotify = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

function setUpUi(user) {
  if (user) {
    if (user.admin) {
      adminItems.forEach(elm => (elm.style.display = "block"));
    }
    //  Account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
          <div>Logged in as <strong class="blue-text text-lighten-2">${
            user.email
          }</strong> </div>
          <div>${doc.data().bio}</div>
          <div>${user.admin ? "Admin" : ""}</div>
    `;
        accountsNotify.innerHTML = html;
      });

    //toggle ui elements

    loggedInLinks.forEach(link => (link.style.display = "block"));
    loggedOutLinks.forEach(link => (link.style.display = "none"));
  } else {
    adminItems.forEach(elm => (elm.style.display = "none"));
    //hide account info
    accountsNotify.innerHTML = "";
    loggedInLinks.forEach(link => (link.style.display = "none"));
    loggedOutLinks.forEach(link => (link.style.display = "block"));
  }
}

function setUpGuides(guideArr) {
  //console.log(guideArr);
  let html = "";
  if (guideArr.length === 0) {
    html =
      "<h5 class='center-align blue-text text-darken-2' >Login To view Guides</h5>";
  } else {
    guideArr.forEach(doc => {
      let title = doc.data().title;
      let content = doc.data().content;
      const li = `
     <li>
     <div class="collapsible-header grey lighten-4">${title}</div>
          <div class="collapsible-body white">
            <span>${content}</span>
          </div>
     </li>
    `;
      html += li;
    });
  }

  guideList.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  const items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
