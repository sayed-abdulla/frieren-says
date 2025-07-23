$(document).ready(function(){

    //variables
    var userPatterenEntered = [];
    var gamePatterenEntered = [];

    loadGame();

    function loadGame(){
        $(".body-div").hide();
        $("#start-button").show();

    }
    $("#start-button").click(async function(e){
 
        $("#gamePat").html(gamePatterenEntered);
        $(".body-div").show();
        $(this).hide();
        await delay(1200);
     
        await nextNumber();

    })

   
    
    async function nextNumber(){
        
       let rando = Math.floor(Math.random()*4) +1;
        let clickedClass = "";
       if(rando==1){
        clickedClass = "1";
       }else if(rando==2){
        clickedClass = "2";
       }
    else if(rando==3){
        clickedClass = "3";
    }
    else if(rando==4){
        clickedClass = "4";
    }
    

    let audio = await new Audio(`./sounds/sound${clickedClass}.mov`);
   // Play the sound
  
   $(`.item-${clickedClass}`).fadeOut().fadeIn();
       gamePatterenEntered.push(rando);
       audio.play();
    }

    $(".item").hover(function(){
       $(this).animate({
        opacity:0.5,
        width:"155px",
        height:"155px"
        
       });
    }   , function() {
        $(this).animate({
         opacity: 1,
         width:"150px",
        height:"150px"
        });
    }
    );
    $(".item")

 

    $(".item").click(async function(){
        // Create a new Audio object
    let person = "";
    if($(this).hasClass("item-1")){
        person ="sound1";
        userPatterenEntered.push(1);
    }else if($(this).hasClass("item-2")){
        person ="sound2";
        userPatterenEntered.push(2);
    }else if($(this).hasClass("item-3")){
        person ="sound3";
        userPatterenEntered.push(3);

    }
    else if($(this).hasClass("item-4")){
        person ="sound4";
        userPatterenEntered.push(4);

    }
   audio = await new Audio(`./sounds/${person}.mov`);
    // Play the sound
     
        $(this).fadeOut().fadeIn();
        $("#userPat").html(userPatterenEntered);
        audio.play();
        await delay(1400);
        checkRound();
    });
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }
    
    async function checkRound(){
        $("#gamePat").html(gamePatterenEntered);
        $("#userPat").html(userPatterenEntered);
        if(userPatterenEntered.length === gamePatterenEntered.length){
            
            if(!arraysEqual(userPatterenEntered, gamePatterenEntered)){
                audio = await new Audio(`./sounds/sound-wrong.mov`);
                // Play the sound
                audio.play();
                userPatterenEntered = [];
                gamePatterenEntered = [];
                $("#userPat").html(userPatterenEntered);
                $(".center-circle").text(`${gamePatterenEntered.length}`);
                $("#gamePat").html(gamePatterenEntered);
      

                loadGame();

            }else{
                $(".center-circle").text(`${gamePatterenEntered.length}`);
                $(".center-circle").animate({
                    width: "90px",
                    height: "90px"
                }).animate({
                    width: "80px",
                    height: "80px"
                });
                
                nextNumber();
            }
            userPatterenEntered = [];
            $("#userPat").html(userPatterenEntered);

        }else{
       
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

});