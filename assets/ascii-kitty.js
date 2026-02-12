const cat = document.getElementById("ascii-kitty");

const states = {
  idle: `
  /\\_ __/\\                 
 *        *                
*   @   @  *               
\\~~~(_♥_)~~/               
 \\___   __/     ___________
  /       \\    /          /
 / /     \\ \\  /          / 
/ /       \\ \\/          /  
\\ \\      ΩΩ /          /   
 \\ΩΩ_______/__________/    
 /___________________/     
`,
  blink: `
  /\\_ __/\\                 
 *        *                
*   _   _  *               
\\~~~(_♥_)~~/               
 \\___   __/     ___________
  /       \\    /          /
 / /     \\ \\  /          / 
/ /       \\ \\/          /  
\\ \\       / /          /   
 \\ΩΩ_____ΩΩ/__________/    
 /___________________/     
`,
  rest: `
  /\\_ __/\\                 
 *        *                
*   @   @  *               
\\~~~(_♥_)~~/               
 \\___   __/     ___________
  /       \\    /          /
 / /     \\ \\  /          / 
/ /       \\ \\/          /  
\\ \\       / /          /   
 \\ΩΩ_____ΩΩ/__________/    
 /___________________/     
`,
  typing: `
  /\\_ __/\\                 
 *        *                
*   @   @  *               
\\~~~(_♥_)~~/               
 \\___   __/     ___________
  /       \\    /          /
 / /     \\ \\  /          / 
/ /       \\ \\/          /  
\\_ΩΩ      / /          /   
  _______ΩΩ/__________/    
 /___________________/     
`,
  typing2: `
  /\\_ __/\\                 
 *        *                
*   @   @  *               
\\~~~(_♥_)~~/               
 \\___   __/     ___________
  /       \\    /          /
 / /     \\ \\  /          / 
/ /       \\ \\/          /  
\\ \\       / /          /   
 \\_ΩΩ___ΩΩ_/__________/    
 /___________________/     
`,
};

let current = "rest";
let isTyping = false;
let typingTimeout = null;
let typingMovesLeft = 0;
let isBlinking = false;

function startTypingBurst() {
  isTyping = true;
  typingMovesLeft = 4;
  current = "typing";
}

/* ---------- BLINK ---------- */
function blink() {
  if (isBlinking) return;

  isBlinking = true;
  const prev = current;

  cat.textContent = states.blink;

  setTimeout(() => {
    isBlinking = false;
    cat.textContent = states[prev];
  }, 200);
}

/* ---------- MAIN LOOP ---------- */
function loop() {
  if (isBlinking) {
    setTimeout(loop, 50);
    return;
  }
  if (!isTyping) {
    // REST
    if (Math.random() < 0.15) {
      startTypingBurst();
    } else {
      current = "rest";
    }
  } else {
    // TYPING -> alternate hands
    current = current === "typing" ? "typing2" : "typing";
    typingMovesLeft--;

    if (typingMovesLeft <= 0) {
      isTyping = false;
      current = "rest";
    }
  }

  cat.textContent = states[current];

  const next = isTyping ? 160 + Math.random() * 140 : 500 + Math.random() * 800;

  setTimeout(loop, next);
}

function blinkLoop() {
  blink();

  const next = 4800 + Math.random() * 800;
  setTimeout(blinkLoop, next);
}

cat.textContent = states.idle;
loop();
blinkLoop();
