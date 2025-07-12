     let expenseInfo = JSON.parse(localStorage.getItem("expenses")) || [];

        function saveToLocalStorage() {
            localStorage.setItem("expenses", JSON.stringify(expenseInfo));
        }

        function renderTable() {
            const container = document.getElementById("container");
            container.innerHTML = "";

            if (expenseInfo.length === 0) {
                container.innerHTML = `<div class="no-data">No transactions available. Start adding now!</div>`;
                return;
            }

            expenseInfo.forEach((data, index) => {
                const maxLength = Math.max(data.credit.length, data.debit.length);
                let rows = "";

                for (let i = 0; i < maxLength; i++) {
                    rows += `
            <tr>
              <td>${data.credit[i] !== undefined ? `<span class="amount-green">+ ₹${data.credit[i]}</span>` : ""}</td>
              <td>${data.debit[i] !== undefined ? `<span class="amount-red">- ₹${data.debit[i]}</span>` : ""}</td>
            </tr>
          `;
                }

                const totalCredit = data.credit.reduce((a, b) => a + b, 0);
                const totalDebit = data.debit.reduce((a, b) => a + b, 0);
                const netAmount = totalCredit - totalDebit;
                const netAmountClass = netAmount >= 0 ? 'positive' : 'negative';

                container.innerHTML += `
          <div class="card">
            <h2>${data.name.toUpperCase()}</h2>
            <table>
              <thead>
                <tr>
                  <th>Credit</th>
                  <th>Debit</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
            <div class="totals">
              Credit: <span class="amount-green">₹${totalCredit}</span> |
              Debit: <span class="amount-red">₹${totalDebit}</span>
            </div>
            <hr>
            <div class="footer">
              <div class='net-amount ${netAmountClass}'>Balance: ₹${netAmount}</div>
              <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            </div>
          </div>
        `;
            });
        }

        function addTransaction() {
            const name = document.getElementById("name").value.trim();
            const amount = parseFloat(document.getElementById("amount").value.trim());
            const type = document.getElementById("type").value;

            if (!name || isNaN(amount) || amount <= 0) {
                alert("Please enter a valid name and amount.");
                return;
            }

            const person = expenseInfo.find(p => p.name.toLowerCase() === name.toLowerCase());

            if (person) {
                person[type].push(amount);
            } else {
                expenseInfo.push({
                    name,
                    credit: type === "credit" ? [amount] : [],
                    debit: type === "debit" ? [amount] : []
                });
            }

            saveToLocalStorage();
            renderTable();

            document.getElementById("name").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("type").value = "credit";
        }

        function deleteEntry(index) {
            if (confirm("Are you sure you want to delete this entry?")) {
                expenseInfo.splice(index, 1);
                saveToLocalStorage();
                renderTable();
            }
        }

        renderTable();