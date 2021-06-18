//class forecast w/ date & description as parameters
class Forecast{
  constructor(date,description,lowTemp,highTemp){
    this.date = date;
    this.description = description;
    this.lowTemp=lowTemp;
    this.highTemp=highTemp;
  }
}

module.export={Forecast};