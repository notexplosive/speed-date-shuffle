function calculateScore(playerPlay,datePlay,interrupt){
  let bonus:string[] = [];
  let factor = 1;
  if(playerPlay.value == 0){
    return {score:0,bonusLines:bonus,multiplier:1,val:0,col:false};
  }
  
  let colorMatch = isColorMatch(playerPlay.colors,datePlay.color);
  let valueMatch = calculateValueMatch(playerPlay.value,datePlay.value);
  
  let score = datePlay.value;
  if(colorMatch){
    bonus.push("Matching color! (x2)")
    factor *= 2;
  }
  
  if(valueMatch == 2){
    bonus.push("Value match! (x2)");
  }
  
  if(interrupt){
    bonus.push("INTERRUPTED! (x1/4)")
    factor *= 0.25;
  }
  
  if(valueMatch < 1){
    bonus = [];
    bonus.push("Too small! (x0)")
  }
  
  factor *= valueMatch;
  
  score *= factor;
  
  return {score:Math.floor(score),bonusLines:bonus,multiplier:factor,val:valueMatch,col:colorMatch};
}


function calculateValueMatch(v1,v2){
  if(v1 == v2){
    return 2;
  }
  if(v1 > v2){
    return 1;
  }
  if(v1 < v2){
    return 0;
  }
}

function isColorMatch(colorarray:string[], color){
  for(let c of colorarray){
    if(c == color){
      return true;
    }
  }
  return false;
}

function evaluateValueMatch(pool:Card[]){
  for(let i = 0; i < pool.length; i ++){
    if(pool[0].value != pool[i].value){
      return false;
    }
  }
  return true;
}

function determineColor(pool:Card[]){
  let zeroOverrideColor = "";
  for(let card of pool){
    if(card.value == 0){
      zeroOverrideColor += card.color + " ";
    }
  }
  if(zeroOverrideColor != ""){
    return zeroOverrideColor;
  }
  
  let colorvals = [];
  for(let i = 0; i < COLORS.length; i++){
    colorvals[i] = 0;
    for(let card of pool){
      if(card.color == COLORS[i]){
        colorvals[i] += card.value;
      }
    }
  }
  
  let max = 0;
  let color = "";
  for(let i = 0; i < COLORS.length; i++){
    let val = colorvals[i];
    if(val == max){
      color += " " + COLORS[i];
    }
    if(val > max){
      max = val;
      color = COLORS[i]
    }
  }
  
  return color;
}