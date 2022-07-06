<!doctype html>
<html lang="en">
   <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>HorizonCode Portfolio</title>
      <meta name="description" content="My Portfolio."/>
      <meta name="author" content="SitePoint"/>
      <link rel="stylesheet" href="assets/css/style.css?v=1.0"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
   </head>
   <body>
      <div class="preloader">
         <div class="spinner"></div>
      </div>
      <div class="container">
         <div class="profile-card throw-shadow">
            <div>
               <img src="https://avatars.githubusercontent.com/u/18552186?v=4" alt="icon" width="500" height="600"/>
            </div>
            <div>
               <h4>HorizonCode</h4>
               <h6>23 y/o he/him ▪️ Java-Developer☕</h6>
            </div>
            <div class="full-width">
               <div class="seperator"></div>
               <h3 class="taskbar-title">Apps</h3>
               <div class="taskbar throw-shadow">
                  <div class="task-button term throw-shadow" id="hide-mobile">
                     <i class="fa-solid fa-terminal"></i>
                  </div>
                  <div class="task-button git throw-shadow">
                     <i class="fa-brands fa-git"></i>
                  </div>
                  <div class="task-button paste throw-shadow">
                     <i class="fa-solid fa-paste"></i>
                  </div>
                  <div class="task-button kitsu throw-shadow">
                     <i class="fa-brands fa-itunes-note"></i>
                  </div>
               </div>
            </div>
         </div>
         <div class="throw-shadow-relative">
            <div class="terminal minimized" onClick='focusTerminal();'>
               <div class="toolbar">
                  <div class="buttons">
                     <div class="red"></div>
                     <div class="yellow"></div>
                     <div class="green"></div>
                     <div class="heading">guest@horizoncode: ~</div>
                  </div>
               </div>
               <p>
                  Welcome to HorizonCode's portfolio — Type <span>help</span> or <span>?</span> for a list of supported commands.
               </p>
               <div class="commands"></div>
               <label for="command">guest@horizoncode:~# </label>
               <input id="command" type="text" autoComplete="off" spellcheck="false" autofocus/>
            </div>
         </div>
      </div>
   </body>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
  <script src="assets/js/script.js"></script>
</html>