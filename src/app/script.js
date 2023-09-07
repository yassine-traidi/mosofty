document.addEventListener("DOMContentLoaded", function() {
  const typedElement = document.querySelector(".typed-text");
  const secondTypedElement = document.querySelector(".second-typed-text");
  const buttonContainer = document.querySelector(".ToQuizzes");

  const welcomeMessage = "Welcome to Mosofty Recruitment,";
  const secondMessage = "We are excited to have you on board !";

  let index = 0;
  let secondIndex = 0;

  function typeText(element, message, indexVariable) {
    element.textContent = message.slice(0, indexVariable);

    if (indexVariable >= message.length) {
      clearInterval(intervalId);
      buttonContainer.style.display = "block";
    }

    indexVariable++;
  }


  // Function to scroll down to the content
  function scrollToContent() {
    const contentElement = document.getElementById('routerOutlet');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Use Angular's router event to trigger the scrolling
  window.addEventListener('load', () => {
    // Initially scroll to the content if there's a hash in the URL
    if (window.location.hash) {
      scrollToContent();
    }

    // Listen for route changes and scroll to content
    window.addEventListener('hashchange', () => {
      scrollToContent();
    });
  });


});
