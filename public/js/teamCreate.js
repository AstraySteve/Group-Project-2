//js script for teamCreate page
$(function(){

    //Global variables
    var userID = $("#username").text();
    var teamName = $("#teamname").text();
    const maxCost = 30000000;

    //helper function to check if team has a name
    isTeam =()=>{
        if(teamName == ""){
            return false;
        }
        return true;
    }

    if(isTeam()){
        $("#editTeam").css({display:"none"});
    }

    //redirect button back to profile page
    $("#profile").on("click", function(){
        window.location.replace(`/profile/${userID}`);
    });

    //button to edit/ create team name
    $("#nameZone").on("click", "#editTeam", function(){
        console.log("edit team");
        $(this).css({
            display:"none"
        });
        $("#nameZone").append(`<input type='text' id="newTeamName" value="${teamName}"/>`);
        $("#nameZone").append(`<button class="btn btn-sm" id="submitName"> Submit </button>`);
    });

    //helper function
    updateTeams=(inputVal)=>{
        $.ajax({
            method: "PUT",
            url: `/api/teams/${teamName}`,
            data: {
                teamname: inputVal,
            }
        }).then(function(response){
            if(response){
                $.ajax({
                    method: "PUT",
                    url: `/api/hockey/${teamName}`,
                    data:{
                        belongTo: inputVal
                    }
                }).then(function(response){
                    if(response){
                        location.reload();
                    }
                });
            }
        }); 
    }
    $("#nameZone").on("click", "#submitName", function(){
        //console.log("submit team");
        var inputVal = $(this).parent().find("input").val();
        //console.log(inputVal);
        $.ajax({
            method: "GET",
            url: `/api/teams/${inputVal}`
        }).then(function(response){
            if(response == null){
                //team can be created
                if(isTeam()){
                    //if it is just editing team name
                    //console.log(`/api/teams/${teamName}`);
                    updateTeams(inputVal);
                }
                else{
                    //create new team
                    $.ajax({
                        method: "POST",
                        url: "/api/teams",
                        data: {
                            teamname: inputVal,
                            teamowner: userID
                        }
                    }).then(function(response){
                        if(response){
                            location.reload();
                        }
                    })
                }
            }
            else{
                //alert that team name already exists
                alert(`Team Name ${inputVal} is Taken`);
            }
        });
    })

    //remove player from team, updates database reload page
    $("#teamList").on("click",".remove", function(){
        console.log($(this).data('num'));
        var id = $(this).data('num');
        $.ajax({
            method: "PUT",
            url: `/api/hockey/${id}`,
            data: {
                isDrafted: false,
                belongTo: null,
            }
        }).then(function(response){
            if(response){
                console.log(response);
                location.reload();
            }
        });
    });

    //add player to team, updates database, reload page
    $("#playerList").on("click", ".add", function(){
        //check if team has name
        if(isTeam()){
            //Check if there is space on team
            if(($("#teamTable").find('tr').length) < 6){
                console.log($(this).data('num'));
                var id = $(this).data('num');
                var cost = $(this).data('cost');
                var goals = $(this).data('goals');
                var assists = $(this).data('assists');
                var points = $(this).data('points');
                $.ajax({
                    method: "PUT",
                    url: `/api/hockey/${id}`,
                    data: {
                        isDrafted: true,
                        belongTo: $("#teamname").text(),
                    }
                }).then(function(response){
                    if(response){
                        location.reload();
                    }
                });
            }
            else{
                alert("Team is full, remove player(s) before drafting");
            }
        }
        else{
            alert("please create a team name first");
        }
    });
});