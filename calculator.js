class Script {
    preReviewContent;
    currentReviewContent;
    preOperation = [];
    currentOperation = "";

    constructor(preReviewContent , currentReviewContent){
        this.preReviewContent = preReviewContent;
        this.currentReviewContent = currentReviewContent;
    }
    
     addnumber(number){
        if(currentReviewContent.textContent == '.' && currentReviewContent.textContent.length < 0 ){
            return 
        }
       
        currentReviewContent.textContent += number;
        

     }
  // 더하기 
     addOperation(operation){
        console.log(operation)
        if(currentReviewContent.textContent.length > 0) {
        this.preOperation.push(operation)
        preReviewContent.textContent +=` ${currentReviewContent.textContent} ${operation}`
        currentReviewContent.textContent = "" } 

     }
    
     isequal() {
        if(preReviewContent.textContent.length > 0 && this.preOperation.length > 0 && currentReviewContent.textContent > 0  ){
            
            let result = 0 ;
            
            this.preOperation.map((operation , i) => {
                switch(operation){
                    case "+" : result = this.applyplus(  i , result ); break;
                    case "-" : result = this.applyminus( i , result  ); break;
                    case "x" : result = this.applymultiply( i , result); break;
                    case "%" : result = this.applydivide( i , result ); break;
                }
            })
            console.log(result)
           this.preOperation = [] 
           currentReviewContent.textContent =  result.toString();
           preReviewContent.textContent  = "";
           
        }
     }

     applyplus( i , result ) {
        const b = preReviewContent.textContent.split(" ")
        
        if( i === 0 ){
            if(this.preOperation.length === 1){
                result = (+b[i*2+1]) + (+this.currentReviewContent.textContent)
                return result;
                
               
            }
            else{
               result = (+b[i*2+1]) + (+b[i*2 + 3])
                return result;
            
              
        }}
       else{
        if(i === this.preOperation.length -1){
            result += (+this.currentReviewContent.textContent)
             return result;
        }
        else{
            result += (+b[i*2 + 3])
            return  result;
           
        }
       }
        
     }

     applyminus( i ,result  ) {
        
        const b = preReviewContent.textContent.split(" ")
        
        if( i === 0 ){
            if(this.preOperation.length === 1){
                result = (+b[i*2+1]) - (+this.currentReviewContent.textContent)
                return result;
                
               
            }
            else{
               result = (+b[i*2+1]) - (+b[i*2 + 3])
                return result;
            
              
        }}
       else{
        if(i === this.preOperation.length -1){
            result -= (+this.currentReviewContent.textContent)
             return result;
        }
        else{
            result -= (+b[i*2 + 3])
            return  result;
           
        }
       }
        
     }

     applymultiply( i ,result ) {
        const b = preReviewContent.textContent.split(" ")
        
        if( i === 0 ){
            if(this.preOperation.length === 1){
                result = (+b[i*2+1]) * (+this.currentReviewContent.textContent)
                return result;
                
               
            }
            else{
               result = (+b[i*2+1]) * (+b[i*2 + 3])
                return result;
            
              
        }}
       else{
        if(i === this.preOperation.length -1){
            result *= (+this.currentReviewContent.textContent)
             return result;
        }
        else{
            result *= (+b[i*2 + 3])
            return  result;
           
        }
       }
     }

     applydivide( i ,result  ) {
        const b = preReviewContent.textContent.split(" ")
        
        if( i === 0 ){
            if(this.preOperation.length === 1){
                result = (+b[i*2+1]) / (+this.currentReviewContent.textContent)
                return result;
                
               
            }
            else{
               result = (+b[i*2+1]) / (+b[i*2 + 3])
                return result;
            
              
        }}
       else{
        if(i === this.preOperation.length -1){
            result /= (+this.currentReviewContent.textContent)
             return result;
        }
        else{
            result /= (+b[i*2 + 3])
            return  result;
           
        }
       }
        
     }

    alldelete(){
        if(currentReviewContent.textContent.length > 0 ) { 
           currentReviewContent.textContent = currentReviewContent.textContent.slice(0,-1)
        }
       
    }

    allreset() {
        this.currentReviewContent.textContent = ""
        this.preReviewContent.textContent = ""
        this.preOperation = []
    }
    

    
}



const preReviewContent = document.querySelector("[data-previous-preview]")
const currentReviewContent = document.querySelector("[data-current-preview]")
const numbers = document.querySelectorAll("[data-btn-number]")
const operations = document.querySelectorAll("[data-btn-operation]")
const plus = document.querySelector("[data-btn-plus]")
const minus = document.querySelector("[data-btn-minius]")
const multiply = document.querySelector("[data-btn-multiply]")
const divide = document.querySelector("[data-btn-divide]")
const equal = document.querySelector("[data-btn-equal]")
const del = document.querySelector("[data-btn-delete]")
const reset = document.querySelector("[data-btn-reset]")
const script = new Script(preReviewContent , currentReviewContent);


numbers.forEach( number => number.addEventListener("click" , (e) => {script.addnumber(e.target.textContent)} )) 
operations.forEach( operation => 
    operation.addEventListener("click" , 
   (e) => {
    switch(e.target.textContent)
    {case plus.textContent : script.addOperation("+"); break;
     case minus.textContent : script.addOperation("-"); break;
     case multiply.textContent : script.addOperation("x"); break;
     case divide.textContent : script.addOperation("%"); break;
     case equal.textContent : script.isequal(); break;
     default : break;

    }
   }

))

del.addEventListener("click" , (e) => { script.alldelete(e.target.textContent)})
reset.addEventListener( "click" , () => {script.allreset()})
