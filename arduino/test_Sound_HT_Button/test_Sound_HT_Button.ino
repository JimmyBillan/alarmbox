//test de la librairie DHT (capteur temperature humidité)
//test du bouton
//test de la communication par serial

#include "DHT.h"

#define DHTPIN A0 
#define SOUND_SENSOR A1

#define DHTTYPE DHT11 // Type de capteur utilisé (librairie utilisé pour plusieurs capteurs)

DHT dht(DHTPIN, DHTTYPE);

const int pinButton = 3;
//int buttonState = d0;

void setup()
{
    Serial.begin(9600);
    Serial.println("DHTxx test!");
    
    pinMode(pinButton, INPUT);
    pinMode(SOUND_SENSOR, INPUT); 
 //   dht.begin();
}

void loop()
{
    //Lecture des valeurs = 250ms
    //float h = dht.readHumidity();
    //float t = dht.readTemperature();
    int sensorValue = analogRead(SOUND_SENSOR);
    

    
  /*  if (isnan(t) || isnan(h))
    {
        Serial.println("Error DHT");
    }
    else
    {*/
     
        Serial.print("{Humidity:");
      //  Serial.print(h);
        Serial.print(",");
        Serial.print("Temperature:");
       // Serial.print(t);
        Serial.print(",");
        Serial.print("Sound:");
        Serial.print(sensorValue);
        Serial.println("");
     
       
  //  }
    

    /*
    buttonState = digitalRead(pinButton);   
    if( buttonState == HIGH){
        Serial.println("on");
        buttonState = 1;
    }else{
         Serial.println("off");
    }*/
}
