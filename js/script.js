/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const listOfStudents = document.querySelector('.student-list');
const searchInput = document.querySelector('.header');
const dataStudent = data;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   listOfStudents.innerHTML = ''; 
    for (let i = 0; i < list.length; i++) {
       if (i >= startIndex && i < endIndex) {
          // HTML for students
          let studentItem = `<li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
            <h3>${list[i]["name"].first} ${list[i]["name"].last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i]["registered"].date}</span>
          </div>
        </li>`;
        listOfStudents.insertAdjacentHTML('beforeend', studentItem);
       }
    }
  }



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // amount per page
   let numOfPages = Math.ceil( list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for ( let i = 1; i <= numOfPages; i++) {
     let button = `
     <li>
       <button type="button">${i}</button>
     </li>
     `;
     linkList.insertAdjacentHTML('beforeend', button);
   }
   // shows which page button is active
   let buttonClass = document.querySelector('button');
   buttonClass.className = 'active';

   linkList.addEventListener('click', (e) => {
    if ( e.target.getAttribute('type') === 'button') {
       document.querySelector('.active').className = '';
       e.target.className = 'active';
       let text = e.target.textContent;
       showPage(data, text);
    }
   });
}

showPage(data, 1);
addPagination(data);

// function for search bar

function searchStudents() {
   // search bar HTML
   const searchBar = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   searchInput.insertAdjacentHTML('beforeend', searchBar)
   const search = document.getElementById('search')
   search.addEventListener('keyup', (e) => {
      let matches = []
      for (const student of dataStudent) {
         const fullName = `${student.name.first} ${student.name.last}`.toLowerCase()
         if (fullName.includes(search.value.toLowerCase())) {
            matches.push(student)
         }
      }
      showPage(matches, 1);
      addPagination(matches);
      if (matches.length === 0) {
         listOfStudents.insertAdjacentHTML('beforeend', `<h1>No Results</h1>`)
      }
   })
}
searchStudents();


