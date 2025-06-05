

to put out backend system in a nut shell

 1: deliver bulk assets/slides/content (like a library once uploaded stays there, like netflix online videos archieve)

 2: user login logout register forget pass word , save preferences (this is a different table but i am not going from table to table)

 3: record user interactions

 4: record messages


 deliver assets -> auth -> record (messages and interactions)-

 90% of the mess is in -->deliver assets which has been moved to static (since managing this beast online using guis and authenticating was a night mare).

 10% are 2-3 tables which will be periodically downloaded to workshop (daily, 4 hours etc etc) and their final output /reports will be uploaded/produced  


 ---
 let me clerify tcode-objects array 
 This is an array of object with all the tcodes that we have in out "tcode" table.

 the structure of each tcode object is tcode-object->chapters->exercises->questions

so now if we share this tcode-objects array between worshop and ui (not db). 
the ui can make REST calls to server as tcode = "fbise9math" where chapter = 2 and exercise = "2.1" and this data should be in tcode table... ?? discuss 


//
we create TcodeObject

this has 
   cosnt tcodeObj = new TcodeObject("fbise9math"); 
   tcodeObj.description(...);
   const chapter1 =  tcodeObj.addChapter(1);

    const exercise1-1 = chapter1.addEx("1.1");
    exercise1-1.addQ()
    exercise1-1.addQ()
    exercise1-1.addQ()

finally export tcodeObj;//json

some thing like this    



How about 

tcodeObj.addChapter(1);
tcodeObj.chapters(1).addEx("1.1");
tcodeObj.chapters(1).addEx("1.1").addQ(...) 
tcodeObj.chapters(1).addEx("1.1").addQ(...) 
tcodeObj.chapters(1).addEx("1.1").addQ(...) 
tcodeObj.chapters(1).addEx("1.1").addQ(...) 
tcodeObj.chapters(1).addEx("1.1").addQ(...) 
tcodeObj.chapters(1).addEx("1.2"); 
tcodeObj.chapters(1).addEx("1.2").addQ(...) 
tcodeObj.chapters(1).addEx("1.2").addQ(...) 
tcodeObj.chapters(1).addEx("1.2").addQ(...) 
tcodeObj.chapters(1).addEx("1.3"); 
tcodeObj.chapters(1).addEx("1.4"); 



