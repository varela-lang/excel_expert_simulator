// Obtener usuario logueado
const userData = localStorage.getItem("loggedUser");

if (!userData) {
  window.location.href = "../../index.html";
}

const user = JSON.parse(userData);
document.getElementById("usernameDisplay").textContent = user.username;

// Sidebar items
const menuItems = document.querySelectorAll(".sidebar li");
const content = document.getElementById("dynamicContent");

// Secciones dinámicas
const sections = {
  simulator: `
      <div class="panel-header"> 
        <h1>Simulator</h1> 
        <button id="launchExam">Launch an Exam</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Exam Updates/System Updates</h3> 
        <p>No available updates</p> 
      </section> 
      <hr> 
      <section class="section"> 
        <h3>Updates Mode</h3> 
        <p>Current Mode: <strong>Automatic</strong></p> 
        <p>Last Update 2026-02-05 16:13:20</p> 
        <p>Next Update 2026-02-06 08:47:00</p> 
        <a href="#">Change Update service scheduler settings</a> 
      </section> 
      <hr> 
      <section class="section"> 
        <h3>Office Compatibility</h3> 
        <a href="#">Office Compatibility ⚠</a> 
      </section>
    `,
  pivot: `
      <div class="panel-header"> 
        <h1>Pivot Tables</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle pivot tables.</p> 
      </section> 
    `,
  lookups: `
      <div class="panel-header"> 
        <h1>Lookups</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle Lookups.</p> 
      </section> 
    `,
  conditional: `
      <div class="panel-header"> 
        <h1>Conditional Formating</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle Conditional Formating.</p> 
      </section> 
    `,
  charts: `
      <div class="panel-header"> 
        <h1>Charts</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle charts.</p> 
      </section> 
    `,
  functions: `
      <div class="panel-header"> 
        <h1>Funtions</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle diferents functions.</p> 
      </section> 
    `,
  whatif: `
      <div class="panel-header"> 
        <h1>What if analysis</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle What if analysis.</p> 
      </section> 
    `,
  sort: `
      <div class="panel-header"> 
        <h1>Custom Sort</h1> 
        <button id="launchExam">Launch a Practice</button> 
      </div> 
        <hr> 
      <section class="section"> 
        <h3>Description:</h3> 
        <p>In this section you will find some exercises so you can practice everything you need to know to be able to handle custom sort.</p> 
      </section> 
    `
}; 

const routes = {
  simulator: "../prep/prep.html",
  pivot: "../practice/practice.html?topic=pivot",
  lookups: "../practice/practice.html?topic=lookups",
  conditional: "../practice/practice.html?topic=conditional",
  charts: "../practice/practice.html?topic=charts",
  functions: "../practice/practice.html?topic=functions",
  whatif: "../practice/practice.html?topic=whatif",
  sort: "../practice/practice.html?topic=sort"
};


  
// Función para cargar contenido
function loadSection(section) {
  content.innerHTML = sections[section];

  // Si existe el botón, se le asigna el evento
  const launchBtn = document.getElementById("launchExam");
  if (launchBtn) {
    launchBtn.addEventListener("click", () => {
      window.location.href = routes[section];
    });
  }
}

// Sidebar click
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    loadSection(item.dataset.section);
  });
});

// Contenido inicial
loadSection("simulator");
