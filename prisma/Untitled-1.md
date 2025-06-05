
 

 ok final suggestion 
 we remove src/utils/restGenerator with 

 1: src/utils/restUtild // this has all the small functions we need for any rest related task
 2: Each router is a simple rest router (1 single file for each router) .each router export exectly waht it want.

 3: Fors testing and debugging we have a seperate adminMessage function in admin side and userMessage (maybe) for user api --- admin api is always in DEBUG mode and user api is never  
