document.addEventListener("DOMContentLoaded", function() {
    function displayQueries() {
        fetch("http://localhost:5000/contact/getContactQueries")
            .then(response => response.json())
            .then(data => {
                const queries = data;
                const queriesTable = document.getElementById('queries-table');
                queriesTable.innerHTML = '';
                if (queries.length > 0) {
                    const tableHeader = document.createElement('tr');
                    tableHeader.innerHTML = `
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                    `;
                    queriesTable.appendChild(tableHeader);

                    queries.forEach(function (query) {
                        const queryRow = document.createElement('tr');
                        queryRow.innerHTML = `
                            <td>${query.name}</td>
                            <td>${query.email}</td>
                            <td>${query.subject}</td>
                            <td>${query.message}</td>
                        `;
                        queriesTable.appendChild(queryRow);
                    });
                } else {
                    queriesTable.innerHTML = '<p>No queries found.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching contact queries:", error);
                const queriesTable = document.getElementById('queries-table');
                queriesTable.innerHTML = '<p>Error fetching contact queries. Please try again later.</p>';
            });
    }
    displayQueries();
});
