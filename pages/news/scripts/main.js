import { getEmployees } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access();

allUtils.sideMenu();
allUtils.notes();
allUtils.handlePageByCustomLink(document.querySelector(".newNews"));

//employees' birthdays
getEmployees()
  .then((json) => {
    let birthdaysList = [];

    for (let i = 0; i < json.length; i++) {
      let currentDate = new Date().getMonth() + 1;

      let birthdayDate = new Date(json[i].birthday).getMonth() + 1;

      if (currentDate == birthdayDate) {
        birthdaysList.push(json[i]);
      }
    }

    showBirthdays(birthdaysList);
  });

function showBirthdays(json) {
  let monthBirthdays = document.getElementById("display");
  if (json.length == 0) {
    monthBirthdays.innerText = "Nenhum aniversariante este mês";
  } else {
    monthBirthdays.innerText = "Aniversariantes do mês";
  }

  for (let i = 0; i < json.length; i++) {
    let employeePhoto = json[i].employeephotoname;
    let employeeName =
      json[i].name.split(" ")[0] +
      " " +
      json[i].name.split(" ")[json[i].name.split(" ").length - 1];
    let employeeBirthday = json[i].birthday;

    let imgEmployee = document.createElement("img");
    imgEmployee.src = `https:/employees-api-oite.onrender.com/employees/photo/${employeePhoto}`;

    document.getElementsByClassName("bDayImgs")[0].appendChild(imgEmployee);

    let formattedBirthday = employeeBirthday
      .split("-")
      .reverse()
      .join("/")
      .slice(0, 5);

    let birthdayDetails = document.createElement("li");
    birthdayDetails.innerText = `${employeeName} - ${formattedBirthday}`;

    document.getElementById("ulElement").appendChild(birthdayDetails);
  }
}

// news list
fetch("https://employees-api-oite.onrender.com/news", {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    let newsList = [];

    for (let i = 0; i < json.length; i++) {
      let currentDate = new Date();

      let newsExpirationDate = new Date(json[i].expirationdate);

      if (currentDate > newsExpirationDate) {
        fetch(`https://employees-api-oite.onrender.com/news/${json[i].id}`, {
          method: "DELETE",
        });
      } else {
        newsList.push(json[i]);
      }
    }

    list(newsList);
  });

// news delete
function list(json) {
  document.getElementById("noticias-container").innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    let newsTitle = json[i].title;
    let newsDescription = json[i].description;
    let newsImg = json[i].bannerfilename;
    let newsID = json[i].id;

    let title = document.createElement("h2");
    title.innerText = newsTitle;

    let description = document.createElement("p");
    description.innerText = newsDescription;

    let divNewsText = document.createElement("div");
    divNewsText.className = "newsText";

    divNewsText.appendChild(title);
    divNewsText.appendChild(description);

    let divNewsImg = document.createElement("div");
    divNewsImg.className = "newsImg loading";

    let imgNews = document.createElement("img");
    imgNews.src = `https://employees-api-oite.onrender.com/news/bannerFile/${newsImg}`;
    imgNews.alt = "Imagem da notícia";

    divNewsImg.appendChild(imgNews);

    let newsBtn = document.createElement("button");
    newsBtn.type = "button";

    newsBtn.setAttribute("data-id", newsID);
    newsBtn.innerText = "Deletar";
    newsBtn.addEventListener("click", (event) => {
      let btnID = event.target.getAttribute("data-id");

      let warning = confirm("Você realmente deseja excluir a notícia?");

      if (!warning) return;

      fetch(`https://employees-api-oite.onrender.com/news/${btnID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
        },
      }).then(() => {
        window.location.reload();
      });
    });

    let divNewsContent = document.createElement("div");
    divNewsContent.className = "newsContent";

    divNewsText.appendChild(newsBtn);
    divNewsContent.appendChild(divNewsText);
    divNewsContent.appendChild(divNewsImg);

    document.getElementById("news").appendChild(divNewsContent);

    //loading
    document.getElementById("noticias-container").innerHTML = "";

    imgNews.onload = function () {
      divNewsImg.classList.remove("loading");
    };
  }
}
