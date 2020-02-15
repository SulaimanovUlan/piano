

const keys = document.querySelectorAll('.key');
let flag = false;
let currentNote = 'some';



keys.forEach(function(item){
    item.addEventListener('mousedown', function(){
        pianoHoverEffect('activate');
        plyaNote(this.dataset.note);
        setNotesActive(this.dataset.note);
    });
})

keys.forEach(function(item){
    item.addEventListener('mouseup', function(){
        pianoHoverEffect('deactivate');
        deleteNotesActive(this.dataset.note);
        currentNote = 'some';
    });
});

/* functions to plya piano sounds */
function plyaNote(item){
    console.log(currentNote);
    try {
        if(currentNote !== item){
           flag = false;
           let range = document.getElementById('fade');
           let audio = document.getElementById(item);
           audio.volume = range.value / 100;
           audio.currentTime = 0;
           audio.play();
           currentNote = item;
        }
        else{
            // note pressed
        }
        
    }
    catch (er){
        console.log(er);
    }
}
/* functions to plya piano sounds */



/* functions for keyboard interaction */
function keyboardDown(e){
    if(e.code === 'ShiftLeft' || e.code === 'ShiftRight'){
         flag = true;
     }
     else{
         if(flag){
             plyaNote(e.code + 'shift');
             setNotesActive(e.code + 'shift', true);
         }
         else{
             plyaNote(e.code);
             setNotesActive(e.code, false);
         }
     }
}

function keyboardUp(e){
    currentNote = 'some';
    if(e.code === 'ShiftLeft' || e.code === 'ShiftRight'){
        flag = true;
    }
    else{
        if(flag){
            deleteNotesActive(e.code + 'shift');
        }
        else{
            deleteNotesActive(e.code);
        }
    }
}
/* functions for keyboard interaction */



/* function to show piano's keyboard notes */
function showNotes(){
    
    let flag = 0;
    let modeBlock = document.querySelectorAll('.mode_block');
    let piano = document.querySelector('.piano');
    
    modeBlock[1].addEventListener('click', function(){
        if(flag == 0){
            flag = 1;
            
            piano.classList.remove('hidetext');
        }
        else if(flag == 1){
            flag = 2;
            
            for(let i = 0; i < keys.length; i++){
                keys[i].childNodes[1].classList.remove('hidenumber');
            }
        }
        else if(flag == 2){
            flag = 0;
            
            for(let i = 0; i < keys.length; i++){
                keys[i].childNodes[1].classList.add('hidenumber');
            }
            piano.classList.add('hidetext');
        }
        
    });
    
} 
/* function to show piano's keyboard notes */



/* function to handle volume's range slider */
function rangeSlider(){
    let range = document.getElementById('fade');
    let speed = document.getElementById('speed');
    
    let volume = document.getElementById('volume');
    let volume2 = document.getElementById('volume2');
    volume.value = 50;
    volume2.value = 50;
    
    range.addEventListener('input', function(){
        volume.value = range.value;
        volume.style.visibility = 'visible';
        
        
        if(range.value == '0')  
            volume.style.left = '-13px';
            // -13px is default position of volume on the left edge
        else    
            volume.style.left = `${range.value * 2.8}px`;
            // 2.8 = (range slider width - volume width) / number of <input>'s max step
            
    });
    
    speed.addEventListener('input', function(){
        volume2.value = speed.value;
        volume2.style.visibility = 'visible';
        
        
        if(speed.value == '0')  
            volume2.style.left = '-13px';
            // -13px is default position of volume on the left edge
        else    
            volume2.style.left = `${speed.value * 2.8}px`;
            // 2.8 = (range slider width - volume width) / number of <input>'s max step
            
    });
    
    
    
    range.addEventListener('mouseup', function(){
        volume.style.visibility = 'hidden';
    });
    
    speed.addEventListener('mouseup', function(){
        volume2.style.visibility = 'hidden';
    });
    
    
    
}
/* function to handle volume's range slider */



/* function to set hover effect to piano's keyboard */
function setNotesActive(item, state){
    try{
        let changeditem = document.getElementsByClassName(item);
        let audio = document.getElementById(item);
        audio.muted = false;
        changeditem[0].classList.add('active');
        if(state){
            setTimeout(function(){
                changeditem[0].classList.remove('active');
            },100)
        }
    }
    catch(er){
        console.log(er);
    }
    
}

function deleteNotesActive(item){
    currentNote = 'some';
    try{
        let changeditem = document.getElementsByClassName(item);
        let audio = document.getElementById(item);
        //audio.muted = true;
        changeditem[0].classList.remove('active');
    }
    catch (er){
        console.log(er);
    }
}
/* function to set hover effect to piano's keyboard */



/* function to activate piano's hover effect (set mouseover event) */
function pianoHoverEffect(item){
    if(item === 'activate'){
        keys.forEach(function(item){
            item.addEventListener('mouseover', activateHover);
        });

        keys.forEach(function(item){
            item.addEventListener('mouseout', function(){
                deleteNotesActive(this.dataset.note);
                currentNote = 'some';
            });
        });
    }
    else{
        keys.forEach(function(item){
            item.removeEventListener('mouseover', activateHover)
        });
    }
}

function activateHover(item){
    plyaNote(item.target.dataset.note);
    setNotesActive(item.target.dataset.note);
}
/* function to activate piano's hover effect (set mouseover event) */



// activates note sounds flow
function startPlaying(){
    
    let notes = [
        {height: 30,  position: 48,        time: 0},
        {height: 50,  position: 50,        time: 45},
        {height: 50,  position: 48,        time: 105},
        {height: 50,  position: 47,        time: 175},
        {height: 30,  position: 45,        time: 195},
        {height: 60,  position: 50,        time: 270},
        {height: 60,  position: 48,        time: 340},
        {height: 60,  position: 47,        time: 420},
        {height: 50,  position: 45,        time: 485},
        {height: 35,  position: 45,        time: 535},
        {height: 40,  position: 43,        time: 575},
        {height: 20,  position: 41,        time: 640},
        {height: 50,  position: 41,        time: 700},
        {height: 30,  position: 43,        time: 750},
        {height: 100,  position: 40,        time: 800},
    ];
    
    let speed = document.getElementById('speed');
    let wrap = document.querySelector('.music_wrap');
    let windowHeight = document.documentElement.clientHeight;
    let windowsWidth = document.documentElement.clientWidth;
    let functionalityHeight = (windowHeight / 100) * 65;
    let musicWrapHeight = (functionalityHeight / 100) * 87;
    let transitionTime = speed.value / 12.5;
    


    for(let i = 0; i < notes.length; i++){
    
        let div = createSoundBlock(notes[i]);
        
        let depth = findDepth(notes[i]);
    
        setBlockDepth(div, depth);
    }
    let clikc = document.querySelector('#start');
    let divs = document.querySelectorAll('.activeNotesFlow');
    
    
    

    function createSoundBlock(note){
        
        let numberOfBlack = 0;
        
        for (let i = 0; i < note.position; i++){
            
            if(keys[i].classList[1] == 'black'){
                numberOfBlack++;
            }
            
        }
        
        let keysWidth = (((windowsWidth - (36 * 3)) / 100) * 2.777);
        // 36 = number of white keys,    3 = borders value in px,    2.777 white keys default width in %
        let gapWidht = ((note.position - (numberOfBlack+1)) * 3);
        let position2 = keysWidth * (note.position - (numberOfBlack+1)); 
        
        
        let div = document.createElement('div');
        div.classList.add('activeNotesFlow');
        
        if (keys[note.position - 1].classList[1] == 'black'){    
            div.classList.add('activeBlackNotes');
            
            div.style.height = `${note.height}px`;
            div.style.left = `${(position2 + gapWidht) + (keysWidth / 1.3)}px`;
            
        }
        else{
            div.classList.add('activeWhiteNotes');
            
            div.style.height = `${note.height}px`;
            div.style.left = `${(position2 + gapWidht) + 1}px`;
            
        }
        
        
        return div;
    }

    function findDepth(note){
    let depth = 0;
    if(note.height > 50){
        depth = note.height - 50;
    }
    depth = depth + note.time;
    return depth;
}

    function setBlockDepth(div, depth){
        div.style.top = `-${depth}px`;
        div.style.transition = `top ${transitionTime + ((depth / ((musicWrapHeight / transitionTime) / 100)) * 0.01)}s linear`; 
        // here we multiple to 0.001 to get correct number for transition 
        wrap.append(div);
    }

    function shownotes(item, soundDuration){
        //console.log(item);
        //console.log(keys[item].dataset.note);
        plyaNote(keys[item].dataset.note);
        setNotesActive(keys[item].dataset.note);
        setTimeout(deleteNotesActive, soundDuration, keys[item].dataset.note);
    }


    clikc.addEventListener('click', function name(){
        let transitionTime = speed.value / 12.5;
        for(let i = 0; i < divs.length; i++){
            
            divs[i].style.top = '100%';
            let depth = findDepth(notes[i]);
            
            let noteSoundDuration = ((notes[i].height / ((musicWrapHeight / transitionTime) / 100)) * 0.01) * 1000;
            /*if height == ((200 / 1.1154) * 0.01) * 1000 = 1793.07872(ms)*/
            
            let noteStartDuration = ((transitionTime+((depth/((musicWrapHeight/transitionTime)/100))*0.01))*1000) - noteSoundDuration
            // here we multiple to 1000 to get correct number for  setTimeout function
            
            
            setTimeout(shownotes, noteStartDuration, notes[i].position-1, noteSoundDuration)
            
        }
    });
    
   
}
// activates note sounds flow



function adjustpage(){
    let windowsWidth = document.documentElement.clientWidth;
    let windowsHeight = document.documentElement.clientHeight;
    
    let pianoHeight =  windowsWidth / 5.79;
    // 1600
    // 5.79 is default parameter of widows width, 5.79px(of window witdh) == 1px(of piano heigth)
    let piano = document.querySelector('.piano');
    let functionality = document.querySelector('.functionality');

    piano.style.height = `${pianoHeight}px`;
    
    /*                              100  -   <- 276     /      789       / 100  -> =   35(%)                       */
    functionality.style.height = `${100 - (pianoHeight / (windowsHeight / 100))}%`;
    // 7.89 is one percent of 789 height = windowsHeight / 100
    
    
    
    /*   mode block   */
    let modeBlocks = document.querySelectorAll('.mode_block');
    for(let i = 0; i < modeBlocks.length; i++){
        modeBlocks[i].addEventListener('mousedown', function(){
            this.classList.add('modesHover');
        });
        
        modeBlocks[i].addEventListener('mouseup', function(){
            this.classList.remove('modesHover');
        });
        
         modeBlocks[i].addEventListener('mouseout', function(){
            this.classList.remove('modesHover');
        });
    }
    
    // notes number hide
    let j = 1;
    for(let i = 0; i < keys.length; i++){
        
        if(j >= 10){
            j = 1;
        }
            
        let notesNumber = document.createElement('div');
        notesNumber.classList.add('hidenumber');
        notesNumber.innerHTML = j;
        j++;
        keys[i].append(notesNumber);
    }

} // end of function



document.addEventListener('DOMContentLoaded', function(){
    rangeSlider();
    showNotes(); 
    adjustpage();
    startPlaying();
    document.querySelector('#restart').addEventListener('click', function(){
        let divs = document.querySelectorAll('.activeNotesFlow');
        for(let i = 0; i < divs.length; i++){
            divs[i].parentNode.removeChild(divs[i]);
        }
        
        startPlaying();
    });
    
    document.addEventListener('keydown', keyboardDown);
    document.addEventListener('keyup', keyboardUp);
    
});






















































