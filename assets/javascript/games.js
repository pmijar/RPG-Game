var v_myCharacterSelected = false;
var v_enemyCharacterSelected = false;
var v_characterCollections = [];
var myCharacterIndex = 0;
var enemyCharacterIndex = 0;
var enemySetupPoints = 0;
var winflag = false;

$(document).ready(function() {


    initializeCharacterImages();

    $(".myClass").on("click",function(){
        console.log("myClass Click Called......")
        var characterImage = $("<img>");
        console.log(this);
        characterImage.attr("src", ($(this).attr('src')));
        characterImage.attr("class","img-thumbnail rounded img-responsive myClass");

        if(!v_myCharacterSelected){
            v_myCharacterSelected = true;
            myCharacterIndex = $(this).attr("data-value");                     
            v_characterCollections[myCharacterIndex].myCharacterActive = v_myCharacterSelected;
            v_characterCollections[myCharacterIndex].setCharacterName(" You ");
            $("#myCharacter").append(characterImage);
            $(this).remove();
            $("#characterArray").text("Enemies available for attack");
           // alert("Character Selected : "+$(this).attr("data-value"));

        }
        else if(!v_enemyCharacterSelected){
            v_enemyCharacterSelected = true;
            enemyCharacterIndex = $(this).attr("data-value");
            v_characterCollections[enemyCharacterIndex].meEnemyCharacter = v_enemyCharacterSelected;
            v_characterCollections[enemyCharacterIndex].setCharacterName(" Defender ");
            enemySetupPoints = (enemyCharacterIndex*5)+9;
            $("#enemy").append(characterImage);  
            $(this).remove();  
          //  alert("Enemy Selected : "+$(this).attr("data-value")) ;
        }

    })


    $("#restart").on("click",function(){
        location.reload();
    })


    $("#attack").on("click", function(){
      v_characterCollections[myCharacterIndex].setupPointsInitial();
      v_characterCollections[enemyCharacterIndex].setupPointsInitial();

        //Is My Character selected

        if( v_myCharacterSelected){
            if(v_enemyCharacterSelected){
                if(v_characterCollections[myCharacterIndex].total_points <= 0 || v_characterCollections[enemyCharacterIndex].total_points <= 0 ){
                    if(v_characterCollections[myCharacterIndex].total_points < v_characterCollections[enemyCharacterIndex].total_points){
                        $("#Message").text("You LOST your fight against the enemy !!!");
                    }
                    else if(v_characterCollections[myCharacterIndex].total_points > v_characterCollections[enemyCharacterIndex].total_points){
                        $("#Message").text("You WON your fight against the enemy !!!");
                        $("#enemy").empty();
                        $("#EnemyScore").text("");
                        v_characterCollections[enemyCharacterIndex].meEnemyCharacter = false;
                        v_enemyCharacterSelected = false;
                    }
                    else{
                        $("#Message").text("It's a draw !!!");                       
                    }

                }
                else{
             
                    // My Character Point Reduction   
                    console.log("BEFORE total Points for My Character -> " + v_characterCollections[myCharacterIndex].total_points);
                    v_characterCollections[myCharacterIndex].enemyAttackPoints(v_characterCollections[enemyCharacterIndex].prev_attack_points);
                    console.log("AFTER total Points for My Character : " + v_characterCollections[myCharacterIndex].total_points);
                    $("#MyScore").text("Score : "+ v_characterCollections[myCharacterIndex].total_points);
                    $("#myCharacterMessage").text("You attacked "+v_characterCollections[enemyCharacterIndex].characterName+" with "+ v_characterCollections[myCharacterIndex].prev_attack_points+ " health points");

                    //Enemy Point Reduction
                    console.log("BEFORE total Points for Enemy Character -> " + v_characterCollections[enemyCharacterIndex].total_points);
                    v_characterCollections[enemyCharacterIndex].enemyAttackPoints(v_characterCollections[myCharacterIndex].prev_attack_points);
                    console.log("AFTER total Points for Enemy Character : " + v_characterCollections[enemyCharacterIndex].total_points);
                    $("#EnemyScore").text("Score : "+ v_characterCollections[enemyCharacterIndex].total_points);
                    $("#enemyCharacterMessage").text("Enemy attacked "+v_characterCollections[myCharacterIndex].characterName+" with "+ v_characterCollections[enemyCharacterIndex].prev_attack_points + " health points");
                } 
                }
           else{
                alert("Please select the enemy character !!!");
                }
        }
        else{
            alert("Please select the your character and enemy character!!!");
        }
    })



  })

  

  function initializeCharacterImages(){
    for (var i = 0; i < 3; i++ ){
        var characterImage = $("<img>");

        var characterPoints = 100+(10*i); // Total Character points when initalized
        characterImage.attr('src', './assets/images/Pic_'+i+'.jpg');
        characterImage.attr("class","img-thumbnail rounded img-responsive myClass");
        characterImage.attr("data-value", i);
       // characterImage.attr("title", $(this).attr("data-value") );
        //caption.text("Actor-" + $(this).attr("data-value"));

                    v_characterCollections[i] = {

                                total_points: 100,
                                set_points:0,
                                characterName:"",
                                prev_attack_points:0,
                            //  src:"",
                    
                                myCharacterActive:false,
                                meEnemyCharacter:false,
                    
                        // This function is used to intial set up of object computing variables
                      setupPointsInitial: function(){
                            if(this.meEnemyCharacter){
                                this.set_points = enemySetupPoints;
                            }
                            else if(this.myCharacterActive){
                                this.set_points += 8;  
                            }
                            else{
                                this.set_points = 0;
                            }
                            this.prev_attack_points = this.set_points;       
                        },

                        setCharacterName(name){
                            this.characterName = name;
                        },
                    
                        // This is what the points that enemy attacked me reduces my points
                        enemyAttackPoints: function(enemyPoints){
                            this.total_points-=enemyPoints;
                        },
                    
                        // This is what are points that enemy is attacked with (The point value differs if its an enemy or myCharacter)
                        myAttackPoints: function(){
                            if(this.myCharacterActive) {
                          //  this.prev_attack_points += Math.ceil((Math.random())*20);  
                            this.prev_attack_points += 8;                            
                            }
                            else if (this.meEnemyCharacter){
                                this.prev_attack_points = this.set_points;    
                            }
                        }
                    };

                    v_characterCollections[i].setupPointsInitial();     
                    v_characterCollections[i].total_points = characterPoints;
                    $("#characters").append(characterImage);      
        }
    }


function newEnemyPick(){
    v_enemyCharacterSelected = false;

}