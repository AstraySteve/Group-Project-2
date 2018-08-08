//js script for profile page
$(function(){
    console.log($("#username").text());
    var userID = $("#username").text();
    $(".manageTeam").on('click',function(){
        //console.log(`/teamCreate/${userID}`)
        window.location.replace(`/teamCreate/${userID}`);
    })
});