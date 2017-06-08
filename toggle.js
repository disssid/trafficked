var traffic,weather,crash;
$(function () {
$(document).ready(function () {
        $('.traffic').click(function (event) {
            if (this.checked) {
                $('.traffic').each(function () {
                    this.checked = true;
                    plotDetector();
                });
            } else {
                $('.traffic').each(function () {
                    this.checked = false;
                    toggleDetector();
                });
            }
        });

    $('.crash').click(function (event) {
            if (this.checked) {
                $('.crash').each(function () {
                    this.checked = true;
                    plotCrashes();
                });
            } else {
                $('.crash').each(function () {
                    this.checked = false;
                    toggleCrashes();
                });
            }
        });
    $('.heat').click(function (event) {
            if (this.checked) {
            	$('.heat').each(function () {
                    this.checked = true;
                    plotHeatMap();
                });
            } else {
                $('.heat').each(function () {
                    this.checked = false;
                    toggleHeatMap();
                });
            }
            console.log("Crash: " +this.checked);
        });

    });
/*
var select_all = document.getElementById("select_all"); //select all checkbox
var checkboxes = document.getElementsByClassName("box"); //checkbox items

select_all.addEventListener("change", function(e){
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = select_all.checked;
    }
});


for (var i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i]);
    checkboxes[i].addEventListener('change', function(e){ //".checkbox" change
        //uncheck "select all", if one of the listed checkbox item is unchecked
        if(this.checked == false){
            select_all.checked = false;
            console.log(this.checked);
        }
        //check "select all" if all checkbox items are checked
        if(document.querySelectorAll('.box:checked').length == checkboxes.length){
            select_all.checked = true;
        }
    });
}*/

})