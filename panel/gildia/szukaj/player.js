const urlParams = new URLSearchParams(window.location.search);
const ignParam = urlParams.get("ign");

const svgLoaderDiv = document.getElementById("preloader");
const dataIgn = document.getElementById("data-ign");
const daneDla = dataIgn.parentElement;

$("#right-mask").delay(200).hide(1500);

function ready() {
  $(svgLoaderDiv).hide(800);
  $(document.getElementsByClassName("wbg")[0]).slideDown("slow", function () {
    $(document.getElementsByClassName("card-body")[0]).slideDown("slow");
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// const userImage = document.getElementById("user-image");
// userImage.src = `https://minotar.net/helm/${ignParam}/64.png`;

// fetch(`https://api.mojang.com/users/profiles/minecraft/${ignParam}`)
// .then((data) => {
//     let name = JSON.parse(data).name;
//     if (name == ignParam.toLowerCase()) {
//         console.log("even");
//     }
// });

$(document).ready(function () {
  $.getJSON(
    `http://jsanchog-api.herokuapp.com/player?ign=${ignParam}`,
    function (data) {
      let name = data.ign;
      let uuid = data.uuid;
      if (name.toLowerCase() == ignParam.toLowerCase()) {
        dataIgn.innerText = name;
      } else {
      }
      let cuteName = data.skyblock.currentProfile.cute_name;
      console.log(`Profile Name: ${cuteName}`);
      $(document).ready(function () {
        $.getJSON(
          `https://sky.shiiyu.moe/api/v2/dungeons/${name}/${cuteName}`,
          function (data) {
            let cataLevel =
              data.dungeons.catacombs.level.levelWithProgress.toFixed(2);
            let healerLevel =
              data.dungeons.classes.healer.experience.levelWithProgress;
            let mageLevel =
              data.dungeons.classes.mage.experience.levelWithProgress;
            let berserkLevel =
              data.dungeons.classes.berserk.experience.levelWithProgress;
            let archerLevel =
              data.dungeons.classes.archer.experience.levelWithProgress;
            let tankLevel =
              data.dungeons.classes.tank.experience.levelWithProgress;
            document.getElementById("cata-level").innerText = cataLevel;
            document.getElementById("healer-level").innerText =
              healerLevel.toFixed(2);
            healerProgress = Number(
              (healerLevel - Math.trunc(healerLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "healerProgress"
            ).style.width = `${healerProgress}%`;

            document.getElementById("mage-level").innerText =
              mageLevel.toFixed(2);
            mageProgress = Number(
              (mageLevel - Math.trunc(mageLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "mageProgress"
            ).style.width = `${mageProgress}%`;

            document.getElementById("berserk-level").innerText =
              berserkLevel.toFixed(2);
            berserkProgress = Number(
              (berserkLevel - Math.trunc(berserkLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "berserkProgress"
            ).style.width = `${berserkProgress}%`;

            document.getElementById("archer-level").innerText =
              archerLevel.toFixed(2);
            archerProgress = Number(
              (archerLevel - Math.trunc(archerLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "archerProgress"
            ).style.width = `${archerProgress}%`;

            document.getElementById("tank-level").innerText =
              tankLevel.toFixed(2);
            tankProgress = Number(
              (tankLevel - Math.trunc(tankLevel)).toFixed(2) * 100
            );
            document.getElementById(
              "tankProgress"
            ).style.width = `${tankProgress}%`;
            ready();
          }
        );
      });
    }
  );
});
