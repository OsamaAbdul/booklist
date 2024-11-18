// filtering and searching using author and title

function searchBooks() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('book-list');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) { // Start at 1 to skip the header row
        const tdAuthor = tr[i].getElementsByTagName("td")[0];
        const tdTitle = tr[i].getElementsByTagName("td")[1];
        if (tdAuthor || tdTitle) {
            const txtValueAuthor = tdAuthor.textContent || tdAuthor.innerText;
            const txtValueTitle = tdTitle.textContent || tdTitle.innerText;
            if (txtValueAuthor.toLowerCase().indexOf(filter) > -1 || txtValueTitle.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}