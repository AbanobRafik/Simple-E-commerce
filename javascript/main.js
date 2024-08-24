document.addEventListener("DOMContentLoaded", function () {
  let container = document.querySelector(".container");

  let formbox = document.createElement("div");
  formbox.className = "form-box";

  let formField = document.createElement("form");
  formField.id = "form";
  formField.className = "form-field";

  formbox.appendChild(formField);
  container.appendChild(formbox);

  window.onload = function () {
    const currentForm = localStorage.getItem("currentForm") || "register";
    if (currentForm === "login") {
      renderLogin();
    } else {
      renderRegister();
    }
  };

  function renderRegister() {
    formField.innerHTML = `
      <div class="header">
          <h2 class="header">Register</h2>
      </div>
      <input type="text" placeholder="Username" class="input-field" id="username" />
      <input type="email" placeholder="Email" class="input-field" id="email" />
      <input type="password" placeholder="Password" class="input-field" id="password" />
      <input type="password" placeholder="Confirm Password" class="input-field" id="confirmedpass" />
      <div class="terms">
          <input type="checkbox" id="terms-checkbox" required />
          <span>I agree with <a href="#" class="link">Terms & Privacy</a></span>
      </div>
      <button id="register">Register</button>
      <div class="social-register">
          <p class="p-sec">Or register with:</p>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-x"></i>
          <i class="fab fa-google-plus-g"></i>
      </div>
      <div class="account">
          <p>Already have an account? <a href="#" class="link">Log In</a></p>
      </div>
    `;
    formbox.style.height = "550px"; // Adjust height for register form
  }

  function renderLogin() {
    formField.innerHTML = ""; // Clear the form field
    formbox.style.height = "420px"; // Adjust height for login form

    let headerDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.textContent = "Log In";
    h2.className = "header";
    headerDiv.appendChild(h2);
    formField.appendChild(headerDiv);

    let useNameInput = document.createElement("input");
    useNameInput.type = "text";
    useNameInput.placeholder = "Username";
    useNameInput.id = "username";
    useNameInput.className = "input-field";
    formField.appendChild(useNameInput);

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.id = "password";
    passwordInput.className = "input-field";
    formField.appendChild(passwordInput);

    let rememberMe = document.createElement("div");
    rememberMe.className = "remember-me";
    let rememberMeCheck = document.createElement("input");
    rememberMeCheck.type = "checkbox";
    let rememberMeText = document.createElement("span");
    rememberMeText.textContent = "Remember me";
    rememberMe.appendChild(rememberMeCheck);
    rememberMe.appendChild(rememberMeText);
    formField.appendChild(rememberMe);

    let loginButton = document.createElement("button");
    loginButton.id = "login";
    loginButton.textContent = "Log In";
    formField.appendChild(loginButton);

    let social = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = "Or login with: ";
    p.style.margin = "10px 0";
    let facebook = document.createElement("i");
    facebook.className = "fab fa-facebook-f";
    let X = document.createElement("i");
    X.className = "fab fa-x";
    let google = document.createElement("i");
    google.className = "fab fa-google-plus-g";
    social.appendChild(p);
    social.appendChild(facebook);
    social.appendChild(X);
    social.appendChild(google);
    formField.appendChild(social);

    let accountDiv = document.createElement("div");
    accountDiv.className = "account";
    let pAcc = document.createElement("p");
    pAcc.innerHTML =
      "Don't have an account? <a href='#' class='link'>Register</a>";
    accountDiv.appendChild(pAcc);
    formField.appendChild(accountDiv);
  }

  // Form validation function for Register
  function validation() {
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let confirmedpassInput = document.getElementById("confirmedpass");
    let termsCheckbox = document.getElementById("terms-checkbox");

    let isValid = true;

    if (usernameInput.value === "") {
      usernameInput.style.border = "2px solid red";
      isValid = false;
    } else {
      usernameInput.style.border = "2px solid green";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value === "") {
      emailInput.style.border = "2px solid red";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailInput.style.border = "2px solid red";
      isValid = false;
    } else {
      emailInput.style.border = "2px solid green";
    }

    if (passwordInput.value === "") {
      passwordInput.style.border = "2px solid red";
      isValid = false;
    } else {
      passwordInput.style.border = "2px solid green";
    }

    if (confirmedpassInput.value === "") {
      confirmedpassInput.style.border = "2px solid red";
      isValid = false;
    } else if (confirmedpassInput.value !== passwordInput.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don't match!",
      });
      confirmedpassInput.style.border = "2px solid red";
      isValid = false;
    } else {
      confirmedpassInput.style.border = "2px solid green";
    }

    if (!termsCheckbox.checked) {
      termsCheckbox.nextElementSibling.style.color = "red";
      isValid = false;
    } else {
      termsCheckbox.nextElementSibling.style.color = "black";
    }

    return isValid;
  }

  // Form validation function for Login
  function validateLogin() {
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    let isValid = true;

    if (usernameInput.value === "") {
      usernameInput.style.border = "2px solid red";
      isValid = false;
    } else {
      usernameInput.style.border = "2px solid green";
    }

    if (passwordInput.value === "") {
      passwordInput.style.border = "2px solid red";
      isValid = false;
    } else {
      passwordInput.style.border = "2px solid green";
    }

    return isValid;
  }

  // Handle form submission for Register
  formField.addEventListener("click", function (e) {
    if (e.target.id === "register") {
      e.preventDefault();
      if (validation()) {
        createUser();
        renderLogin(); // Switch to the login form after submission
      }
    }
  });

  // Handle form submission for Login
  formField.addEventListener("click", async function (e) {
    if (e.target.id === "login") {
      e.preventDefault();
      if (validateLogin()) {
        try {
          const loginSuccess = await checkuser();
          if (loginSuccess) {
            container.innerHTML = "";
            renderProducts();
          }
        } catch (err) {
          console.error("Error during login:", err);
        }
      }
    }
  });

  // Event delegation for switching forms
  formField.addEventListener("click", function (e) {
    if (e.target.classList.contains("link")) {
      e.preventDefault();
      if (e.target.textContent.trim() === "Register") {
        localStorage.setItem("currentForm", "register");
        renderRegister();
      } else if (e.target.textContent.trim() === "Log In") {
        localStorage.setItem("currentForm", "login");
        renderLogin();
      }
    }
  });

  // Function to create a user and store it in users.json
  function createUser() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmedpass = document.getElementById("confirmedpass").value;

    let users = {
      username: username,
      email: email,
      password: password,
      confirmedpass: confirmedpass,
    };

    console.log("Sending user data:", users);

    axios
      .post("https://api-generator.retool.com/Q5WrAE/users", users)
      .then((response) => {
        console.log("User added successfully");
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
  }

  // Function to check if the user exists during login
  async function checkuser() {
    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    try {
      const response = await axios.get(
        "https://api-generator.retool.com/Q5WrAE/users"
      );
      let users = response.data;

      let foundUser = users.find(function (user) {
        return (
          user.username === usernameInput && user.password === passwordInput
        );
      });

      if (foundUser) {
        await Swal.fire({
          icon: "success",
          title: "Login successful",
          text: `Welcome, ${foundUser.username}!`,
        });
        return true; // Indicate successful login
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Check your username or password",
        });
        return false; // Indicate failed login
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      return false; // Indicate error during login
    }
  }

  function renderProducts() {
    container.style.height = "100%";

    // Create and append header
    let header = document.createElement("header");
    header.className = "headercontent";

    let logoDiv = document.createElement("div");
    let logo = document.createElement("p");
    logo.textContent = "BuyBox";
    logoDiv.appendChild(logo);
    header.appendChild(logoDiv);

    let nav = document.createElement("nav");
    let ul = document.createElement("ul");

    let li1 = document.createElement("li");
    let a1 = document.createElement("a");
    a1.textContent = "Home";
    li1.appendChild(a1);

    let li2 = document.createElement("li");
    let a2 = document.createElement("a");
    a2.textContent = "Products";
    li2.appendChild(a2);

    let li3 = document.createElement("li");
    let a3 = document.createElement("a");
    a3.textContent = "About";
    li3.appendChild(a3);

    let li4 = document.createElement("li");
    let a4 = document.createElement("a");
    a4.textContent = "Contact";
    li4.appendChild(a4);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);

    nav.appendChild(ul);
    header.appendChild(nav);

    // Append header to body
    document.body.appendChild(header);

    // Create and append main content area
    let main = document.createElement("main");

    let textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.innerHTML = `
      <h3>Welcome to our website</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam reiciendis quo non dolorum qui obcaecati maiores soluta ad iure, adipisci, enim id quia quidem exercitationem ducimus ratione nulla quae dicta.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum unde similique aspernatur. Dolor velit aliquam architecto voluptas deleniti doloremque, ab, molestiae ad sed quasi quisquam, nostrum nemo cum porro? Beatae?</p>
    `;
    main.appendChild(textDiv);

    let productsContainer = document.createElement("div");
    productsContainer.className = "product";
    main.appendChild(productsContainer);

    document.body.appendChild(main);

    // Fetch and render products
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const data = response.data;
        data.forEach((product) => {
          // Create product card
          const productCard = document.createElement("div");
          productCard.className = "product-card";

          // Create and append product image
          const img = document.createElement("img");
          img.src = product.image;
          img.alt = product.title;
          img.className = "product-image";
          productCard.appendChild(img);

          // Create and append product title
          const title = document.createElement("h2");
          title.className = "product-title";
          title.textContent = product.title;
          productCard.appendChild(title);

          // Create and append product description
          const description = document.createElement("p");
          description.className = "product-description";
          description.textContent = product.description;
          productCard.appendChild(description);

          // Create and append product button
          const button = document.createElement("button");
          button.className = "product-button";
          button.textContent = "Add to Cart";
          productCard.appendChild(button);

          // Append the product card to the products container
          productsContainer.appendChild(productCard);
        });
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });

    // Create and append footer
    let footer = document.createElement("footer");
    footer.className = "footercontent";
    footer.innerHTML = `<p>&copy; 2024 BuyBox. All rights reserved.</p>`;
    document.body.appendChild(footer);
  }
});
