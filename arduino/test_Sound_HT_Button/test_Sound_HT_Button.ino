#include <MMA7660.h>

//test de la librairie DHT (capteur temperature humidité)
//test du bouton
//test de la communication par serial
#include <stdio.h>
#include <stdlib.h>

#include "DHT.h"
#include <Wire.h>
#include "MMA7660.h"
MMA7660 accelemeter;

#define DHTPIN A0 
#define SOUND_SENSOR A1

#define DHTTYPE DHT11 // Type de capteur utilisé (librairie utilisé pour plusieurs capteurs)

DHT dht(DHTPIN, DHTTYPE);

const int pinButton = 3;
int buttonState = 0;

long t1;
const long delay1 = 5000;

long t2;
const int delay2 = 50;

int incomingByte = 0;

boolean halteAuGrabuge = false;


int8_t x0 = 89;
int8_t y0 = 15;
int8_t z0 = 12;


int8_t x1;
int8_t y1;
int8_t z1;

void setup()
{
    Serial.begin(9600);
    t1 = millis();
    pinMode(pinButton, INPUT);
    dht.begin();
    accelemeter.init();
    buttonState = digitalRead(pinButton);  
}

void loop()
{
  if(millis() - t1 > delay1 && !halteAuGrabuge){
          
      float h = dht.readHumidity();
      float t = dht.readTemperature();
          
      if (isnan(t) || isnan(h))
      {
          Serial.println("Error DHT");
      }
      else
      {
          Serial.print(F("{H:"));
          Serial.print(h);
          Serial.print(F(",T"));
          Serial.print(t);
          Serial.println(F("}"));
     }
     t1 = millis(); 
  }
    
    
    
    if( buttonState == HIGH){
        Serial.println("click");
        buttonState = 1;
    }
    
    if (Serial.available() > 0) {
          incomingByte = Serial.read();
          
          if(incomingByte == 48){
            Serial.println(F("alarm"));
            halteAuGrabuge = true;
          }   
    }
    
    if(millis() - t2 > delay2){
        
       // accelemeter.getXYZ(&x1,&y1,&z1);
        Serial.println(abs(x0 - x1) + abs(y0 - y1) + abs(z0 - z1));
        
        x0 = x1;
        y0 = y1; 
        z0 = z1;
        
	

      t2 = millis();
    }
    
    
}


