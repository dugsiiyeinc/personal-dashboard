const fullName = document.querySelector("#fullname");
const email = document.querySelector("#username");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const submitForm = document.querySelector("#registerSubmit");

// Get users from local storage
const usersFromLocal = function () {
  let users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// Get active User
const activeUser = function () {
  let userInformation = localStorage.getItem("userInformation");
  return userInformation ? JSON.parse(userInformation) : null;
};

const userInformation = activeUser();

if (userInformation) {
  window.location.href = "/overview.html";
}

const addUsersToLocal = function (data) {
  const users = usersFromLocal();
  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
};

submitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (password.value !== confirm.value) {
    swal("Stop", `Password dosen't match`, "warning");

    return;
  }

  if (password.value.length < 8 && confirm.value.length < 8) {
    swal("Stop", `Password Must Be 8 Characters`, "warning");
    return;
  }

  const checkFullName = fullName.value.split(" ").length <= 1;

  if (checkFullName) {
    swal("Stop", `Complete Fullname Plz`, "warning");
    return;
  }

  const allUsers = usersFromLocal();

  const checkUser = allUsers.find(function (userna) {
    return userna.username === username.value;
  });

  if (checkUser) {
    swal("Stop", `Username Already Created`, "error");
    return;
  }
  const avator =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJpuhV1SzYSmu7GtCJNKxbSGpo_kMqz0qhoQ&usqp=CAU";
  const dataRec = {
    id: allUsers.length + 1,
    fullName: fullName.value,
    username: username.value,
    password: password.value,
    photo: avator,
  };

  const userInfo = {
    userId: dataRec.id,
    username: dataRec.username,
    name: dataRec.fullName,
    photo: dataRec.photo,
  };

  addUsersToLocal(dataRec);
  localStorage.setItem("userInformation", JSON.stringify(userInfo));
  window.location.href = "/overview.html";
});
