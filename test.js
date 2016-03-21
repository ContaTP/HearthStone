// test js
var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();
var zone_change_count = 0;
var player_id = 0;
var oppose_id = 0;
var friendly_hand = [];
var opposing_deck = [];

// monitor zone change
logWatcher.on('zone-change', function (data) {
  // hero
  // player_id : FRIENDLY
  // oppose_id : OPPOSING
  if(data.toZone === 'PLAY (Hero)'){
    if (data.toTeam === 'FRIENDLY') player_id = data.playerId;
    else oppose_id = data.playerId;
    console.log('player_id' + player_id);
  }
  // player's card on hand
  else if(data.toZone = 'HAND'){
    if (zone_change_count <= 4){

    }
  }
  if(data.playerId === player_id){
    // add card to hand
    if(data.toZone === 'HAND'){
      friendly_hand.push(data.cardId);
    }
    //move card to deck
    if(data.toZone === 'DECK'){
      var index = friendly_hand.indexOf(data.cardId);
      friendly_hand.splice(index, 1);
    }
  }
  if(player_id === 2){
    // add card to deck
    if(data.toZone === 'DECK'){
       opposing_deck.push(data.cardId);
    }
    // remove card from deck when moving to graveyard
    if(data.toZone === 'GRAVEYARD'){
       var index = opposing_deck.indexOf(data.cardId);
       opposing_deck.splice(index, 1);
    }
  }
  console.log(data);
  //console.log(data.cardName + ' has moved from ' + data.fromTeam + ' ' + data.fromZone + ' to ' + data.toTeam + ' ' + data.toZone);
  //console.log('opposing_deck' + opposing_deck);
  //console.log('hand' + friendly_hand);
});


logWatcher.on('game-over', function(players){
  console.log("Game Stopped!");
  console.log(players);
});


logWatcher.start();
