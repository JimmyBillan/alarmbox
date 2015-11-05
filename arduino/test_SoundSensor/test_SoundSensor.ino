//Test du grove sound sensor


#define SOUND_SENSOR A0

void setup() 
{
    Serial.begin(9600);
    pinMode(SOUND_SENSOR, INPUT); 
}
 
void loop() 
{
        
	int s1 = analogRead(SOUND_SENSOR);
	        
	if(s1 > 370){

		Serial.print(" value : _  ");
		Serial.println(s1);
	}

	delay(100);
        
        
}
