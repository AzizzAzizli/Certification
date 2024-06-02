export async function postData(data) {
    const response = await fetch('http://localhost:3000/api/post-certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }
  


 export async function getData() {
    const response = await fetch('http://localhost:3000/api/get-certificates', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json(); 
  }
  
  export async function getAdmin() {
    const response = await fetch('http://localhost:3000/api/get-admin', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json(); 
  }


