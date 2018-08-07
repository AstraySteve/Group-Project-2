//js script for profile page
$(function(){
    //set up correct buttons
    console.log($("#teamName").text());
    //console.log("hello World");

    if ($("#teamName").text() == ""){
        $("#createTeam").show();
    }
    else{
        $("#manageTeam").show();
        $("#deleteTeam").show();
    }

    $("#logout").on("click", function(){
        window.location.replace("/logout");
    });

    /*Not working, to be implemented in future updates
    $("#deleteAccount").on("click", function(){
        console.log($(this).data('name'));
        var userName = $(this).data('name');
        userName.replace(" ", "%20");
        $.ajax({
            method: "DELETE",
            url: `/api/users/${userName}`,
        }).then(data=>{
            console.log(data);
            window.location.replace("/logout");    
        });
    });*/
});
