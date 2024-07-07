async function POST(url, data) {
  console.log( getCookie("csrftoken"));

  return fetch(url, {
    method: "POST",
    headers: {
   
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: data,
  });
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
async function GET(url) {
  console.log( getCookie("csrftoken"));

  return fetch(url, {
    method: "GET",
    headers: {
   
      "X-CSRFToken": getCookie("csrftoken")
    },
 
  });
}
async function DELETE(url, id) {
  console.log( getCookie("csrftoken"));

  return fetch(url+"/"+id, {
    method: "DELETE",
    headers: {
   
      "X-CSRFToken": getCookie("csrftoken")
    } 
  });
}