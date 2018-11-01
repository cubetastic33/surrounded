allyTurn = true;
allyWins = false;
enemyWins = false;

allyPositions = [2, 11, 15, 24, 27, 31];
enemyPositions = [4, 7, 20, 22, 29, 34];

moveableTiles = {
  c1: [7, 2],
  c2: [1, 8, 3],
  c3: [2, 9, 4],
  c4: [3, 10, 5],
  c5: [4, 11, 6],
  c6: [5, 12],
  c7: [13, 8, 1],
  c8: [7, 14, 9, 2],
  c9: [8, 15, 10, 3],
  c10: [9, 16, 11, 4],
  c11: [10, 17, 12, 5],
  c12: [11, 18, 6],
  c13: [19, 14, 7],
  c14: [13, 20, 15, 8],
  c15: [14, 21, 16, 9],
  c16: [15, 22, 17, 10],
  c17: [16, 23, 18, 11],
  c18: [17, 24, 12],
  c19: [25, 20, 13],
  c20: [19, 26, 21, 14],
  c21: [20, 27, 22, 15],
  c22: [21, 28, 23, 16],
  c23: [22, 29, 24, 17],
  c24: [23, 30, 18],
  c25: [31, 26, 19],
  c26: [25, 32, 27, 20],
  c27: [26, 33, 28, 21],
  c28: [27, 34, 29, 22],
  c29: [28, 35, 30, 23],
  c30: [29, 36, 24],
  c31: [32, 25],
  c32: [31, 33, 26],
  c33: [32, 34, 27],
  c34: [33, 35, 28],
  c35: [34, 36, 29],
  c36: [35, 30]
}

$('.tile').click(function() {
  if ($(this).hasClass('ally') == true) {
    selectTile($(this).attr('id'));
  }
});

function selectTile(tileId) {
  if ((allyTurn == true) && ($('#'+tileId).hasClass('selected') == false) && (!$('.selected').length)) {
    $('#'+tileId).addClass('selected');
  } else if (allyTurn == true) {
    $('#'+tileId).removeClass('selected');
  }
}

$('.tile').click(function() {
  if ($(this).hasClass('empty')) {
    checkValidity($(this).attr('id'));
  }
});

function checkValidity(tileId) {
  if ($('.selected').length) {
    fromTile = $('.selected').attr('id');
    toTile = $('#'+tileId).attr('id').substr(1);
    if (moveableTiles[fromTile].includes(parseInt(toTile)) == true) {
      moveAllyTile(fromTile, toTile);
    }
  }
}

function moveAllyTile(fromTile, toTile) {
  $('#'+fromTile).attr('class', 'tile empty');
  allyPositions[allyPositions.indexOf(parseInt(fromTile.substr(1)))] = parseInt(toTile);
  $('#c'+toTile).attr('class', 'tile ally');
  allyTurn = false;
  $('.tile').each(function() {
    counter = 0;
    if ($(this).hasClass('empty') == false) {
      surroundingLocations = moveableTiles[$(this).attr('id')];
      for (var i = 0; i < surroundingLocations.length; i++) {
        if ($('#c' + surroundingLocations[i]).hasClass('empty') == false) {
          counter++;
        }
      }
      if ((counter == surroundingLocations.length) && ($(this).hasClass('enemy') == true)) {
        allyWins = true;
      } else if ((counter == surroundingLocations.length) && ($(this).hasClass('ally') == true)) {
        enemyWins = true;
      }
    }
  });
  if (allyWins == true) {
    startConfetti('#0D47A1');
    $('#paragraph').html('You Win!');
    $('#paragraph').addClass('blue-text text-darken-4');
    $('#paragraph').addClass('valign-wrapper');
    $('#paragraph').css({'font-size': '500%', 'height': '65vh'});
    $('html, body').animate({scrollTop: 0}, 'slow');
  } else if (enemyWins == true) {
    startConfetti('#F44336');
    $('#paragraph').html('&nbsp;&nbsp;&nbsp;I Win!');
    $('#paragraph').addClass('red-text');
    $('#paragraph').addClass('valign-wrapper');
    $('#paragraph').css({'font-size': '500%', 'height': '65vh'});
    $('html, body').animate({scrollTop: 0}, 'slow');
  } else {
    $.ajax({
      type: 'GET',
      url: '/enemyMove',
      data: {
        ally_positions: allyPositions,
        enemy_positions: enemyPositions
      },
      success: function(result) {
        console.log(result.enemyMove);
        moveEnemyTile(result.enemyMove[0], result.enemyMove[1]);
      }
    });
  }
}

function moveEnemyTile(moveFrom, moveTo) {
  //Move the enemy tile
  $('#c'+moveFrom).attr('class', 'tile empty');
  enemyPositions[enemyPositions.indexOf(parseInt(moveFrom))] = parseInt(moveTo);
  $('#c'+moveTo).attr('class', 'tile enemy');
  $('.tile').each(function() {
    counter = 0;
    if ($(this).hasClass('empty') == false) {
      surroundingLocations = moveableTiles[$(this).attr('id')];
      for (var i = 0; i < surroundingLocations.length; i++) {
        if ($('#c' + surroundingLocations[i]).hasClass('empty') == false) {
          counter++;
        }
      }
      if ((counter == surroundingLocations.length) && ($(this).hasClass('ally') == true)) {
        enemyWins = true;
      } else if ((counter == surroundingLocations.length) && ($(this).hasClass('enemy') == true)) {
        allyWins = true;
      }
    }
  });
  if (enemyWins == true) {
    startConfetti('#F44336');
    $('#paragraph').html('&nbsp;&nbsp;&nbsp;I Win!');
    $('#paragraph').addClass('red-text');
    $('#paragraph').addClass('valign-wrapper');
    $('#paragraph').css({'font-size': '500%', 'height': '65vh'});
    $('html, body').animate({scrollTop: 0}, 'slow');
  } else if (allyWins == true) {
    startConfetti('#0D47A1');
    $('#paragraph').html('You Win!');
    $('#paragraph').addClass('blue-text text-darken-4');
    $('#paragraph').addClass('valign-wrapper');
    $('#paragraph').css({'font-size': '500%', 'height': '65vh'});
    $('html, body').animate({scrollTop: 0}, 'slow');
  } else {
    allyTurn = true;
  }
}
