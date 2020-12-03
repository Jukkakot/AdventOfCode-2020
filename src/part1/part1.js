const list = require('./list')

for(eka of list){
    for(toka of list){
        for(kolmas of list){
        if(eka + toka +kolmas === 2020){
            console.log("numerot on: ",eka,toka,kolmas)
            console.log("plussattuna on: ",eka+toka+kolmas)
            console.log("kerrottuna ne on ",eka*toka*kolmas)
            return
        }
        }
    }
}