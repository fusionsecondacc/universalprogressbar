var menu = 0
var value = 0;
var time = Date.now()
var incr = 0.000001;


var coal = 100;
var gold = 0;
var crystals = 0;

var coalIncrease = 1;
var goldIncrease = 1;
var miningSpeed = 1;

var coalBuyAmount = 10;
var goldBuyAmount = 10;
var crystalUpgradeACost = 1;
var crystalUpgradeBCost = 1;
var crystalUpgradeCCost = 10;


var coalOdds = 70;
var goldOdds = 90;

// Text Indicators
var crystalText = document.getElementById("crystalText")
var coalText = document.getElementById("coalText") 
var goldText = document.getElementById("goldText") 
var statusText = document.getElementById("status")
var progressBar = document.getElementById("progressBar")
var aboutText = document.getElementById("aboutText")

// Variable Amounts
var crystalsAmount = document.getElementById("crystals")
var coalAmount = document.getElementById("coal")
var goldAmount = document.getElementById("gold")
var coalChance = document.getElementById("coalChance")
var goldChance = document.getElementById("goldChance")
var coalCost = document.getElementById("coalCost")
var goldCost = document.getElementById("goldCost")
var progressNum = document.getElementById("progressNum")
var progressDiv = document.getElementById("progressDiv")
var crystalUpgradeAText = document.getElementById("crystalUpgradeACost")
var crystalUpgradeBText = document.getElementById("crystalUpgradeBCost")
var crystalUpgradeCText = document.getElementById("crystalUpgradeCCost")
var extraCrystals = document.getElementById("extraCrystals")

//Buttons
var coalButton = document.getElementById("coalButton")
var goldButton = document.getElementById("goldButton")
var crystallizeButton = document.getElementById("crystallize")
var homeButton = document.getElementById("homeButton")
var crystalShopButton = document.getElementById("crystalShopButton")
var aboutButton = document.getElementById("aboutButton")
var allButtons = document.getElementById("center-button")
var crystalUpgradeA = document.getElementById("crystalUpgradeA")
var crystalUpgradeB = document.getElementById("crystalUpgradeB")
var crystalUpgradeC = document.getElementById("crystalUpgradeC")

//Group Divs
var allObj = document.getElementById("all")
var menu = document.getElementById("menu")
var crystalShop = document.getElementById("crystalShop")


var updateProgress = setInterval(function() {
    progressBar.value = value; 
	progressNum.innerText = value;
    value = Math.round((value + incr) * 1e12) / 1e12;}, miningSpeed * 1000)

var mineOre = function()
{
    updateCookies()
	alert(decodeURIComponent(document.cookie))
	statusText.style = "display:block"
	var randNum = Math.round(Math.random() * 100)
	
    if(randNum < coalOdds)
    {
    statusText.innerText = "[TIME_ELAPSED_"+ Math.round((Date.now() - time)/1000) + "] " + "You found nothing.\n" + statusText.innerText
    } else if (randNum < goldOdds)
    {
    coalText.style = "opacity:1"
    goldText.style = "opacity:1"
    var coalRand = Math.round(Math.random()*3)+1
    statusText.innerText = "[TIME_ELAPSED_"+ Math.round((Date.now() - time)/1000) + "] " + "You found " + coalRand *coalIncrease +  " coal.\n" + statusText.innerText
    coal += coalRand*coalIncrease;
    
    } else {
    coalText.style = "opacity:1"
    goldText.style = "opacity:1"
    statusText.innerText = "[TIME_ELAPSED_"+ Math.round((Date.now() - time)/1000) + "] " + "You found " + goldIncrease + " gold.\n"+ statusText.innerText
    gold += goldIncrease;
    }

    updateValues()
    updateButtons()  
}

var crystalUpgrade = function(upgrade)
{
    switch(upgrade)
    {
        case 0:
            crystals -= crystalUpgradeACost
            coalIncrease *= 2
            crystalUpgradeACost = Math.round(crystalUpgradeACost * 10)
            break;
        case 1:
            crystals -= crystalUpgradeBCost
            goldIncrease *= 2
            crystalUpgradeBCost = Math.round(crystalUpgradeBCost * 10)
            break;
        case 2:
            crystals -= crystalUpgradeCCost
            miningSpeed *= 2
            crystalUpgradeCCost = Math.round(crystalUpgradeCCost * 10)
            break;
    }

    updateValues()
    updateButtons()
    
}

var calculateCrystals = function(coal)
{
    return Math.round((Math.pow((Math.log(coal/100)/Math.log(10)), 5)*30)+1)
}

var updateCookies = function()
{
    var d = new Date();
    var userData = ""
    d.setTime(d.getTime() + (300*24*60*60*1000)); //300 is number of days until expiration

    userData += value+";"+coal+";"+gold+";"+crystals+";"
    document.cookie = "username="+encodeURIComponent(userData) +"; domain=github.io; expires="+d.toUTCString()+ "; path=/";
}

var screenMenu = function(screen)
{
    switch(screen)
    {
        case 0:
            homeButton.disabled = true;
            crystalShopButton.disabled = false;
            aboutButton.disabled = false;
            aboutText.style = "display:none"
            allButtons.style = "display:block"
            statusText.style = "display:block"
            progressDiv.style = "display:inline"
            crystalShop.style = "display:none"
            break;
        case 1:
            homeButton.disabled = false;
            crystalShopButton.disabled = true;
            aboutButton.disabled = false;
            aboutText.style = "display:none"
            allButtons.style = "display:none"
            statusText.style = "display:none"
            progressDiv.style = "display:none"
            crystalShop.style = "display:block"
            break;
        case 2:
            homeButton.disabled = false;
            crystalShopButton.disabled = false;
            aboutButton.disabled = true;
            aboutText.style = "display:block"
            allButtons.style = "display:none"
            statusText.style = "display:none"
            progressDiv.style = "display:none"
            crystalShop.style = "display:none"
    }
}

var increaseCoalGain = function()
    {
        
        coal -= coalBuyAmount
        coalOdds = Math.round(coalOdds / 1.1)
        coalBuyAmount = Math.round(coalBuyAmount * 1.2)
        
        updateValues()
        updateButtons()
    }

var increaseGoldGain = function()
{
    
    gold -= goldBuyAmount
    var temp = goldOdds
    goldOdds = Math.round(((goldOdds-50) / 1.1)+50)
    coalOdds = coalOdds - (temp-goldOdds)
    goldBuyAmount = Math.round(goldBuyAmount * 1.2)

    updateValues()
    updateButtons()
    
}

var prestige = function()
{
    crystallizeButton.disabled = true
    fade(allObj)
}

var updateValues = function()
{
    //Variables
    coalAmount.innerText = coal
    goldAmount.innerText = gold
    crystalsAmount.innerText = crystals

    coalChance.innerText = (100 - coalOdds) - (100-goldOdds)
    goldChance.innerText = (100 - goldOdds)

    //Upgrades
    coalCost.innerText = coalBuyAmount
    goldCost.innerText = goldBuyAmount
    crystalUpgradeAText.innerText = crystalUpgradeACost
    crystalUpgradeBText.innerText = crystalUpgradeBCost 
    crystalUpgradeCText.innerText = crystalUpgradeCCost 

}

var updateButtons = function()
{
    if (coal >= coalBuyAmount){
        coalButton.style = "display:inline;"
        coalButton.disabled = false
    } else {
        coalButton.disabled = true
    }
    if (gold >= goldBuyAmount){
        goldButton.style = "display:inline;"
        goldButton.disabled = false
    } else {
        goldButton.disabled = true
    }

    if(crystals < crystalUpgradeACost)
    {
        crystalUpgradeA.disabled = true;
    } else {
        crystalUpgradeA.disabled = false;
    } 
    if(crystals < crystalUpgradeBCost)
    {
        crystalUpgradeB.disabled = true;
    } else {
        crystalUpgradeB.disabled = false;
    } 
    if(crystals < crystalUpgradeCCost)
    {
        crystalUpgradeC.disabled = true;
    } else {
        crystalUpgradeC.disabled = false;
    } 

    if(coal > 100)
        {
            crystallizeButton.style = "display:inline;background-color:fuchsia"
            crystallizeButton.disabled = false
            if(Math.round(calculateCrystals(coal)) >= 2)
            {
                extraCrystals.innerText = "For " +Math.round(calculateCrystals(coal)) + " crystals"
            }

        } else {
            crystallizeButton.disabled = true
        }


}


var crystalReset = function()
{
    crystals += Math.round(calculateCrystals(coal))
    coal = 0;
    time = Date.now()
    gold = 0;
    coalBuyAmount = 10;
    goldBuyAmount = 10;
    coalChance = 70
    goldChance = 90
    coalButton.disabled = true
    statusText.innerText = ""
    progressBar.value = value; 
    progressNum.innerText = value;
    crystalText.style = "opacity:1"
    value = 0
    menu.style = "opacity:1"
    screenMenu(0)

    updateValues()
    updateButtons()

}
            
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            element.style = "display:none"
            clearInterval(timer);
            crystalReset()
            unfade(element)
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}


function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
