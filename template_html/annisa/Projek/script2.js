document.addEventListener("DOMContentLoaded", function() {
    const addEngineerBtn = document.getElementById("add-engineer-btn");
    const formContainer = document.getElementById("form-container");
    const tambahEngineerDiv = document.querySelector(".tambah-engineer");

    addEngineerBtn.addEventListener("click", function() {
        // Create new form elements
        const newForm = document.createElement("div");
        newForm.classList.add("container-form-internal");

        const namaEngineerDiv = document.createElement("div");
        namaEngineerDiv.classList.add("kanan-internal");
        namaEngineerDiv.innerHTML = '<p> Nama Engineer </p><input type="text" value="" placeholder="Nama Engineer">';
        newForm.appendChild(namaEngineerDiv);

        const workloadDiv = document.createElement("div");
        workloadDiv.classList.add("tengah-internal");
        workloadDiv.innerHTML = '<p> Workload </p><div class="input-container"><input type="text" value="" placeholder=""><span class="percentage">/100%</span></div>';
        newForm.appendChild(workloadDiv);

        const statusDiv = document.createElement("div");
        statusDiv.classList.add("kiri-internal");
        statusDiv.innerHTML = '<p> Status </p><select class="status-dropdown"><option value="in-progress">In Progress</option><option value="complete">Complete</option><option value="incomplete">Incomplete</option><option value="not-started">Not Started Yet</option><option value="over-due">Over Due</option></select>';
        newForm.appendChild(statusDiv);

        // Insert the new form before the button
        tambahEngineerDiv.parentNode.insertBefore(newForm, tambahEngineerDiv);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const addEngineerBtn = document.getElementById("add-eksternal-engineer-btn"); // Ubah id menjadi "add-eksternal-engineer-btn"
    const formContainer = document.getElementById("form-container");
    const tambahEngineerDiv = document.querySelector("#tambah-eksternal-engineer"); // Ubah id menjadi "tambah-eksternal-engineer"

    addEngineerBtn.addEventListener("click", function() {
        // Create new form elements
        const newForm = document.createElement("div");
        newForm.classList.add("container-form-internal");

        const namaEngineerDiv = document.createElement("div");
        namaEngineerDiv.classList.add("kanan-eksternal");
        namaEngineerDiv.innerHTML = '<p> Nama Engineer </p><input type="text" value="" placeholder="Nama Engineer">';
        newForm.appendChild(namaEngineerDiv);

        const workloadDiv = document.createElement("div");
        workloadDiv.classList.add("tengah-eksternal");
        workloadDiv.innerHTML = '<p> Workload </p><div class="input-container"><input type="text" value="" placeholder=""><span class="percentage">/100%</span></div>';
        newForm.appendChild(workloadDiv);

        const statusDiv = document.createElement("div");
        statusDiv.classList.add("kiri-eksternal");
        statusDiv.innerHTML = '<p> Status </p><select class="status-dropdown"><option value="in-progress">In Progress</option><option value="complete">Complete</option><option value="incomplete">Incomplete</option><option value="not-started">Not Started Yet</option><option value="over-due">Over Due</option></select>';
        newForm.appendChild(statusDiv);

        // Insert the new form before the button
        tambahEngineerDiv.parentNode.insertBefore(newForm, tambahEngineerDiv);
    });
});




