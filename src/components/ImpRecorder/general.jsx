const getBrowserName = () => {
let i, os;
var geckobrowsers;
var browser = "";
var browserVersion = 0;
var agent = navigator.userAgent + " ";
if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "5.0" && agent.indexOf("like Gecko") != -1){
    geckobrowsers = agent.substring(agent.indexOf("like Gecko")+10).substring(agent.substring(agent.indexOf("like Gecko")+10).indexOf(") ")+2).replace("LG Browser", "LGBrowser").replace("360SE", "360SE/");
    for(i = 0; i < 1; i++){
        geckobrowsers = geckobrowsers.replace(geckobrowsers.substring(geckobrowsers.indexOf("("), geckobrowsers.indexOf(")")+1), "");
    }
    geckobrowsers = geckobrowsers.split(" ");
    for(i = 0; i < geckobrowsers.length; i++){
        if(geckobrowsers[i].indexOf("/") == -1)geckobrowsers[i] = "Chrome";
        if(geckobrowsers[i].indexOf("/") != -1)geckobrowsers[i] = geckobrowsers[i].substring(0, geckobrowsers[i].indexOf("/"));
    }
    if(geckobrowsers.length < 4){
        browser = geckobrowsers[0];
    } else {
        for(i = 0; i < geckobrowsers.length; i++){
            if(geckobrowsers[i].indexOf("Chrome") == -1 && geckobrowsers[i].indexOf("Safari") == -1 && geckobrowsers[i].indexOf("Mobile") == -1 && geckobrowsers[i].indexOf("Version") == -1)browser = geckobrowsers[i];
        }
    }
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "5.0" && agent.indexOf("Gecko/") != -1){
    browser = agent.substring(agent.substring(agent.indexOf("Gecko/")+6).indexOf(" ") + agent.indexOf("Gecko/")+6).substring(0, agent.substring(agent.substring(agent.indexOf("Gecko/")+6).indexOf(" ") + agent.indexOf("Gecko/")+6).indexOf("/"));
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "5.0" && agent.indexOf("Clecko/") != -1){
    browser = agent.substring(agent.substring(agent.indexOf("Clecko/")+7).indexOf(" ") + agent.indexOf("Clecko/")+7).substring(0, agent.substring(agent.substring(agent.indexOf("Clecko/")+7).indexOf(" ") + agent.indexOf("Clecko/")+7).indexOf("/"));
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "5.0"){
    browser = agent.substring(agent.indexOf("(")+1, agent.indexOf(";"));
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "4.0" && agent.indexOf(")")+1 == agent.length-1){
    browser = agent.substring(agent.indexOf("(")+1, agent.indexOf(")")).split("; ")[agent.substring(agent.indexOf("(")+1, agent.indexOf(")")).split("; ").length-1];
} else if(agent.substring(agent.indexOf("Mozilla/")+8, agent.indexOf(" ")) == "4.0" && agent.indexOf(")")+1 != agent.length-1){
    if(agent.substring(agent.indexOf(") ")+2).indexOf("/") != -1)browser = agent.substring(agent.indexOf(") ")+2, agent.indexOf(") ")+2+agent.substring(agent.indexOf(") ")+2).indexOf("/"));
    if(agent.substring(agent.indexOf(") ")+2).indexOf("/") == -1)browser = agent.substring(agent.indexOf(") ")+2, agent.indexOf(") ")+2+agent.substring(agent.indexOf(") ")+2).indexOf(" "));
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else if(agent.substring(0, 6) == "Opera/"){
    browser = "Opera";
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
    if(agent.substring(agent.indexOf("(")+1).indexOf(";") != -1)os = agent.substring(agent.indexOf("(")+1, agent.indexOf("(")+1+agent.substring(agent.indexOf("(")+1).indexOf(";"));
    if(agent.substring(agent.indexOf("(")+1).indexOf(";") == -1)os = agent.substring(agent.indexOf("(")+1, agent.indexOf("(")+1+agent.substring(agent.indexOf("(")+1).indexOf(")"));
} else if(agent.substring(0, agent.indexOf("/")) != "Mozilla" && agent.substring(0, agent.indexOf("/")) != "Opera"){
    browser = agent.substring(0, agent.indexOf("/"));
    browserVersion = agent.substring(agent.indexOf(browser)+browser.length+1, agent.indexOf(browser)+browser.length+1+agent.substring(agent.indexOf(browser)+browser.length+1).indexOf(" "));
} else {
    browser = agent;
}
return (browser + " v" + browserVersion);
}
module.exports.getBrowserName = getBrowserName ;
