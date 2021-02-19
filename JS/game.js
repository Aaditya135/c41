class Game{

    constructor(){
    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",(data) => {
            gameState = data.val()
        })
    }

    update(state){
        database.ref('/').update({
            gameState: state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val()
                player.getCount()
            }
            form = new Form()
            form.display()
        }

        car1 = createSprite(100,200)
        car1.addImage(carImg1)
        car2 = createSprite(300,200)
        car2.addImage(carImg2)
        car3 = createSprite(500,200)
        car3.addImage(carImg3)
        car4 = createSprite(700,200)
        car4.addImage(carImg4)
        cars = [car1,car2,car3,car4]
        reachedFinishedPoint = false;
    }

        play(){
            form.hide()
            //text("Game Started",120,100)
            Player.getPlayerInfo()
            player.getFinishedPlayers()
            console.log("INitial Finished Players Are" + finishedPlayers)
            if(allPlayers !== undefined){
                //var displayPosition = 130
                background(98)
                image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
                var index = 0;
                var x  = 175;
                var y;
                for(var plr in allPlayers){
                    index = index + 1
                    x = x + 200
                    y = displayHeight - allPlayers[plr].distance
                    cars[index - 1].x = x
                    cars[index - 1].y = y
                    if(index === player.index){
                        stroke(10)
                        fill("yellow")
                        ellipse(x,y,80,80)
                        camera.position.x = displayWidth/2
                        camera.position.y = cars[index - 1].y
                    }

                    textSize(15)
                    fill("green")
                    textAlign(CENTER)
                    text(allPlayers[plr].name,cars[index - 1].x,cars[index - 1].y + 75)

                }
            }

            if(keyDown(UP_ARROW) && player.index != null && reachedFinishedPoint != true){
                player.distance += 10
                player.update()
            }

            if(player.distance > 3700 && reachedFinishedPoint === false){
                console.log("Calling Update Finshed Players")
                Player.updateFinishedPlayers()
                player.rank = finishedPlayers;
                player.update()
                reachedFinishedPoint = true;
            }

            drawSprites()

        }

        displayRank(){

            camera.position.x = 0
            camera.position.y = 0
            Player.getPlayerInfo()

            imageMode(CENTER)
            image(bronzeMedal,-displayWidth/4,displayHeight/9 - 100,200,240)
            image(silverMedal,displayWidth/4,displayHeight/10 - 100,220,270)
            image(goldMedal,0,-100,250,300)

            textAlign(CENTER)
            textSize(40)
            fill("yellow")

            for(var plr in allPlayers){

                if(allPlayers[plr].rank === 1){
                    text("1st : " + allPlayers[plr].name,0,85)
                }
                else if(allPlayers[plr].rank === 2){
                    text("2nd : " + allPlayers[plr].name,displayWidth/4,displayHeight/10 + 75)
                }
                else if(allPlayers[plr].rank === 3){
                    text("3rd : " + allPlayers[plr].name,-displayWidth/4,displayHeight/9 + 75)
                }
                else{
                    textSize(25)
                    text("better luck next time : " + allPlayers[plr].name,0,225)
                }

            }

        }
} 
