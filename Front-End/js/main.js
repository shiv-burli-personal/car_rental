async function postData(url, payload) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check the console for details.");
    }
  }
  
  function showAlert(message) {
    alert(message);
  }
  
  function setFormHandler(formId, endpoint, buildPayloadFn, onSuccessRedirect = null) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = buildPayloadFn();
      const result = await postData(endpoint, payload);
      if (result?.message) {
        alert(result.message);
        if (onSuccessRedirect) window.location.href = onSuccessRedirect;
      }
    });
  }
  
  /* Page-specific logic */
  if (document.body.id === "register-page") {
    setFormHandler("registerForm", "http://localhost:8000/customers", () => {
      const payload = {
        customer_id: document.getElementById("customer_id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        driving_license_number: document.getElementById("license").value,
        gender: document.getElementById("gender").value
      };
      sessionStorage.setItem("customer_id", payload.customer_id);
      return payload;
    }, "index.html");
  }
  
  if (document.body.id === "rent-page") {
    document.getElementById("customer_id").value = sessionStorage.getItem("customer_id") || "";
    document.getElementById("car_id").value = sessionStorage.getItem("car_id") || "";
  
    setFormHandler("rentalForm", "http://localhost:8000/rentals", () => {
      const payload = {
        rental_id: document.getElementById("rental_id").value,
        customer_id: document.getElementById("customer_id").value,
        car_id: document.getElementById("car_id").value,
        rental_date: document.getElementById("rental_date").value,
        return_date: document.getElementById("return_date").value,
        rental_status: document.getElementById("rental_status").value,
        rent_period: parseInt(document.getElementById("rent_period").value)
      };
      sessionStorage.setItem("rental_id", payload.rental_id);
      return payload;
    }, "pay.html");
  }
  
  if (document.body.id === "pay-page") {
    document.getElementById("customer_id").value = sessionStorage.getItem("customer_id") || "";
    document.getElementById("rental_id").value = sessionStorage.getItem("rental_id") || "";
  
    setFormHandler("paymentForm", "http://localhost:8000/payments", () => {
      return {
        payment_id: document.getElementById("payment_id").value,
        rental_id: document.getElementById("rental_id").value,
        customer_id: document.getElementById("customer_id").value,
        payment_method: document.getElementById("payment_method").value,
        payment_amount: parseFloat(document.getElementById("payment_amount").value)
      };
    }, "thankyou.html");
  }
  
  if (document.body.id === "car-list") {
    fetch("http://localhost:8000/cars")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("carList");
        data.forEach(car => {
          const card = document.createElement("div");
          card.className = "col-md-4 mb-3";
          card.innerHTML = `
            <div class="card p-3" onclick="selectCar('${car.car_id}')">
              <h5>${car.model}</h5>
              <p>License: ${car.license_plate}</p>
              <p>Price: ₹${car.daily_rental_price}/day</p>
              <p>Status: ${car.status}</p>
            </div>
          `;
          container.appendChild(card);
        });
      });
  }
  
  function selectCar(carId) {
    sessionStorage.setItem("car_id", carId);
    window.location.href = "rent.html";
  }
  
  if (document.body.id === "maintenance-page") {
    fetch("http://localhost:8000/maintenance")
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById("logs");
        data.forEach(log => {
          const item = document.createElement("li");
          item.className = "list-group-item";
          item.innerText = `Car ${log.car_id} - ${log.service_type} on ${log.maintenance_date}`;
          list.appendChild(item);
        });
      });
    }
  