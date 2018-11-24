var v_myCharacterSelected = false;
var v_enemyCharacterSelected = false;
var v_characterCollections = [];


$(document).ready(function() {
    var myCharacterIndex = 0;
    var enemyCharacterIndex = 0;

    initializeCharacterImages();

    $(".myClass").on("click",function(){
        var characterImage = $("<img>");
        var caption = $("<div>");
        console.log(this);
        characterImage.attr("src", ($(this).attr('src')));
        characterImage.attr("class","img-thumbnail rounded float-left img-responsive myClass");
        caption.text("Actor-" + $(this).attr("data-value"));

        if(!v_myCharacterSelected){
            v_myCharacterSelected = true;
            v_characterCollections[$(this).attr("data-value")].myCharacterActive = v_myCharacterSelected;
            myCharacterIndex = $(this).attr("data-value");
            $("#myCharacter").append(characterImage);
            $(this).remove();
            alert("Character Selected : "+$(this).attr("data-value"));

        }
        else if(!v_enemyCharacterSelected){
            v_enemyCharacterSelected = true;
            v_characterCollections[$(this).attr("data-value")].meEnemyCharacter = v_enemyCharacterSelected;
            enemyCharacterIndex = $(this).attr("data-value");
            $("#enemy").append(characterImage);  
            $(this).remove();  
            alert("Enemy Selected : "+$(this).attr("data-value")) ;
        }

    })

    $("#attack").on("click", function(){
        v_characterCollections[myCharacterIndex].setupPointsInitial();
        v_characterCollections[enemyCharacterIndex].setupPointsInitial();
        // My Character Point Reduction   
        console.log("BEFORE total Points for My Character -> " + v_characterCollections[myCharacterIndex].total_points);
        v_characterCollections[myCharacterIndex].enemyAttackPoints(v_characterCollections[enemyCharacterIndex].prev_attack_points);
        console.log("AFTER total Points for My Character : " + v_characterCollections[myCharacterIndex].total_points);

        //Enemy Point Reduction
        console.log("BEFORE total Points for Enemy Character -> " + v_characterCollections[enemyCharacterIndex].total_points);
        v_characterCollections[enemyCharacterIndex].enemyAttackPoints(v_characterCollections[myCharacterIndex].prev_attack_points);
        console.log("AFTER total Points for Enemy Character : " + v_characterCollections[enemyCharacterIndex].total_points);


    })



  })

  

  function initializeCharacterImages(){
    for (var i = 0; i < 3; i++ ){
        var characterImage = $("<img>");

        var characterPoints = 100+(10*i); // Total Character points when initalized
        characterImage.attr('src', './assets/images/Pic_'+i+'.jpg');
        characterImage.attr("class","img-thumbnail rounded float-left img-responsive myClass");
        characterImage.attr("data-value", i);
       // characterImage.attr("title", $(this).attr("data-value") );
        //caption.text("Actor-" + $(this).attr("data-value"));

        $("#characters").append(characterImage);
                    v_characterCollections[i] = {

                                total_points: 100,
                                set_points:0,
                                prev_attack_points:0,
                            //  src:"",
                    
                                myCharacterActive:false,
                                meEnemyCharacter:false,
                    
                        // This function is used to intial set up of object computing variables
                        setupPointsInitial: function(){
                            if(this.meEnemyCharacter){
                                this.set_points = (5*i)+10 ;
                            }
                            else if(this.myCharacterActive){
                                this.set_points += Math.ceil((Math.random())*20);  
                            }
                            else{
                                this.set_points = 0;
                            }
                            this.prev_attack_points = this.set_points;       
                        },
                    
                        // This is what the points that enemy attacked me reduces my points
                        enemyAttackPoints: function(enemyPoints){
                            this.total_points-=enemyPoints;
                        },
                    
                        // This is what are points that enemy is attacked with (The point value differs if its an enemy or myCharacter)
                        myAttackPoints: function(){
                            if(this.myCharacterActive) {
                            this.prev_attack_points += Math.ceil((Math.random())*20);  
                            }
                            else if (this.meEnemyCharacter){
                                this.prev_attack_points = this.set_points;    
                            }
                        }
                    };
                    v_characterCollections[i].setupPointsInitial();     
                    v_characterCollections[i].total_points = characterPoints;
        }
    }

