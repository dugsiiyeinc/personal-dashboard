let userInformation = JSON.parse(localStorage.getItem("userInformation"));
let users = JSON.parse(localStorage.getItem("users"));

if (!userInformation) {
  window.location.href = "/index.html";
}

const ProfileUrl = document.querySelector("#settings_profileUrl");
const oldPassword = document.querySelector("#setting_old");
const newPassword = document.querySelector("#setting_new");
const comPassword = document.querySelector("#setting_confirm");
const setingsProfile = document.querySelector("#setings_profile");
const changeForm = document.querySelector("#setings_password");

const updateProfile = function (url) {
  const checkPhoto = url.find((search) => search.id === userInformation.userId);
  const deleteFil = url.filter(
    (search) => search.id !== userInformation.userId
  );
  console.log("update user ", checkPhoto);

  console.log("remove update user", deleteFil);

  const dataRec = {
    id: checkPhoto.id,
    fullName: checkPhoto.fullName,
    username: checkPhoto.username,
    password: checkPhoto.password,
    photo: ProfileUrl.value,
  };

  const userInfo = {
    userId: dataRec.id,
    username: dataRec.username,
    name: dataRec.fullName,
    photo: dataRec.photo,
  };

  localStorage.setItem("users", JSON.stringify(deleteFil));
  users = JSON.parse(localStorage.getItem("users"));
  console.log(dataRec);
  users.push(dataRec);
  localStorage.setItem("userInformation", JSON.stringify(userInfo));
  localStorage.setItem("users", JSON.stringify(users));
  alert("Profile Picture Changed");
  ProfileUrl.value = "";

  window.location.href = "/overview.html";
};

const updatePassword = function (url) {
  if (newPassword.value !== comPassword.value) {
    alert("Password dosen't match");
    return;
  }

  if (
    newPassword.value.length < 8 ||
    comPassword.value.length < 8 ||
    oldPassword.value.length < 8
  ) {
    alert("Password Must Be 8 Characters");
    return;
  }

  const oldPass = url.find((search) => search.id === userInformation.userId);
  const removePassword = url.filter(
    (search) => search.id !== userInformation.userId
  );

  console.log(oldPass.password);

  if (oldPassword.value !== oldPass.password) {
    alert("Invaled Old password");
    return;
  }

  const dataRec = {
    id: oldPass.id,
    fullName: oldPass.fullName,
    username: oldPass.username,
    password: newPassword.value,
    photo: oldPass.photo,
  };

  localStorage.setItem("users", JSON.stringify(removePassword));
  users = JSON.parse(localStorage.getItem("users"));
  users.push(dataRec);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Password Changed");
  newPassword.value = "";
  oldPasswordPassword.value = "";
  comPassword.value = "";

  window.location.href = "/overview.html";
};

setingsProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  updateProfile(users);
});

changeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updatePassword(users);
});
